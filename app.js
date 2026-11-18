// Hunters of the Shattered Coast — interactive character sheets.
// Plain JS, no dependencies. State lives in localStorage (this browser only).
// Two stages: SETUP (pick a playbook, build the hunter) then PLAYER SHEET
// (the finished hunter, clean and printable). Both views are the same hunter:
// the view is stored on the hunter object, so switching never loses anything.
// Old saves (without a `view` field) open on their finished sheet, unnamed
// ones open in setup — nothing is lost in the migration.
// Improvements are point-based: 15 points to spend. Every improvement is
// a stepper: +1 to a rating costs 1 point (up to the listed max), +1 max
// luck costs 1 point (up to 7), any other improvement 2, an advanced
// improvement 3, a move from another playbook 3 per level, with no cap —
// the budget is the only limit. "Gain an ally" counts allies, not a
// level: 2 points per ally, as many as you can afford. Moves are unlimited: tick as many of
// your own playbook's moves as you like, and take as many moves from
// other playbooks as you can afford. D&D weapons convert on the chart
// in setup. Every hunter starts with 3 luck free — buy more with
// improvement points, up to 7. The luck track always shows 7 boxes;
// luck not bought is marked as used and cannot be spent.
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
      ratingIdx: 0, harm: 0, luckUsed: 0, luckMax: 3, xp: 0, unstable: false,
      gear: [], moves: moves, notes: '', improvements: [], impRatings: {},
      xMoveLevels: 0, xMoves: [], allyCount: 0,
      trackers: {}, view: 'setup'
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
    // Luck: the track always shows 7 boxes. Every hunter starts with 3
    // luck free; extra luck is bought (1 point per luck, up to 7) and
    // only the bought part counts toward the 15-point budget. Old saves
    // keep the luck they had, bumped up to 3 if they somehow had less.
    if (typeof h.luckMax !== 'number') h.luckMax = 7;
    if (h.luckMax > 7) h.luckMax = 7;
    if (h.luckMax < 3) h.luckMax = 3;
    if (h.luckUsed > h.luckMax) h.luckUsed = h.luckMax;
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
  function boxes(n, filled, label) {
    var out = '';
    for (var i = 0; i < n; i++) out += '<button type="button" class="box" data-box="' + label + '" data-i="' + i + '" aria-label="' + esc(label) + ' ' + (i + 1) + '">' + (i < filled ? '☒' : '☐') + '</button>';
    return out;
  }
  // The luck track always shows 7 boxes. Luck not bought (7 − luckMax)
  // renders marked and unclickable; the luckMax spendable boxes show
  // empty (luck still available) or marked (luck spent in play). The
  // spendable boxes carry data-i as their spent-index, so the click
  // handler toggles luckUsed exactly as before. In blank mode the full
  // track is empty, for handwriting.
  function luckBoxes(h) {
    if (blankMode) return boxes(7, 0, 'luck');
    var max = h.luckMax || 0;
    var out = '';
    var i, j;
    for (i = 0; i < 7 - max; i++) out += '<span class="box luck-unbought" aria-hidden="true">☒</span>';
    for (j = 0; j < max; j++) {
      out += '<button type="button" class="box" data-box="luck" data-i="' + j + '" aria-label="Luck ' + (j + 1) + '">' + (j < (h.luckUsed || 0) ? '☒' : '☐') + '</button>';
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

  // ---------- improvement points (15-point budget) ----------
  // Costs: +1 to a rating = 1 point, repeatable up to the listed max;
  // any other improvement = 2; an advanced improvement = 3;
  // a move from a different playbook = 3 per level, no cap. Own moves
  // are free ticks, so the 'ownmove' type below is only used to spot
  // (and skip) own-move grants still sitting in a playbook's list.
  // No playbook list currently names an improvement "advanced" in so many
  // words (the Witch's was among the removed last two), so the advanced
  // branch below is dormant — kept so the cost still applies if one is
  // ever added back.
  var IMP_BUDGET = 15;
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
  // Points spent: rating +1s (1 each), cross-playbook levels (3 each),
  // max luck above the free 3 (1 each), allies (2 each), and any one-off
  // improvements still listed (2, or 3 if advanced). Own moves are free
  // ticks now, so they cost nothing.
  function spentPoints(h, pb) {
    var items = impItems(pb), total = 0;
    Object.keys(h.impRatings || {}).forEach(function (r) { total += (h.impRatings[r] || 0) * 1; });
    total += (h.xMoveLevels || 0) * 3;
    total += Math.max(0, (h.luckMax || 0) - 3) * 1;
    total += (h.allyCount || 0) * 2;
    (h.improvements || []).forEach(function (i) {
      var it = items[i];
      // Only one-off improvements live here now; a stale rating, own-move
      // or cross-playbook index charges nothing and does nothing.
      if (it) { var t = impInfo(it).type; if (t === 'other' || t === 'advanced') total += impInfo(it).cost; }
    });
    return total;
  }
  function xMoveActive(h, pb) { return (h.xMoveLevels || 0) > 0; }
  // Default cross-playbook pick: the first other playbook's first
  // non-fixed move. Used when a level is bought before any move is chosen.
  function defaultXPick(pb) {
    var other = null;
    for (var i = 0; i < PLAYBOOKS.length; i++) if (PLAYBOOKS[i].id !== pb.id) { other = PLAYBOOKS[i]; break; }
    var first = -1;
    other.moves.forEach(function (m, mi) { if (!m.fixed && first === -1) first = mi; });
    return { pb: other.id, moveIdx: first < 0 ? 0 : first };
  }
  // One step of a generic improvement stepper. `dir` is +1 or −1.
  function stepChange(el, dir) {
    var h = active(), pb = playbook(h.playbook);
    var kind = el.getAttribute('data-step-plus') || el.getAttribute('data-step-minus');
    var spent = spentPoints(h, pb);
    if (kind === 'luck') {
      // Luck floor is 3 (the free starting luck) and ceiling is 7.
      // Only luck above 3 costs points, so the spent check in the
      // buy branch charges exactly 1 point per extra luck.
      var cur = h.luckMax || 0;
      if (dir > 0) {
        if (cur >= 7 || spent + 1 > IMP_BUDGET) return;
        h.luckMax = cur + 1;
      } else if (cur > 3) {
        h.luckMax = cur - 1;
        if (h.luckUsed > h.luckMax) h.luckUsed = h.luckMax;
      }
    } else if (kind === 'xmove') {
      var curX = h.xMoveLevels || 0;
      if (dir > 0) {
        if (spent + 3 > IMP_BUDGET) return;
        h.xMoveLevels = curX + 1;
        if (!h.xMoves) h.xMoves = [];
        h.xMoves.push(defaultXPick(pb));
      } else if (curX > 0) {
        h.xMoveLevels = curX - 1;
        if (h.xMoves) h.xMoves.length = h.xMoveLevels;
      }
    } else if (kind === 'ally') {
      // Allies have no cap — the budget is the only limit. 2 points each.
      var curA = h.allyCount || 0;
      if (dir > 0) {
        if (spent + 2 > IMP_BUDGET) return;
        h.allyCount = curA + 1;
      } else if (curA > 0) {
        h.allyCount = curA - 1;
      }
    } else if (kind === 'other') {
      var idx = +el.getAttribute('data-idx');
      var it = impItems(pb)[idx];
      if (!it) return;
      var cost = impInfo(it).cost;
      var has = h.improvements.indexOf(idx) !== -1;
      if (dir > 0) {
        if (has || spent + cost > IMP_BUDGET) return;
        h.improvements.push(idx);
      } else if (has) {
        h.improvements = h.improvements.filter(function (x) { return x !== idx; });
      }
    }
    save(); renderAll();
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
      return '<li><label class="movepick"><input type="checkbox" data-move="' + i + '"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' +
        '<span><strong>' + esc(m.name) + '</strong>' + (m.fixed ? ' <em>(you get this)</em>' : '') + ' — ' + esc(m.text) + '</span></label></li>';
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
  function featHtml(pb) {
    return (pb.features || []).map(function (f) {
      return '<h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p>';
    }).join('');
  }
  // ---------- stage 1: SETUP ----------
  var photoWarnMsg = '';
  function renderSetup() {
    var h = active();
    var pb = playbook(h.playbook);
    var items = impItems(pb);
    var spent = spentPoints(h, pb);

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
          return '<li>' + esc(g) + ' <button type="button" data-gear-remove="' + i + '" aria-label="Remove ' + esc(g) + '">✕</button></li>';
        }).join('') + '</ul>'
      : '<p class="muted">No gear carried yet — add weapons and armour from the chart, or write your own below.</p>';

    // Improvements: point-based, 15-point budget. EVERY improvement is a
    // stepper showing its current level, and every stepper respects a max:
    // +1 ratings (1 pt, up to the listed max), max luck (1 pt, up to 7;
    // the first 3 are free),
    // cross-playbook levels (3 pts, no cap — the budget is the limit),
    // "Gain an ally" (2 pts per ally, no cap — the stepper counts allies),
    // one-off improvements (2 pts, or 3 if advanced — level 0 or 1).
    // Own-move grants still sitting in a playbook's list are skipped
    // below: your own book's moves are free ticks now. The
    // cross-playbook option is universal: it is added below only when
    // the playbook's own (trimmed) list does not already have one.
    var baseVals = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0]);
    function fmtVal(v) { return (v >= 0 ? '+' : '') + v; }
    function stepperRow(label, levelText, level, max, cost, kind, idx, min) {
      var afford = spent + cost <= IMP_BUDGET;
      var minusAttrs = 'data-step-minus="' + kind + '"' + (idx != null ? ' data-idx="' + idx + '"' : '');
      var plusAttrs = 'data-step-plus="' + kind + '"' + (idx != null ? ' data-idx="' + idx + '"' : '');
      return '<li class="imp-stepper"><span>' + label + ' <span class="imp-cost">' + cost + (cost === 1 ? ' pt' : ' pts') + ' each</span></span> ' +
        '<span class="stepper-btns"><button type="button" ' + minusAttrs + (level <= (min || 0) ? ' disabled' : '') + ' aria-label="Decrease">−</button>' +
        '<span class="step-level">' + levelText + '</span>' +
        '<button type="button" ' + plusAttrs + (((max != null && level >= max) || !afford) ? ' disabled' : '') + ' aria-label="Increase">+</button></span></li>';
    }
    // Luck first: every hunter starts with 3 luck free; extra luck is
    // 1 point per luck, up to 7 — the stepper cannot go below 3.
    var luckMax = h.luckMax || 0;
    var impHtml = stepperRow('<strong>+1 max luck</strong> — Luck ' + luckMax + ' of 7 (first 3 free)', 'Luck ' + luckMax, luckMax, 7, 1, 'luck', null, 3);
    impHtml += items.map(function (g, i) {
      var info = impInfo(g);
      // Own-move grants are not improvements any more: your own book's
      // moves are free ticks now, so these list items are not rendered.
      if (info.type === 'ownmove') return '';
      if (info.type === 'rating') {
        var count = (h.impRatings && h.impRatings[info.rating]) || 0;
        var base = baseVals[info.rating];
        var cur = base == null ? null : Math.min(info.max, base + count);
        return '<li class="imp-stepper"><span><strong>+1 ' + esc(info.rating) + '</strong> — now <strong>' + (cur == null ? '—' : fmtVal(cur)) + '</strong> (max +' + info.max + ') <span class="imp-cost">1 pt each</span></span> ' +
          '<span class="stepper-btns"><button type="button" data-imp-minus="' + esc(info.rating) + '"' + (count > 0 ? '' : ' disabled') + ' aria-label="Remove one +1 ' + esc(info.rating) + '">−</button>' +
          '<span class="step-level">' + (cur == null ? '—' : fmtVal(cur)) + '</span>' +
          '<button type="button" data-imp-plus="' + esc(info.rating) + '"' + ((base == null || base + count >= info.max || spent + 1 > IMP_BUDGET) ? ' disabled' : '') + ' aria-label="Add one +1 ' + esc(info.rating) + '">+</button></span></li>';
      }
      if (info.type === 'xmove') {
        var xLvl = h.xMoveLevels || 0;
        return stepperRow('<strong>' + esc(g) + '</strong> — pick a move from another playbook per level', 'Lv ' + xLvl, xLvl, null, 3, 'xmove', null);
      }
      if (info.type === 'ally') {
        // Allies are counted, not levelled: the stepper shows how many
        // allies the hunter has, 2 points each, no cap but the budget.
        var allies = h.allyCount || 0;
        var allyText = allies === 1 ? '1 ally' : allies + ' allies';
        return stepperRow('<strong>' + esc(g) + '</strong>', allyText, allies, null, 2, 'ally', null);
      }
      var taken = h.improvements.indexOf(i) !== -1;
      var tag = info.type === 'advanced' ? ' (advanced)' : '';
      return stepperRow('<strong>' + esc(g) + '</strong>' + tag, taken ? 'Lv 1' : 'Lv 0', taken ? 1 : 0, 1, info.cost, 'other', i);
    }).join('');
    // The cross-playbook option is universal (3 points per level, no cap):
    // it is added here only when the playbook's own (trimmed) list does
    // not already have one. There is no own-move option any more — your
    // own book's moves are free ticks now.
    var hasX = items.some(function (g) { return impInfo(g).type === 'xmove'; });
    if (!hasX) {
      var xLvl2 = h.xMoveLevels || 0;
      impHtml += stepperRow('<strong>Take a new move from a different playbook</strong> — pick a move from another playbook per level', 'Lv ' + xLvl2, xLvl2, null, 3, 'xmove', null);
    }
    var pointsLine = spent > IMP_BUDGET
      ? '<p class="warn">You are ' + (spent - IMP_BUDGET) + ' point' + (spent - IMP_BUDGET === 1 ? '' : 's') + ' over the 15-point budget — remove improvements until you are back under budget before you can take more.</p>'
      : '<p><strong>Improvement points: ' + spent + ' spent / 15</strong> — ' + (IMP_BUDGET - spent) + ' left.</p>';
    // One picker per cross-playbook level bought.
    var xPickerHtml = '';
    if (xMoveActive(h, pb)) {
      var otherPbs = PLAYBOOKS.filter(function (p) { return p.id !== pb.id; });
      if (!h.xMoves) h.xMoves = [];
      while (h.xMoves.length < h.xMoveLevels) h.xMoves.push(defaultXPick(pb));
      xPickerHtml = '<p class="muted">A bonus from your improvements — moves from other playbooks, on top of as many of your own book\u2019s moves as you like.</p>';
      for (var xi = 0; xi < h.xMoveLevels; xi++) {
        var pick = h.xMoves[xi] || defaultXPick(pb);
        var selPb = playbook(pick.pb);
        if (selPb.id === pb.id) selPb = otherPbs[0];
        var moveOpts = selPb.moves.map(function (m, i) { return { m: m, i: i }; }).filter(function (o) { return !o.m.fixed; });
        xPickerHtml += '<div class="xmove-box"><h4>Move from another playbook — ' + (xi + 1) + ' of ' + h.xMoveLevels + '</h4>' +
          '<div class="fieldrow"><label>Playbook <select class="xMovePb" data-level="' + xi + '">' + otherPbs.map(function (p) {
            return '<option value="' + p.id + '"' + (selPb.id === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>';
          }).join('') + '</select></label>' +
          '<label>Move <select class="xMoveMove" data-level="' + xi + '">' + moveOpts.map(function (o) {
            return '<option value="' + o.i + '"' + (pick.moveIdx === o.i ? ' selected' : '') + '>' + esc(o.m.name) + '</option>';
          }).join('') + '</select></label></div></div>';
      }
    }

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
      '<p class="muted">Improvements below can raise a rating by +1 (1 point each, as many times as you like up to the max shown).</p>' +
      '<h3>Gear — convert your D&amp;D weapons</h3>' +
      '<p class="muted">Find your old weapons on the chart and add them — they arrive converted into this game\u2019s harm and tags. Armour converts too.</p>' +
      '<h4>Your gear</h4>' + carriedHtml +
      '<div class="fieldrow"><label>Other gear <input type="text" id="otherGearInput" placeholder="e.g. spyglass, lockpicks, lucky coin"></label><span><button type="button" data-action="add-other-gear">Add gear</button></span></div>' +
      '<h4>Conversion chart</h4>' + chartHtml +
      '<h3>Moves — as many as you want</h3>' +
      '<p class="muted">Tick as many moves as you like — from your own playbook, as many as you want, and from other playbooks through Improvements below. Picked moves will show up in <strong>My Moves</strong> on your sheet. The eight Alternative Weird moves are listed at the end for the magic playbooks — take one instead of Work Sorcery.</p>' +
      '<ul class="checklist moves">' + movesPickerHtml(h, pb) + '</ul>' +
      '<h3>Improvements — 15 points to spend</h3>' +
      '<p class="muted">Every improvement is a stepper — use + and − to set its level. Costs: +1 to a rating = 1 point, up to the max shown · Luck: every hunter starts with 3 free; +1 max luck = 1 point, up to 7 · Gain an ally = 2 points per ally, as many as you can afford · any other improvement = 2 points · an advanced improvement = 3 points · a move from a different playbook = 3 points per level, as many levels as you can afford. Your own playbook\u2019s moves are free — tick as many as you like above.</p>' +
      pointsLine +
      '<ul class="checklist">' + impHtml + '</ul>' +
      xPickerHtml +
      '<h3>Notes</h3><textarea data-field="notes" rows="5" placeholder="Allies, enemies, and anything else worth remembering…">' + esc(h.notes) + '</textarea>' +
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
    var pickedImp = [];
    Object.keys(h.impRatings || {}).forEach(function (r) {
      var n = h.impRatings[r] || 0;
      if (n > 0) pickedImp.push('+1 ' + r + (n > 1 ? ' ×' + n : '') + ' (' + n + ' pt' + (n === 1 ? '' : 's') + ')');
    });
    h.improvements.forEach(function (i) {
      var it = items[i];
      if (it) pickedImp.push(it + ' (' + impInfo(it).cost + ' pts)');
    });
    // Only luck above the free 3 costs points, so only that part is listed.
    if ((h.luckMax || 0) > 3) pickedImp.push('Luck ' + h.luckMax + ' (' + (h.luckMax - 3) + ' pt' + ((h.luckMax - 3) === 1 ? '' : 's') + ')');
    if ((h.allyCount || 0) > 0) {
      var allyItem = null;
      for (var ai = 0; ai < items.length; ai++) if (impInfo(items[ai]).type === 'ally') { allyItem = items[ai]; break; }
      var allyLabel = (allyItem || 'Gain an ally') + ' ×' + h.allyCount;
      pickedImp.push(allyLabel + ' (' + (h.allyCount * 2) + ' pts)');
    }
    if ((h.xMoveLevels || 0) > 0) pickedImp.push('Take a new move from a different playbook ×' + h.xMoveLevels + ' (' + (h.xMoveLevels * 3) + ' pts)');
    var spent = spentPoints(h, pb);
    var bonus = ratingBonusText(h, pb);

    $('#sheet').innerHTML =
      '<article class="sheet character-sheet">' +
      '<p class="no-print sheet-actions"><button type="button" data-action="edit-setup">\u2190 Edit setup</button></p>' +
      '<p class="wanted-masthead">WANTED</p>' +
      '<h2 class="sheet-name">' + (blankMode ? '<span class="blank-line name-line">&nbsp;</span>' : esc(h.name || 'Unnamed hunter')) + '</h2>' +
      (h.pronouns ? '<p class="sheet-sub">' + esc(h.pronouns) + '</p>' : '') +
      '<div class="sheet-banner"><p class="sheet-playbook">' + esc(pb.name) + '</p>' +
      '<p class="sheet-quote">\u201c' + esc(pb.quote) + '\u201d</p></div>' +
      (h.photo && !blankMode ? '<p class="sheet-photo-wrap"><img class="sheet-photo" src="' + esc(h.photo) + '" alt="Hunter portrait"></p>' : '') +
      (blankMode ? '<p class="sheet-look"><strong>Look:</strong> <span class="blank-line">&nbsp;</span></p>' : (h.look ? '<p class="sheet-look"><strong>Look:</strong> ' + esc(h.look) + '</p>' : '')) +
      '<h3 class="sheet-h">Ratings</h3><div class="stat-row">' + statBoxesHtml(h, pb) + '</div>' +
      '<p class="sheet-ratings-line muted">' + esc(pb.ratings[h.ratingIdx] || pb.ratings[0]) + (bonus && !blankMode ? ' · Improvements: ' + esc(bonus) : '') + '</p>' +
      '<h3 class="sheet-h">Standing</h3><div class="trackers">' +
      '<p class="tracker-row"><strong>Harm</strong> ' + boxes(7, h.harm, 'harm') + ' <span class="muted">At 4+, unstable. ' +
      '<label><input type="checkbox" data-field="unstable"' + (h.unstable ? ' checked' : '') + '> Unstable</label></span></p>' +
      '<p class="tracker-row"><strong>Luck</strong> ' + luckBoxes(h) + ' <span class="muted">Boxes marked = luck spent. Everyone starts with 3 luck; luck not bought is marked and cannot be spent. Buy more in Improvements — 1 point per luck, up to 7.' + (pb.luck ? ' ' + esc(pb.luck) : '') + '</span></p>' +
      '<p class="tracker-row"><strong>Experience</strong> ' + boxes(5, h.xp, 'xp') + ' <span class="muted">Fill 5 to level up.</span></p>' +
      trackerHtml(h, pb) +
      '</div>' +
      featHtml(pb) +
      '<h3 class="sheet-h">My Moves</h3>' + myMovesHtml(h, pb) +
      '<h3 class="sheet-h">Gear</h3>' + (blankMode ? '<div class="blank-lines" aria-label="Write your gear here"><span></span><span></span><span></span></div>' : ((h.gear && h.gear.length) ? '<ul class="sheet-list"><li>' + h.gear.map(esc).join('</li><li>') + '</li></ul>' : '<p class="muted">No gear carried — go to Edit setup to add gear from the weapon chart.</p>')) +
      (pickedImp.length ? '<h3 class="sheet-h">Improvements taken (' + spent + ' / 15 points)</h3><ul class="sheet-list"><li>' + pickedImp.map(esc).join('</li><li>') + '</li></ul>' : '') +
      (h.notes ? '<h3 class="sheet-h">Notes</h3><p>' + esc(h.notes).replace(/\n/g, '<br>') + '</p>' : '') +
      '<p class="no-print sheet-actions"><button type="button" data-action="edit-setup">\u2190 Edit setup</button> <button type="button" data-action="print-sheet" class="primary">Print sheet</button></p>' +
      '</article>';
    renderSelect();
  }

  function renderAll() {
    var h = active();
    var picker = $('#picker');
    if (picker) picker.style.display = h.view === 'sheet' ? 'none' : '';
    if (h.view === 'sheet') renderSheetView(); else renderSetup();
    renderDiceTray();
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

  // ---------- dice tray (2d6 + rating) ----------
  // Rolls are table tools, not hunter data: the log lives only while the
  // page is open and is never written to localStorage.
  var RATINGS = ['Charm', 'Cool', 'Sharp', 'Tough', 'Weird'];
  var diceMod = 0;
  var diceLog = [];
  function parseRatings(line) {
    var out = {};
    (line || '').replace(/(\w+)\s*([+-]\d+)/g, function (m, k, v) { out[k] = +v; return m; });
    return out;
  }
  function diceBand(total) {
    if (total >= 12) return { cls: 'band-hit', label: 'Advanced hit — 12+! Something extra goes your way.' };
    if (total >= 10) return { cls: 'band-hit', label: 'Hit — full success.' };
    if (total >= 7) return { cls: 'band-partial', label: 'Partial — 7–9. It works, with a cost or a catch.' };
    return { cls: 'band-miss', label: 'Miss — mark 1 experience, and trouble arrives.' };
  }
  function renderDiceTray() {
    var wrap = $('#diceRatingBtns');
    if (!wrap) return;
    var h = active();
    var pb = playbook(h.playbook);
    var vals = effectiveRatings(h, pb);
    wrap.innerHTML = RATINGS.map(function (r) {
      var v = vals[r];
      var sign = (v == null ? '' : (v >= 0 ? ' +' + v : ' ' + v));
      return '<button type="button" data-dice="' + r + '">' + r + sign + '</button>';
    }).join('');
    var mv = $('#diceModVal');
    if (mv) mv.textContent = (diceMod >= 0 ? '+' : '') + diceMod;
  }
  function doRoll(mod, label) {
    var d1 = 1 + Math.floor(Math.random() * 6);
    var d2 = 1 + Math.floor(Math.random() * 6);
    var total = d1 + d2 + mod;
    var band = diceBand(total);
    var modTxt = (mod >= 0 ? ' +' + mod : ' ' + mod);
    var res = $('#diceResult');
    if (res) res.innerHTML = '<span class="die">' + d1 + '</span> + <span class="die">' + d2 + '</span>' + modTxt + ' = <strong>' + total + '</strong> — <span class="' + band.cls + '">' + esc(band.label) + '</span> <span class="muted">(' + esc(label) + ')</span>';
    diceLog.unshift({ d1: d1, d2: d2, mod: mod, total: total, label: label, band: band.label });
    if (diceLog.length > 8) diceLog.length = 8;
    var log = $('#diceLog');
    if (log) log.innerHTML = diceLog.map(function (r) {
      return '<li><span class="die">' + r.d1 + '</span> + <span class="die">' + r.d2 + '</span>' + (r.mod >= 0 ? ' +' + r.mod : ' ' + r.mod) + ' = <strong>' + r.total + '</strong> — ' + esc(r.label) + ' · ' + esc(r.band) + '</li>';
    }).join('');
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
    var ip = e.target.closest('[data-imp-plus]');
    if (ip) {
      var r = ip.getAttribute('data-imp-plus');
      var hp = active(); var pbp = playbook(hp.playbook);
      var base = parseRatings(pbp.ratings[hp.ratingIdx] || pbp.ratings[0])[r];
      var max = ratingMax(pbp, r);
      var cur = (hp.impRatings && hp.impRatings[r]) || 0;
      if (base != null && (max == null || base + cur < max) && spentPoints(hp, pbp) + 1 <= IMP_BUDGET) {
        if (!hp.impRatings) hp.impRatings = {};
        hp.impRatings[r] = cur + 1;
        save(); renderAll();
      }
      return;
    }
    var im = e.target.closest('[data-imp-minus]');
    if (im) {
      var rm = im.getAttribute('data-imp-minus');
      var hm = active();
      var curm = (hm.impRatings && hm.impRatings[rm]) || 0;
      if (curm > 0) {
        hm.impRatings[rm] = curm - 1;
        if (hm.impRatings[rm] === 0) delete hm.impRatings[rm];
        save(); renderAll();
      }
      return;
    }
    // Generic improvement steppers: cross-playbook levels, allies,
    // one-off improvements, and max luck.
    var sp = e.target.closest('[data-step-plus]');
    if (sp) { stepChange(sp, 1); return; }
    var sm = e.target.closest('[data-step-minus]');
    if (sm) { stepChange(sm, -1); return; }
    var b = e.target.closest('[data-pb]');
    if (b) {
      var npb = playbook(b.getAttribute('data-pb'));
      active().playbook = npb.id;
      active().moves = npb.moves.map(function (m, i) { return m.fixed ? i : -1; }).filter(function (i) { return i >= 0; });
      active().gear = []; active().improvements = []; active().impRatings = {}; active().xMoveLevels = 0; active().xMoves = []; active().allyCount = 0; active().trackers = {};
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
  });
  document.addEventListener('change', function (e) {
    var t = e.target; var h = active();
    if (t.matches('[data-move]')) {
      var i = +t.getAttribute('data-move');
      h.moves = t.checked ? h.moves.concat([i]).sort(function (a, b) { return a - b; }) : h.moves.filter(function (x) { return x !== i; });
      save(); renderAll(); return;
    }
    if (t.matches('.xMovePb')) {
      var lvl = +t.getAttribute('data-level');
      var np = playbook(t.value);
      var first = -1;
      np.moves.forEach(function (m, mi) { if (!m.fixed && first === -1) first = mi; });
      if (!h.xMoves) h.xMoves = [];
      h.xMoves[lvl] = { pb: np.id, moveIdx: first < 0 ? 0 : first };
      save(); renderAll(); return;
    }
    if (t.matches('.xMoveMove')) {
      var lvl2 = +t.getAttribute('data-level');
      if (h.xMoves && h.xMoves[lvl2]) h.xMoves[lvl2].moveIdx = +t.value;
      save(); renderAll(); return;
    }
    if (t.id === 'photoInput' && t.files && t.files[0]) { handlePhotoFile(t.files[0]); return; }
    if (t.matches('input[name="rating"]')) { h.ratingIdx = +t.value; save(); return; }
    if (t.matches('[data-field="unstable"]')) { h.unstable = t.checked; save(); return; }
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

  // Dice tray events (delegated on the tray; it is static HTML, so the
  // listeners survive every sheet re-render).
  var tray = $('#diceTray');
  if (tray) {
    tray.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-dice]') : null;
      if (b) {
        var h = active(); var pb = playbook(h.playbook);
        var vals = effectiveRatings(h, pb);
        var v = vals[b.getAttribute('data-dice')] || 0;
        doRoll(v + diceMod, b.getAttribute('data-dice') + (diceMod ? ' (situational ' + (diceMod >= 0 ? '+' : '') + diceMod + ')' : ''));
        return;
      }
      if (e.target.id === 'diceFlat') { doRoll(diceMod, 'Flat 2d6'); return; }
      if (e.target.id === 'diceModUp') { diceMod = Math.min(3, diceMod + 1); renderDiceTray(); return; }
      if (e.target.id === 'diceModDown') { diceMod = Math.max(-3, diceMod - 1); renderDiceTray(); return; }
      if (e.target.id === 'diceClear') {
        diceLog = [];
        var log = $('#diceLog'); if (log) log.innerHTML = '';
        var res = $('#diceResult'); if (res) res.textContent = 'No roll yet — tap a rating above.';
        return;
      }
    });
  }

  renderAll();
  save();
})();
