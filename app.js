// Hunters of the Shattered Coast — interactive character sheets.
// Plain JS, no dependencies. State lives in localStorage (this browser only).
// Two stages: SETUP (pick a playbook, build the hunter) then PLAYER SHEET
// (the finished hunter, clean and printable). Both views are the same hunter:
// the view is stored on the hunter object, so switching never loses anything.
// Old saves (without a `view` field) open on their finished sheet, unnamed
// ones open in setup — nothing is lost in the migration.
// Improvements come from levelling up, as per the rulebook: fill all 5
// experience boxes, tap Level Up on your sheet, and pick ONE improvement
// from your playbook's list. One improvement per level — no points, no
// budget. Ratings can be raised more than once, up to their listed max;
// "Gain an ally" adds one ally each time; a move from another playbook
// can be taken again at a later level. Moves are unlimited: tick as many
// of your own playbook's moves as you like. D&D weapons convert on the
// chart in setup. Every hunter has 5 luck. The luck track always shows
// 7 boxes; two boxes are already marked used — luck spent in past
// adventures — and luck can no longer be earned. Tracker boxes are
// marked with rubber-stamp SVG images: a skull for harm, a star for
// experience and luck. No Unicode glyphs are used as marks anywhere.
(function () {
  'use strict';
  var STORE = 'hsc-hunters-v1';
  var ACTIVE = 'hsc-active-v1';
  var $ = function (s) { return document.querySelector(s); };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function uid() { return 'h' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36); }

  function playbook(id) {
    for (var i = 0; i < PLAYBOOKS.length; i++) if (PLAYBOOKS[i].id === id) return PLAYBOOKS[i];
    return PLAYBOOKS[0];
  }
  function newHunter(pbId) {
    var pb = playbook(pbId);
    var moves = [];
    pb.moves.forEach(function (m, i) { if (m.fixed) moves.push(i); });
    return {
      id: uid(), playbook: pb.id, name: '', pronouns: '', look: '', photo: '',
      ratingIdx: 0, harm: 0, luckUsed: 0, luckMax: 5, xp: 0, level: 1, unstable: false,
      gear: [], moves: moves, improvements: [], impRatings: {},
      xMoveLevels: 0, xMoves: [], allyCount: 0,
      trackers: {}, expatriation: '', view: 'setup'
    };
  }

  var hunters = [];
  var activeId = null;
  try {
    hunters = JSON.parse(localStorage.getItem(STORE) || '[]');
    activeId = localStorage.getItem(ACTIVE);
  } catch (e) { hunters = []; }
  if (!Array.isArray(hunters) || !hunters.length) {
    hunters = [newHunter('foretold')];
    activeId = hunters[0].id;
  }
  // Migrate old saves: no `view` field yet — named hunters open on their
  // finished sheet, unnamed ones open in setup. Nothing else changes.
  // Later migrations: gear was stored as indices into the playbook gear
  // list — now gear is carried text, so old indices are translated into
  // the same gear strings (nothing is lost). The last two items of every
  // playbook's improvements list were removed, and +1 rating picks are
  // now repeatable counts — so old improvement indices are translated
  // too: indices pointing at removed items are dropped, and surviving
  // +1 rating picks become counts in h.impRatings. Moves are unlimited
  // now, so old own-move improvement picks are simply dropped (the
  // hunter keeps every move they picked — nothing is lost). Old scar /
  // deed / debt / treasure / powers fields may linger in stored JSON;
  // they are never rendered any more. A cross-playbook move only stays
  // if the improvement that bought it still does.
  function migrateHunter(h) {
    if (!h.view) h.view = h.name ? 'sheet' : 'setup';
    if (typeof h.luckUsed !== 'number') h.luckUsed = 0;
    if (!Array.isArray(h.moves)) h.moves = [];
    if (!Array.isArray(h.gear)) h.gear = [];
    if (!h.impRatings || typeof h.impRatings !== 'object') h.impRatings = {};
    if (!Array.isArray(h.improvements)) h.improvements = [];
    if (typeof h.photo !== 'string') h.photo = '';
    if (!Array.isArray(h.xMoves)) h.xMoves = [];
    if (typeof h.xMoveLevels !== 'number') h.xMoveLevels = 0;
    if (typeof h.allyCount !== 'number') h.allyCount = 0;
    delete h.ownMoveLevels; // paid extra move slots no longer exist — moves are free ticks now
    if (!h.trackers) h.trackers = {};
    if (typeof h.level !== 'number' || h.level < 1) h.level = 1;
    if (typeof h.expatriation !== 'string') h.expatriation = '';
    if (h.gear.some(function (g) { return typeof g === 'number'; })) {
      var gi = splitList(playbook(h.playbook).gear);
      h.gear = h.gear.map(function (g) { return typeof g === 'number' ? gi[g] : g; })
        .filter(function (g) { return typeof g === 'string' && g; });
    }
    var pb = playbook(h.playbook);
    var items = impItems(pb);
    // Old improvement picks become stepper levels: +1 rating picks are
    // counts in h.impRatings, cross-playbook picks become xMoveLevels,
    // a bought "Gain an ally" becomes one ally in h.allyCount;
    // one-off improvements stay as indices in h.improvements. Own-move
    // picks are dropped — moves are unlimited and free now, so the
    // extra slot they bought means nothing any more. Indices pointing
    // at removed list items are dropped.
    var kept = [];
    h.improvements.forEach(function (i) {
      var it = items[i];
      if (!it) return; // pointed at a removed list item — dropped
      var info = impInfo(it);
      if (info.type === 'rating') {
        h.impRatings[info.rating] = (h.impRatings[info.rating] || 0) + 1;
      } else if (info.type === 'ally') {
        h.allyCount = (h.allyCount || 0) + 1;
      } else if (info.type === 'ownmove') {
        // dropped — own moves are free ticks now
      } else if (info.type === 'xmove') {
        h.xMoveLevels++;
      } else {
        kept.push(i);
      }
    });
    h.improvements = kept;
    // Legacy boolean flags become levels too (own-move flag just goes —
    // moves are free now).
    if (h.xMoveExtra) h.xMoveLevels++;
    if (h.xMove && typeof h.xMove === 'object') h.xMoves.push(h.xMove);
    delete h.xMove; delete h.xMoveExtra; delete h.ownMoveExtra;
    // Every cross-playbook level needs a pick — fill in defaults.
    while (h.xMoves.length < h.xMoveLevels) h.xMoves.push(defaultXPick(pb));
    if (h.xMoves.length > h.xMoveLevels) h.xMoves.length = h.xMoveLevels;
    // Luck: the track always shows 7 boxes. Every hunter has 5 luck;
    // 2 boxes are always marked used — luck spent in past adventures.
    // Luck can no longer be earned, so old saves are set to 5 either way.
    h.luckMax = 5;
    if (h.luckUsed > 5) h.luckUsed = 5;
  }
  hunters.forEach(migrateHunter);
  function active() {
    for (var i = 0; i < hunters.length; i++) if (hunters[i].id === activeId) return hunters[i];
    activeId = hunters[0].id;
    return hunters[0];
  }
  // Returns true if the save landed, false if storage refused it (e.g. a
  // photo too big for localStorage) — callers use this to warn, not crash.
  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify(hunters));
      localStorage.setItem(ACTIVE, activeId);
      var d = new Date();
      var t = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
      $('#saveStatus').textContent = 'Saved in this browser · ' + t;
      return true;
    } catch (e) {
      $('#saveStatus').textContent = 'Could not save in this browser (storage unavailable)';
      return false;
    }
  }

  function splitList(text) {
    if (!text) return [];
    var parts = text.split('·').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 1; });
    if (parts.length < 2) parts = text.split(';').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 1; });
    return parts;
  }
  // Tracker boxes are rubber-stamp images, never characters and never
  // checkboxes: a skull stamps harm, a star stamps experience (and
  // playbook trackers) and luck spent in play. The icons are <symbol>
  // definitions in index.html; each mark is an <svg><use> reference, so
  // it renders identically on every device. A filled slot is a framed
  // stamp; an empty slot is a stamp frame holding only a faint ghost of
  // its icon, so it reads as "not yet stamped". The button, data
  // attributes and click handler are unchanged.
  function stampIcon(icon) {
    return '<svg class="mark-icon" aria-hidden="true"><use href="#icon-' + icon + '"/></svg>';
  }
  function boxes(n, filled, label, icon) {
    icon = icon || 'star';
    var kind = label === 'harm' ? 'harm' : label === 'xp' ? 'xp' : 'tracker';
    var out = '';
    for (var i = 0; i < n; i++) out += '<button type="button" class="box box-' + kind + '" data-box="' + label + '" data-i="' + i + '" aria-label="' + esc(label) + ' ' + (i + 1) + '">' + (i < filled ? '<span class="stamp stamp-' + kind + '">' + stampIcon(icon) + '</span>' : '<span class="stamp-slot stamp-slot-' + kind + '" aria-hidden="true"><span class="stamp-ghost">' + stampIcon(icon) + '</span></span>') + '</button>';
    return out;
  }
  // The luck track always shows 7 boxes. Every hunter has 5 luck, so
  // the first 2 boxes are always marked used — luck spent in past
  // adventures — rendered as faded, unclickable star stamps (no X ever).
  // The 5 spendable boxes show a faint star ghost (luck still available)
  // or a star stamp (luck spent in play). The spendable boxes carry
  // data-i as their spent-index, so the click handler toggles luckUsed
  // exactly as before. In blank mode the full track is empty, for
  // handwriting.
  function luckBoxes(h) {
    if (blankMode) return boxes(7, 0, 'luck');
    var max = h.luckMax || 0;
    var out = '';
    var i, j;
    for (i = 0; i < 7 - max; i++) out += '<span class="box luck-unbought" aria-hidden="true"><span class="stamp stamp-past">' + stampIcon('star') + '</span></span>';
    for (j = 0; j < max; j++) {
      out += '<button type="button" class="box box-luck" data-box="luck" data-i="' + j + '" aria-label="Luck ' + (j + 1) + '">' + (j < (h.luckUsed || 0) ? '<span class="stamp stamp-luck">' + stampIcon('star') + '</span>' : '<span class="stamp-slot stamp-slot-luck" aria-hidden="true"><span class="stamp-ghost">' + stampIcon('star') + '</span></span>') + '</button>';
    }
    return out;
  }

  // ---------- D&D weapon conversion chart ----------
  // Common D&D 5e weapons and armour, converted into this game's terms
  // (harm + tags). No new mechanics — the same language the playbooks use.
  var WEAPON_CHART = [
    { dnd: 'Dagger', conv: 'Dagger (1-harm hand quiet)' },
    { dnd: 'Shortsword', conv: 'Shortsword (2-harm hand)' },
    { dnd: 'Scimitar', conv: 'Scimitar (2-harm hand messy)' },
    { dnd: 'Rapier', conv: 'Rapier (2-harm hand precise)' },
    { dnd: 'Longsword', conv: 'Longsword (2-harm hand, 3-harm when wielded two-handed)' },
    { dnd: 'Battleaxe', conv: 'Battleaxe (2-harm hand heavy, 3-harm when wielded two-handed)' },
    { dnd: 'Warhammer', conv: 'Warhammer (2-harm hand heavy)' },
    { dnd: 'Mace', conv: 'Mace (2-harm hand)' },
    { dnd: 'Spear', conv: 'Spear (2-harm hand close)' },
    { dnd: 'Greatsword', conv: 'Greatsword (3-harm heavy two-handed)' },
    { dnd: 'Greataxe', conv: 'Greataxe (3-harm heavy two-handed messy)' },
    { dnd: 'Maul', conv: 'Maul (3-harm heavy two-handed)' },
    { dnd: 'Handaxe', conv: 'Handaxe (1-harm hand, 2-harm close when thrown)' },
    { dnd: 'Club', conv: 'Club (1-harm hand)' },
    { dnd: 'Quarterstaff', conv: 'Quarterstaff (1-harm hand, 2-harm when wielded two-handed)' },
    { dnd: 'Shortbow', conv: 'Shortbow (2-harm far)' },
    { dnd: 'Longbow', conv: 'Longbow (2-harm far)' },
    { dnd: 'Light crossbow', conv: 'Light crossbow (2-harm far reload)' },
    { dnd: 'Heavy crossbow', conv: 'Heavy crossbow (3-harm far reload)' },
    { dnd: 'Hand crossbow', conv: 'Hand crossbow (1-harm close reload quiet)' },
    { dnd: 'Javelin', conv: 'Javelin (2-harm close)' },
    { dnd: 'Leather armour', conv: 'Leather armour (1-armour)' },
    { dnd: 'Chain mail', conv: 'Chain mail (2-armour)' },
    { dnd: 'Plate armour', conv: 'Plate armour (2-armour)' }
  ];

  // ---------- improvements (earned by levelling up) ----------
  // One improvement per level, as per the rulebook — no points, no
  // budget. impInfo only classifies a list item now: +1 to a rating
  // (repeatable up to the listed max), a move from another playbook
  // (repeatable at later levels), an own-move grant (your own book's
  // moves are free ticks, so these are offered in the Level Up
  // walkthrough as "take another move from your own playbook"),
  // "Gain an ally" (adds one ally each time), or any other one-off
  // improvement (max 1). No playbook list currently names an
  // improvement "advanced" in so many words (the Witch's was among
  // the removed last two), so the advanced branch below is dormant —
  // kept so the type still applies if one is ever added back. The
  // `cost` fields below are inert now — nothing charges points.
  function impInfo(item) {
    var m = /^\+1 (Charm|Cool|Sharp|Tough|Weird) \(max \+(\d)\)/.exec(item || '');
    if (m) return { cost: 1, type: 'rating', rating: m[1], max: +m[2] };
    if (/move from another playbook/i.test(item)) return { cost: 3, type: 'xmove' };
    if (/another .*move/i.test(item) || /another rote/i.test(item)) return { cost: 2, type: 'ownmove' };
    if (/advanced/i.test(item)) return { cost: 3, type: 'advanced' };
    // "Gain an ally" counts allies, not a level: 2 points per ally, no cap.
    // The differently-worded ally items ("An ally, tied to…", "An ally —…",
    // "An ally: one of your existing crew…") do NOT start with "Gain an
    // ally" — they stay one-off 'other' improvements, as before.
    if (/^Gain an ally/i.test(item)) return { cost: 2, type: 'ally' };
    return { cost: 2, type: 'other' };
  }
  function impItems(pb) { return splitList(pb.improvements); }
  // The listed max for a rating, from the playbook's improvements list.
  function ratingMax(pb, rating) {
    var items = impItems(pb);
    for (var i = 0; i < items.length; i++) {
      var info = impInfo(items[i]);
      if (info.type === 'rating' && info.rating === rating) return info.max;
    }
    return null;
  }
  // Default cross-playbook pick: the first other playbook's first
  // non-fixed move. Used when a level is bought before any move is chosen.
  function defaultXPick(pb) {
    var other = null;
    for (var i = 0; i < PLAYBOOKS.length; i++) if (PLAYBOOKS[i].id !== pb.id) { other = PLAYBOOKS[i]; break; }
    var first = -1;
    other.moves.forEach(function (m, mi) { if (!m.fixed && first === -1) first = mi; });
    return { pb: other.id, moveIdx: first < 0 ? 0 : first };
  }
  // Ratings with any +1 improvements applied (capped at the listed max).
  function effectiveRatings(h, pb) {
    var vals = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0]);
    var counts = h.impRatings || {};
    Object.keys(counts).forEach(function (r) {
      if (vals[r] == null) return;
      var max = ratingMax(pb, r);
      var v = vals[r] + (counts[r] || 0);
      vals[r] = max == null ? v : Math.min(max, v);
    });
    return vals;
  }
  function ratingBonusText(h, pb) {
    var parts = [];
    Object.keys(h.impRatings || {}).forEach(function (r) {
      var n = h.impRatings[r] || 0;
      if (n > 0) parts.push('+1 ' + r + (n > 1 ? ' ×' + n : ''));
    });
    return parts.join(', ');
  }

  function renderPicker() {
    // All 28 playbooks together in one group — never split into original/new.
    // Each button shows the playbook's name and its quote (the blurb).
    var html = '<h3>All 28 playbooks</h3><div class="pickgrid">';
    PLAYBOOKS.forEach(function (p) {
      html += '<button type="button" class="pickbtn' + (active().playbook === p.id ? ' on' : '') + '" data-pb="' + p.id + '"><span class="pick-name">' + esc(p.name) + '</span><span class="pick-quote">' + esc(p.quote) + '</span></button>';
    });
    html += '</div>';
    $('#pickerGroups').innerHTML = html;
  }

  function renderSelect() {
    var sel = $('#hunterSelect');
    sel.innerHTML = hunters.map(function (h) {
      var label = (h.name || 'Unnamed hunter') + ' — ' + playbook(h.playbook).name;
      return '<option value="' + h.id + '"' + (h.id === activeId ? ' selected' : '') + '>' + esc(label) + '</option>';
    }).join('');
  }

  // ---------- shared bits for both views ----------
  // Moves are unlimited: tick as many of your own playbook's moves as
  // you like. Fixed moves are always included and cannot be unticked.
  function movesPickerHtml(h, pb) {
    return pb.moves.map(function (m, i) {
      var checked = h.moves.indexOf(i) !== -1;
      var disabled = m.fixed;
      return '<li><div class="movepick"><button type="button" class="move-stamp" data-move="' + i + '"' + (disabled ? ' disabled' : '') + ' aria-pressed="' + (checked ? 'true' : 'false') + '" aria-label="' + esc(m.name) + '">' + (checked ? '<span class="stamp stamp-move">' + stampIcon('star') + '</span>' : '<span class="stamp-slot stamp-slot-move" aria-hidden="true"><span class="stamp-ghost">' + stampIcon('star') + '</span></span>') + '</button>' +
        '<span><strong>' + esc(m.name) + '</strong>' + (m.fixed ? ' <em>(you get this)</em>' : '') + ' — ' + esc(m.text) + '</span></div></li>';
    }).join('');
  }
  function myMovesHtml(h, pb) {
    // A blank sheet has no moves picked: ruled lines to write them in by hand.
    if (blankMode) return '<div class="blank-lines" aria-label="Write your moves here"><span></span><span></span><span></span><span></span><span></span></div>';
    var list = h.moves.map(function (i) {
      var m = pb.moves[i];
      if (!m) return '';
      return '<article class="move-card"><h4>' + esc(m.name) + '</h4><p>' + esc(m.text) + '</p></article>';
    }).join('');
    // Moves taken from other playbooks (via improvements) show here,
    // marked with where they came from.
    (h.xMoves || []).forEach(function (xp) {
      var xpb = playbook(xp.pb);
      var xm = xpb.moves[xp.moveIdx];
      if (xm) list += '<article class="move-card xmove"><h4>' + esc(xm.name) + ' <span class="muted">(from ' + esc(xpb.name) + ')</span></h4><p>' + esc(xm.text) + '</p></article>';
    });
    return list ? '<div class="move-cards">' + list + '</div>' : '<p class="muted">No moves picked yet — go to Edit setup and tick moves, and they will appear here.</p>';
  }
  function statBoxesHtml(h, pb) {
    var vals = effectiveRatings(h, pb);
    return ['Charm', 'Cool', 'Sharp', 'Tough', 'Weird'].map(function (r) {
      var v = vals[r];
      var txt = (v == null ? '—' : (v >= 0 ? '+' + v : '' + v));
      return '<div class="stat-box"><span class="stat-name">' + r + '</span><span class="stat-val">' + txt + '</span></div>';
    }).join('');
  }
  function trackerHtml(h, pb) {
    var out = (pb.trackers || []).map(function (tr) {
      var val = h.trackers[tr.key] || 0;
      return '<p><strong>' + esc(tr.label) + ':</strong> ' + boxes(tr.boxes, val, 'tr:' + tr.key) +
        ' <span class="muted">' + esc(tr.note || '') + '</span></p>';
    }).join('');
    return out;
  }
  // Playbook features on the sheet. Only the Far-Traveller has one:
  // "Expatriation — what was your home like?" It renders as a typeable
  // box (saved on the hunter as h.expatriation — the generic
  // data-field input handler saves it) with a Hint button that toggles
  // the options text from data.js, shown verbatim. The hint is hidden
  // by default and never prints; a blank sheet shows the title with
  // empty ruled lines for handwriting.
  var expatHintOpen = false;
  function featHtml(h, pb) {
    return (pb.features || []).map(function (f) {
      if (/^Expatriation/i.test(f.title || '')) {
        if (blankMode) return '<h3 class="sheet-h">' + esc(f.title) + '</h3><div class="blank-lines" aria-label="Write your answer here"><span></span><span></span><span></span><span></span></div>';
        return '<h3 class="sheet-h">' + esc(f.title) + '</h3>' +
          '<textarea class="expat-text" data-field="expatriation" rows="5" placeholder="Write what your home was like, why you left, why you stayed, and what pulls you back…">' + esc(h.expatriation || '') + '</textarea>' +
          '<p class="no-print"><button type="button" data-action="toggle-expat-hint">' + (expatHintOpen ? 'Hide the options' : 'Hint — see the options') + '</button></p>' +
          (expatHintOpen ? '<div class="expat-hint"><p>' + esc(f.text) + '</p></div>' : '');
      }
      return '<h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p>';
    }).join('');
  }
  // ---------- stage 1: SETUP ----------
  var photoWarnMsg = '';
  function renderSetup() {
    var h = active();
    var pb = playbook(h.playbook);

    var ratingHtml = pb.ratings.map(function (r, i) {
      return '<li><label><input type="radio" name="rating" value="' + i + '"' + (h.ratingIdx === i ? ' checked' : '') + '> ' + esc(r) + '</label></li>';
    }).join('');

    // Gear: the D&D weapon conversion chart, plus what you actually carry.
    var chartHtml = '<table class="chart"><tr><th>D&amp;D weapon or armour</th><th>Converted to</th><th></th></tr>' +
      WEAPON_CHART.map(function (w, i) {
        return '<tr><td>' + esc(w.dnd) + '</td><td>' + esc(w.conv) + '</td><td><button type="button" data-chart-add="' + i + '">Add</button></td></tr>';
      }).join('') + '</table>';
    var carriedHtml = h.gear.length
      ? '<ul class="checklist carried">' + h.gear.map(function (g, i) {
          return '<li>' + esc(g) + ' <button type="button" data-gear-remove="' + i + '" aria-label="Remove ' + esc(g) + '">Remove</button></li>';
        }).join('') + '</ul>'
      : '<p class="muted">No gear carried yet — add weapons and armour from the chart, or write your own below.</p>';

    $('#sheet').innerHTML =
      '<article class="sheet setup">' +
      '<h2>Set up your hunter — ' + esc(pb.name) + '</h2>' +
      '<blockquote>' + esc(pb.quote) + '</blockquote>' +
      '<p class="muted">Step 1 — choose your playbook above. Step 2 — fill in your hunter below. Step 3 — press <strong>Build my sheet</strong> at the bottom to see the finished sheet. Everything saves in this browser as you go.</p>' +
      '<h3>Name &amp; pronouns</h3>' +
      '<div class="fieldrow"><label>Name <input type="text" data-field="name" value="' + esc(h.name) + '" placeholder="Your hunter\u2019s name"></label>' +
      '<label>Pronouns <input type="text" data-field="pronouns" value="' + esc(h.pronouns) + '" placeholder="she / he / they"></label></div>' +
      '<h3>Look</h3>' +
      '<label class="blocklabel">My look <input type="text" data-field="look" value="' + esc(h.look) + '" placeholder="Describe your hunter — face, eyes, clothes, scars"></label>' +
      '<p class="muted">Or show them instead: upload a photo or a drawing of your hunter. It is shrunk to fit and saved in this browser, and it prints on your sheet.</p>' +
      '<label class="blocklabel">Photo <input type="file" id="photoInput" accept="image/*"></label>' +
      (photoWarnMsg ? '<p class="warn">' + esc(photoWarnMsg) + '</p>' : '') +
      (h.photo ? '<div class="photo-preview-wrap"><img class="photo-preview" src="' + esc(h.photo) + '" alt="Hunter portrait preview"><br><button type="button" data-action="remove-photo">Remove photo</button></div>' : '') +
      '<h3>Ratings — pick one line</h3><ul class="checklist">' + ratingHtml + '</ul>' +
      '<p class="muted">Ratings improve when you level up — fill all 5 experience boxes on your sheet, then tap Level Up and pick +1 to a rating (up to the max shown).</p>' +
      '<h3>Gear — convert your D&amp;D weapons</h3>' +
      '<p class="muted">Find your old weapons on the chart and add them — they arrive converted into this game\u2019s harm and tags. Armour converts too.</p>' +
      '<h4>Your gear</h4>' + carriedHtml +
      '<div class="fieldrow"><label>Other gear <input type="text" id="otherGearInput" placeholder="e.g. spyglass, lockpicks, lucky coin"></label><span><button type="button" data-action="add-other-gear">Add gear</button></span></div>' +
      '<h4>Conversion chart</h4>' + chartHtml +
      '<h3>Moves — as many as you want</h3>' +
      '<p class="muted">Tick as many moves as you like — from your own playbook, as many as you want. Moves from other playbooks come when you level up. Picked moves will show up in <strong>My Moves</strong> on your sheet. The eight Alternative Weird moves are listed at the end for the magic playbooks — take one instead of Work Sorcery.</p>' +
      '<ul class="checklist moves">' + movesPickerHtml(h, pb) + '</ul>' +
      '<p><button type="button" class="primary big" data-action="build-sheet">Build my sheet — see my sheet</button></p>' +
      '</article>';
    renderPicker();
    renderSelect();
  }

  // ---------- stage 2: PLAYER SHEET ----------
  // Takes an optional hunter (the blank-sheet flow renders a blank hunter
  // without ever swapping the real one in); defaults to the active hunter.
  function renderSheetView(h) {
    h = h || active();
    var pb = playbook(h.playbook);
    var items = impItems(pb);
    // Improvements earned by levelling up — one per level, no points.
    // (Old saves keep whatever they bought under the old points system.)
    var pickedImp = [];
    Object.keys(h.impRatings || {}).forEach(function (r) {
      var n = h.impRatings[r] || 0;
      if (n > 0) pickedImp.push('+1 ' + r + (n > 1 ? ' ×' + n : ''));
    });
    h.improvements.forEach(function (i) {
      var it = items[i];
      if (it) pickedImp.push(it);
    });
    if ((h.allyCount || 0) > 0) {
      var allyItem = null;
      for (var ai = 0; ai < items.length; ai++) if (impInfo(items[ai]).type === 'ally') { allyItem = items[ai]; break; }
      pickedImp.push((allyItem || 'Gain an ally') + ' ×' + h.allyCount);
    }
    if ((h.xMoveLevels || 0) > 0) pickedImp.push('Take a new move from a different playbook ×' + h.xMoveLevels);
    var bonus = ratingBonusText(h, pb);

    $('#sheet').innerHTML =
      '<article class="sheet character-sheet">' +
      '<p class="no-print sheet-actions"><button type="button" data-action="edit-setup">\u2190 Edit setup</button></p>' +
      '<p class="wanted-masthead">WANTED</p>' +
      '<h2 class="sheet-name">' + (blankMode ? '<span class="blank-line name-line">&nbsp;</span>' : esc(h.name || 'Unnamed hunter')) + '</h2>' +
      (h.pronouns ? '<p class="sheet-sub">' + esc(h.pronouns) + '</p>' : '') +
      '<div class="sheet-banner"><p class="sheet-playbook">' + esc(pb.name) + '</p>' +
      '<p class="sheet-quote">\u201c' + esc(pb.quote) + '\u201d</p></div>' +
      (blankMode ? '<p class="sheet-level">Level <span class="blank-line">&nbsp;</span></p>' : '<p class="sheet-level">Level ' + (h.level || 1) + '</p>') +
      (h.photo && !blankMode ? '<p class="sheet-photo-wrap"><img class="sheet-photo" src="' + esc(h.photo) + '" alt="Hunter portrait"></p>' : '') +
      (blankMode ? '<p class="sheet-look"><strong>Look:</strong> <span class="blank-line">&nbsp;</span></p>' : (h.look ? '<p class="sheet-look"><strong>Look:</strong> ' + esc(h.look) + '</p>' : '')) +
      '<h3 class="sheet-h">Ratings</h3><div class="stat-row">' + statBoxesHtml(h, pb) + '</div>' +
      '<p class="sheet-ratings-line muted">' + esc(pb.ratings[h.ratingIdx] || pb.ratings[0]) + (bonus && !blankMode ? ' · Improvements: ' + esc(bonus) : '') + '</p>' +
      '<h3 class="sheet-h">Standing</h3><div class="trackers">' +
      '<div class="tracker-row harm-row"><div class="tracker-head"><strong>Harm</strong><span class="tracker-note">At 4+ harm you are unstable — mark the Unstable line below.</span></div>' +
      '<div class="tracker-boxes">' + boxes(7, h.harm, 'harm', 'skull') + '</div>' +
      '<button type="button" class="unstable-line" data-action="toggle-unstable" aria-pressed="' + (h.unstable ? 'true' : 'false') + '">' + (h.unstable ? '<span class="stamp stamp-harm">' + stampIcon('skull') + '</span>' : '<span class="stamp-slot stamp-slot-harm" aria-hidden="true"><span class="stamp-ghost">' + stampIcon('skull') + '</span></span>') + ' <strong>Unstable</strong> — at 4+ harm you are unstable; your wounds will get worse unless treated.</button></div>' +
      '<div class="tracker-row luck-row"><div class="tracker-head"><strong>Luck</strong><span class="tracker-note">You have 5 luck. Two boxes are already marked — luck spent in past adventures — and you cannot earn more luck.' + (pb.luck ? ' ' + esc(pb.luck) : '') + '</span></div>' +
      '<div class="tracker-boxes">' + luckBoxes(h) + '</div></div>' +
      '<div class="tracker-row xp-row"><div class="tracker-head"><strong>Experience</strong><span class="tracker-note">' + (blankMode ? 'Fill 5 to level up.' : ((h.xp || 0) >= 5 ? 'All 5 boxes are filled — tap Level Up to choose one improvement.' : 'Fill all 5 boxes to level up — mark one whenever a roll totals 6 or less, or a move tells you to.')) + '</span></div>' +
      '<div class="tracker-boxes">' + boxes(5, h.xp, 'xp') + '</div>' +
      (blankMode ? '' : '<p class="levelup-row"><button type="button" class="primary level-up-btn no-print" data-action="level-up"' + ((h.xp || 0) >= 5 ? '' : ' disabled') + '>Level Up</button></p>') + '</div>' +
      trackerHtml(h, pb) +
      '</div>' +
      featHtml(h, pb) +
      '<h3 class="sheet-h">My Moves</h3>' + myMovesHtml(h, pb) +
      '<h3 class="sheet-h">Gear</h3>' + (blankMode ? '<div class="blank-lines" aria-label="Write your gear here"><span></span><span></span><span></span></div>' : ((h.gear && h.gear.length) ? '<ul class="sheet-list"><li>' + h.gear.map(esc).join('</li><li>') + '</li></ul>' : '<p class="muted">No gear carried — go to Edit setup to add gear from the weapon chart.</p>')) +
      (pickedImp.length ? '<h3 class="sheet-h">Improvements taken</h3><p class="muted">Earned by levelling up — one improvement per level.</p><ul class="sheet-list"><li>' + pickedImp.map(esc).join('</li><li>') + '</li></ul>' : '') +
      '<p class="no-print sheet-actions"><button type="button" data-action="edit-setup">\u2190 Edit setup</button> <button type="button" data-action="print-sheet" class="primary">Print sheet</button></p>' +
      '</article>';
    renderSelect();
  }

  function renderAll() {
    var h = active();
    var picker = $('#picker');
    if (picker) picker.style.display = h.view === 'sheet' ? 'none' : '';
    if (h.view === 'sheet') renderSheetView(); else renderSetup();
    renderWizard();
  }

  // ---------- print a blank sheet ----------
  // A blank sheet is the current playbook with everything empty: no name,
  // no look, no photo, no gear, no moves ticked, empty trackers. It is
  // rendered into the page only — the real hunter object and localStorage
  // are never touched — then the real sheet is put back straight after.
  var blankMode = false;
  function blankHunter() {
    var h = newHunter(active().playbook);
    h.moves = [];     // newHunter pre-ticks the fixed moves; a blank sheet has none
    h.luckUsed = 0;   // a blank sheet shows the full 7-box luck track empty, for handwriting
    h.view = 'sheet';
    return h;
  }
  function printBlankSheet() {
    blankMode = true;
    renderSheetView(blankHunter());
    var picker = $('#picker');
    if (picker) picker.style.display = 'none';
    var restored = false;
    function restore() {
      if (restored) return;
      restored = true;
      blankMode = false;
      renderAll();
    }
    // afterprint is the belt-and-braces restore for browsers where
    // window.print() returns before the print dialog closes.
    window.addEventListener('afterprint', restore);
    window.print();
    restore();
    window.removeEventListener('afterprint', restore);
  }

  // Ratings lines look like "Charm-2 Cool+1 Sharp+1 Tough 0 Weird+3".
  function parseRatings(line) {
    var out = {};
    (line || '').replace(/(\w+)\s*([+-]\d+)/g, function (m, k, v) { out[k] = +v; return m; });
    return out;
  }

  // ---------- Level Up walkthrough ----------
  // One improvement per level, as per the rulebook. The button on the
  // sheet is only enabled at 5 experience; the wizard walks through
  // the options step by step — pick one improvement, pick the detail
  // where needed (which move, which playbook), confirm — then
  // experience resets to 0 and the level goes up by 1. Cancelling
  // changes nothing. The overlay is session-only state (levelUp); it
  // never prints.
  var levelUp = null;
  function levelUpOptions(h, pb) {
    var opts = [];
    var items = impItems(pb);
    var hasX = false;
    items.forEach(function (g, i) {
      var info = impInfo(g);
      if (info.type === 'ownmove') {
        var left = pb.moves.filter(function (m, mi) { return !m.fixed && h.moves.indexOf(mi) === -1; }).length;
        opts.push({ type: 'ownmove', label: g, note: 'Pick one more move from your own playbook', disabled: left === 0, why: 'No more moves left in your playbook' });
      } else if (info.type === 'rating') {
        var base = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0])[info.rating];
        var cur = base == null ? null : base + ((h.impRatings && h.impRatings[info.rating]) || 0);
        opts.push({ type: 'rating', label: '+1 ' + info.rating, note: cur == null ? '' : 'Now ' + (cur >= 0 ? '+' : '') + cur + ', max +' + info.max, rating: info.rating, disabled: base == null || cur >= info.max, why: 'Already at the max' });
      } else if (info.type === 'xmove') {
        hasX = true;
        opts.push({ type: 'xmove', label: g, note: 'Pick a move from another playbook', idx: i });
      } else if (info.type === 'ally') {
        opts.push({ type: 'ally', label: g, note: 'You have ' + (h.allyCount || 0) + ((h.allyCount || 0) === 1 ? ' ally' : ' allies') + ' — gain one more', idx: i });
      } else {
        var taken = h.improvements.indexOf(i) !== -1;
        opts.push({ type: 'other', label: g, note: info.type === 'advanced' ? 'Advanced improvement' : '', idx: i, disabled: taken, why: 'Already taken' });
      }
    });
    if (!hasX) opts.push({ type: 'xmove', label: 'Take a new move from a different playbook', note: 'Pick a move from another playbook', idx: null });
    return opts;
  }
  function levelUpSummary(h, pb) {
    var o = levelUp;
    if (!o) return '';
    if (o.type === 'rating') {
      var base = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0])[o.rating];
      var cur = (base == null ? 0 : base) + ((h.impRatings && h.impRatings[o.rating]) || 0) + 1;
      return 'You will gain +1 ' + o.rating + ' — your ' + o.rating + ' becomes ' + (cur >= 0 ? '+' : '') + cur + '.';
    }
    if (o.type === 'ownmove') {
      var m = pb.moves[o.ownMoveIdx];
      return 'You will learn ' + (m ? m.name : 'a move') + ' — a move from your own playbook.';
    }
    if (o.type === 'xmove') {
      var xpb = playbook(o.xPb);
      var xm = xpb.moves[o.xMoveIdx];
      return 'You will learn ' + (xm ? xm.name : 'a move') + ' — a move from the ' + xpb.name + '.';
    }
    if (o.type === 'ally') return 'You will gain another ally — you will have ' + ((h.allyCount || 0) + 1) + ((h.allyCount || 0) + 1 === 1 ? ' ally' : ' allies') + '.';
    var it = impItems(pb)[o.idx];
    return 'You will take: ' + (it || 'an improvement') + '.';
  }
  function openLevelUp() {
    var h = active();
    if (blankMode || (h.xp || 0) < 5) return;
    levelUp = { step: 1, opt: null, type: null, label: '', rating: null, idx: null, ownMoveIdx: null, xPb: null, xMoveIdx: null };
    renderWizard();
  }
  function levelUpPick(optIdx) {
    var h = active(), pb = playbook(h.playbook);
    var opts = levelUpOptions(h, pb);
    var o = opts[optIdx];
    if (!o || o.disabled || !levelUp) return;
    levelUp.opt = optIdx; levelUp.type = o.type; levelUp.label = o.label; levelUp.rating = o.rating || null; levelUp.idx = (o.idx == null ? null : o.idx);
    if (o.type === 'ownmove' || o.type === 'xmove') {
      levelUp.step = 2;
      if (o.type === 'xmove') {
        var other = PLAYBOOKS.filter(function (p) { return p.id !== pb.id; })[0];
        levelUp.xPb = other.id;
        var first = -1;
        other.moves.forEach(function (m, mi) { if (!m.fixed && first === -1) first = mi; });
        levelUp.xMoveIdx = first < 0 ? 0 : first;
      }
    } else {
      levelUp.step = 3;
    }
    renderWizard();
  }
  function levelUpOwnMove(moveIdx) {
    if (!levelUp) return;
    levelUp.ownMoveIdx = moveIdx;
    levelUp.step = 3;
    renderWizard();
  }
  function levelUpXMoveContinue() {
    if (!levelUp) return;
    levelUp.step = 3;
    renderWizard();
  }
  function applyLevelUp() {
    var h = active(), pb = playbook(h.playbook);
    var o = levelUp;
    if (!o) return;
    if (o.type === 'rating') {
      if (!h.impRatings) h.impRatings = {};
      h.impRatings[o.rating] = (h.impRatings[o.rating] || 0) + 1;
    } else if (o.type === 'ownmove') {
      if (h.moves.indexOf(o.ownMoveIdx) === -1) { h.moves.push(o.ownMoveIdx); h.moves.sort(function (a, b) { return a - b; }); }
    } else if (o.type === 'xmove') {
      h.xMoveLevels = (h.xMoveLevels || 0) + 1;
      if (!h.xMoves) h.xMoves = [];
      h.xMoves.push({ pb: o.xPb, moveIdx: o.xMoveIdx });
    } else if (o.type === 'ally') {
      h.allyCount = (h.allyCount || 0) + 1;
    } else if (o.type === 'other') {
      if (h.improvements.indexOf(o.idx) === -1) h.improvements.push(o.idx);
    }
    h.xp = 0;
    h.level = (h.level || 1) + 1;
    levelUp = null;
    save(); renderAll();
  }
  function renderWizard() {
    var el = document.getElementById('levelUpOverlay');
    if (!levelUp || blankMode) { if (el) el.remove(); return; }
    var h = active(), pb = playbook(h.playbook);
    var html = '';
    if (levelUp.step === 1) {
      var opts = levelUpOptions(h, pb);
      html = '<h2>Level Up — Level ' + ((h.level || 1) + 1) + '</h2>' +
        '<p>One improvement, as per the rulebook. Pick one — your experience resets to 0 and your level goes up by 1.</p>' +
        '<div class="lu-opts">' + opts.map(function (o, i) {
          return '<button type="button" class="lu-opt" data-action="lu-pick" data-opt="' + i + '"' + (o.disabled ? ' disabled' : '') + '><strong>' + esc(o.label) + '</strong>' + (o.note ? '<span>' + esc(o.note) + '</span>' : '') + (o.disabled && o.why ? '<span class="lu-why">' + esc(o.why) + '</span>' : '') + '</button>';
        }).join('') + '</div>' +
        '<p class="lu-actions"><button type="button" data-action="lu-cancel">Cancel — level up later</button></p>';
    } else if (levelUp.step === 2 && levelUp.type === 'ownmove') {
      var left = pb.moves.map(function (m, i) { return { m: m, i: i }; }).filter(function (o) { return !o.m.fixed && h.moves.indexOf(o.i) === -1; });
      html = '<h2>Level Up — pick a move</h2><p>One more move from your own playbook, ' + esc(pb.name) + ':</p>' +
        '<div class="lu-opts">' + left.map(function (o) {
          return '<button type="button" class="lu-opt" data-action="lu-ownmove" data-move="' + o.i + '"><strong>' + esc(o.m.name) + '</strong><span>' + esc(o.m.text) + '</span></button>';
        }).join('') + '</div>' +
        '<p class="lu-actions"><button type="button" data-action="lu-back">\u2190 Back</button> <button type="button" data-action="lu-cancel">Cancel</button></p>';
    } else if (levelUp.step === 2 && levelUp.type === 'xmove') {
      var otherPbs = PLAYBOOKS.filter(function (p) { return p.id !== pb.id; });
      var selPb = playbook(levelUp.xPb || otherPbs[0].id);
      var moveOpts = selPb.moves.map(function (m, i) { return { m: m, i: i }; }).filter(function (o) { return !o.m.fixed; });
      html = '<h2>Level Up — pick a move from another playbook</h2>' +
        '<div class="fieldrow"><label>Playbook <select class="lu-xpb">' + otherPbs.map(function (p) {
          return '<option value="' + p.id + '"' + (selPb.id === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>';
        }).join('') + '</select></label>' +
        '<label>Move <select class="lu-xmove">' + moveOpts.map(function (o) {
          return '<option value="' + o.i + '"' + (levelUp.xMoveIdx === o.i ? ' selected' : '') + '>' + esc(o.m.name) + '</option>';
        }).join('') + '</select></label></div>' +
        '<p class="lu-actions"><button type="button" class="primary" data-action="lu-xmove-continue">Continue \u2192</button> <button type="button" data-action="lu-back">\u2190 Back</button> <button type="button" data-action="lu-cancel">Cancel</button></p>';
    } else {
      html = '<h2>Level Up — confirm</h2><p>' + esc(levelUpSummary(h, pb)) + '</p>' +
        '<p class="muted">Your experience resets to 0 and you become Level ' + ((h.level || 1) + 1) + '.</p>' +
        '<p class="lu-actions"><button type="button" class="primary" data-action="lu-confirm">Take this improvement</button> <button type="button" data-action="lu-back">\u2190 Back</button> <button type="button" data-action="lu-cancel">Cancel</button></p>';
    }
    if (!el) {
      el = document.createElement('div');
      el.id = 'levelUpOverlay';
      el.className = 'levelup-overlay no-print';
      document.body.appendChild(el);
    }
    el.innerHTML = '<div class="levelup-modal" role="dialog" aria-label="Level up">' + html + '</div>';
  }

  // Photo upload: downscale client-side (max ~480px, JPEG) and store as a
  // data URL on the hunter, so it saves in the browser and prints. If the
  // result is too big for localStorage, the old photo is kept and the
  // hunter is warned — the save is never allowed to crash.
  function handlePhotoFile(file) {
    var h = active();
    if (typeof FileReader === 'undefined') { photoWarnMsg = 'This browser cannot read photos.'; renderAll(); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 480;
        var scale = Math.min(1, max / Math.max(img.width || 1, img.height || 1));
        var canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round((img.width || 1) * scale));
        canvas.height = Math.max(1, Math.round((img.height || 1) * scale));
        var ctx = canvas.getContext ? canvas.getContext('2d') : null;
        if (!ctx) { photoWarnMsg = 'This browser cannot shrink photos — try a smaller image.'; renderAll(); return; }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var url;
        try { url = canvas.toDataURL('image/jpeg', 0.82); } catch (err) { photoWarnMsg = 'That photo could not be read.'; renderAll(); return; }
        if (!url || url.length > 900000) { photoWarnMsg = 'That photo is still too big to save in this browser — try a smaller or simpler image.'; renderAll(); return; }
        var prev = h.photo;
        h.photo = url;
        if (save()) { photoWarnMsg = ''; } else {
          h.photo = prev;
          photoWarnMsg = 'That photo was too big to save in this browser — your old photo was kept. Try a smaller image.';
        }
        renderAll();
      };
      img.onerror = function () { photoWarnMsg = 'That file did not look like a photo.'; renderAll(); };
      img.src = reader.result;
    };
    reader.onerror = function () { photoWarnMsg = 'That photo could not be read.'; renderAll(); };
    reader.readAsDataURL(file);
  }

  // Events (delegated on the document)
  document.addEventListener('click', function (e) {
    var act = e.target.closest('[data-action]');
    if (act) {
      var a = act.getAttribute('data-action');
      if (a === 'level-up') { openLevelUp(); return; }
      if (a === 'toggle-expat-hint') { expatHintOpen = !expatHintOpen; renderAll(); return; }
      if (a === 'toggle-unstable') { var hu = active(); hu.unstable = !hu.unstable; save(); renderAll(); return; }
      if (a === 'lu-cancel') { levelUp = null; renderWizard(); return; }
      if (a === 'lu-back') { if (levelUp) { levelUp.step = 1; levelUp.opt = null; renderWizard(); } return; }
      if (a === 'lu-pick') { levelUpPick(+act.getAttribute('data-opt')); return; }
      if (a === 'lu-ownmove') { levelUpOwnMove(+act.getAttribute('data-move')); return; }
      if (a === 'lu-xmove-continue') { levelUpXMoveContinue(); return; }
      if (a === 'lu-confirm') { applyLevelUp(); return; }
      if (a === 'build-sheet') { active().view = 'sheet'; save(); renderAll(); return; }
      if (a === 'edit-setup') { active().view = 'setup'; save(); renderAll(); return; }
      if (a === 'print-sheet') { window.print(); return; }
      if (a === 'remove-photo') { active().photo = ''; photoWarnMsg = ''; save(); renderAll(); return; }
      if (a === 'add-other-gear') {
        var inp = $('#otherGearInput');
        var v = inp ? inp.value.trim() : '';
        if (v) { active().gear.push(v); save(); renderAll(); }
        return;
      }
    }
    var ca = e.target.closest('[data-chart-add]');
    if (ca) {
      var ci = +ca.getAttribute('data-chart-add');
      if (WEAPON_CHART[ci]) { active().gear.push(WEAPON_CHART[ci].conv); save(); renderAll(); }
      return;
    }
    var gr = e.target.closest('[data-gear-remove]');
    if (gr) {
      active().gear.splice(+gr.getAttribute('data-gear-remove'), 1);
      save(); renderAll(); return;
    }
    var b = e.target.closest('[data-pb]');
    if (b) {
      var npb = playbook(b.getAttribute('data-pb'));
      active().playbook = npb.id;
      active().moves = npb.moves.map(function (m, i) { return m.fixed ? i : -1; }).filter(function (i) { return i >= 0; });
      active().gear = []; active().improvements = []; active().impRatings = {}; active().xMoveLevels = 0; active().xMoves = []; active().allyCount = 0; active().trackers = {}; active().level = 1; active().expatriation = '';
      save(); renderAll(); return;
    }
    var box = e.target.closest('[data-box]');
    if (box) {
      var h = active(); var key = box.getAttribute('data-box'); var i = +box.getAttribute('data-i');
      var cur = key === 'harm' ? h.harm : key === 'luck' ? h.luckUsed : key === 'xp' ? h.xp : (h.trackers[key.slice(3)] || 0);
      var next = (cur === i + 1) ? i : i + 1;
      if (key === 'harm') h.harm = next; else if (key === 'luck') h.luckUsed = next; else if (key === 'xp') h.xp = next; else h.trackers[key.slice(3)] = next;
      save(); renderAll();
    }
    var ms = e.target.closest('.move-stamp');
    if (ms && !ms.disabled) {
      var mi = +ms.getAttribute('data-move');
      var hm = active();
      hm.moves = hm.moves.indexOf(mi) !== -1 ? hm.moves.filter(function (x) { return x !== mi; }) : hm.moves.concat([mi]).sort(function (a, b) { return a - b; });
      save(); renderAll(); return;
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target; var h = active();
    if (t.matches('.lu-xpb')) {
      if (levelUp) {
        var npb = playbook(t.value);
        var first = -1;
        npb.moves.forEach(function (m, mi) { if (!m.fixed && first === -1) first = mi; });
        levelUp.xPb = npb.id;
        levelUp.xMoveIdx = first < 0 ? 0 : first;
        renderWizard();
      }
      return;
    }
    if (t.matches('.lu-xmove')) {
      if (levelUp) { levelUp.xMoveIdx = +t.value; renderWizard(); }
      return;
    }
    if (t.id === 'photoInput' && t.files && t.files[0]) { handlePhotoFile(t.files[0]); return; }
    if (t.matches('input[name="rating"]')) { h.ratingIdx = +t.value; save(); return; }
    if (t.id === 'hunterSelect') { activeId = t.value; save(); renderAll(); return; }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('[data-field]')) {
      var f = t.getAttribute('data-field');
      if (f && f !== 'unstable') { active()[f] = t.value; save(); if (f === 'name') renderSelect(); }
    }
  });

  $('#btnNew').addEventListener('click', function () {
    var h = newHunter(active().playbook);
    hunters.push(h); activeId = h.id; save(); renderAll();
  });
  $('#btnDup').addEventListener('click', function () {
    var c = JSON.parse(JSON.stringify(active())); c.id = uid(); c.name = c.name ? c.name + ' (copy)' : '';
    hunters.push(c); activeId = c.id; save(); renderAll();
  });
  $('#btnDel').addEventListener('click', function () {
    if (hunters.length <= 1) { alert('You need at least one hunter — make a new one first, then delete this one.'); return; }
    if (!confirm('Delete this hunter? This cannot be undone (unless you exported it first).')) return;
    hunters = hunters.filter(function (x) { return x.id !== activeId; });
    activeId = hunters[0].id; save(); renderAll();
  });
  $('#btnExport').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(active(), null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (active().name || 'hunter').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase() + '.json';
    a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  $('#btnImport').addEventListener('click', function () { $('#importFile').click(); });
  $('#importFile').addEventListener('change', function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var h = JSON.parse(r.result);
        if (!h || !h.playbook || !playbook(h.playbook)) throw new Error('not a hunter file');
        h.id = uid(); migrateHunter(h);
        hunters.push(h); activeId = h.id; save(); renderAll();
      } catch (err) { alert('That file did not look like an exported hunter.'); }
    };
    r.readAsText(f); e.target.value = '';
  });
  $('#btnPrint').addEventListener('click', function () {
    // Printing is for the finished sheet: if still in setup, build the
    // sheet first, then print it.
    if (active().view !== 'sheet') { active().view = 'sheet'; save(); renderAll(); }
    window.print();
  });
  $('#btnPrintBlank').addEventListener('click', printBlankSheet);

  renderAll();
  save();
})();
