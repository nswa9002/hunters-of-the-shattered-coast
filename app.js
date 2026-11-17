// Hunters of the Shattered Coast — interactive character sheets.
// Plain JS, no dependencies. State lives in localStorage (this browser only).
// Two stages: SETUP (pick a playbook, build the hunter) then PLAYER SHEET
// (the finished hunter, clean and printable). Both views are the same hunter:
// the view is stored on the hunter object, so switching never loses anything.
// Old saves (without a `view` field) open on their finished sheet, unnamed
// ones open in setup — nothing is lost in the migration.
// Seasoned start (D&D transfers): 10 improvement points to spend, up to 3
// powers carried over, D&D weapons converted on the chart, luck 6 of 7.
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
      ratingIdx: 0, harm: 0, luckUsed: 1, xp: 0, unstable: false,
      gear: [], moves: moves, scar: '', deed: '', debt: '', treasure: '',
      powers: [], notes: '', improvements: [], xMove: null, xMoveExtra: false,
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
  // Later migrations: powers/photo/xMove default empty; gear was stored as
  // indices into the playbook gear list — now gear is carried text, so old
  // indices are translated into the same gear strings (nothing is lost).
  hunters.forEach(function (h) {
    if (!h.view) h.view = h.name ? 'sheet' : 'setup';
    if (typeof h.luckUsed !== 'number') h.luckUsed = 1;
    if (!Array.isArray(h.moves)) h.moves = [];
    if (!Array.isArray(h.gear)) h.gear = [];
    if (!Array.isArray(h.improvements)) h.improvements = [];
    if (!Array.isArray(h.powers)) h.powers = [];
    if (typeof h.photo !== 'string') h.photo = '';
    if (!h.xMove || typeof h.xMove !== 'object') h.xMove = null;
    if (typeof h.xMoveExtra !== 'boolean') h.xMoveExtra = false;
    if (!h.trackers) h.trackers = {};
    if (h.gear.some(function (g) { return typeof g === 'number'; })) {
      var gi = splitList(playbook(h.playbook).gear);
      h.gear = h.gear.map(function (g) { return typeof g === 'number' ? gi[g] : g; })
        .filter(function (g) { return typeof g === 'string' && g; });
    }
  });
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

  // ---------- improvement points (seasoned start: 10 points) ----------
  // Costs: +1 to a rating = 2; another move from your own playbook = 2
  // (grants one extra chosen-move slot); any other improvement = 2;
  // an advanced improvement = 3; a move from a different playbook = 3.
  // The data marks only one improvement as advanced in so many words
  // (the Witch's "Advanced (after five level-ups)" item); everything
  // else in a playbook's list costs 2 unless it is a cross-playbook move.
  function impInfo(item) {
    var m = /^\+1 (Charm|Cool|Sharp|Tough|Weird) \(max \+(\d)\)/.exec(item || '');
    if (m) return { cost: 2, type: 'rating', rating: m[1], max: +m[2] };
    if (/move from another playbook/i.test(item)) return { cost: 3, type: 'xmove' };
    if (/another .*move/i.test(item) || /another rote/i.test(item)) return { cost: 2, type: 'ownmove' };
    if (/advanced/i.test(item)) return { cost: 3, type: 'advanced' };
    return { cost: 2, type: 'other' };
  }
  function impItems(pb) { return splitList(pb.improvements); }
  function spentPoints(h, pb) {
    var items = impItems(pb), total = 0;
    h.improvements.forEach(function (i) { var it = items[i]; if (it) total += impInfo(it).cost; });
    if (h.xMoveExtra) total += 3;
    return total;
  }
  function extraMoveSlots(h, pb) {
    var items = impItems(pb), n = 0;
    h.improvements.forEach(function (i) { var it = items[i]; if (it && impInfo(it).type === 'ownmove') n++; });
    return n;
  }
  function xMoveActive(h, pb) {
    if (h.xMoveExtra) return true;
    var items = impItems(pb);
    return h.improvements.some(function (i) { var it = items[i]; return it && impInfo(it).type === 'xmove'; });
  }
  function chosenMoveCount(h, pb) {
    return h.moves.filter(function (i) { return pb.moves[i] && !pb.moves[i].fixed; }).length;
  }
  function requiredMoves(h, pb) { return 3 + extraMoveSlots(h, pb); }

  // Ratings with any +1 improvements applied (capped at the listed max).
  function effectiveRatings(h, pb, excludeIdx) {
    var vals = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0]);
    var items = impItems(pb);
    h.improvements.forEach(function (i) {
      if (i === excludeIdx) return;
      var info = impInfo(items[i] || '');
      if (info.type === 'rating' && vals[info.rating] != null) {
        vals[info.rating] = Math.min(info.max, vals[info.rating] + 1);
      }
    });
    return vals;
  }
  function ratingBonusText(h, pb) {
    var items = impItems(pb), parts = [];
    h.improvements.forEach(function (i) {
      var info = impInfo(items[i] || '');
      if (info.type === 'rating') parts.push('+1 ' + info.rating);
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
  function movesPickerHtml(h, pb, required) {
    var picked = chosenMoveCount(h, pb);
    return pb.moves.map(function (m, i) {
      var checked = h.moves.indexOf(i) !== -1;
      var disabled = m.fixed || (!checked && picked >= required);
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
    // A move taken from a different playbook (via improvements) is a bonus:
    // it shows here, marked with where it came from, and never counts
    // toward the 3 chosen moves.
    if (h.xMove) {
      var xpb = playbook(h.xMove.pb);
      var xm = xpb.moves[h.xMove.moveIdx];
      if (xm) list += '<article class="move-card xmove"><h4>' + esc(xm.name) + ' <span class="muted">(from ' + esc(xpb.name) + ')</span></h4><p>' + esc(xm.text) + '</p></article>';
    }
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
  function powersHtml(h) {
    var powers = (h.powers || []).filter(function (p) { return p && (p.name || p.effect); });
    if (blankMode) return '<div class="blank-lines" aria-label="Write your carried-over powers here"><span></span><span></span><span></span></div>';
    if (!powers.length) return '<p class="muted">No powers carried over — add up to three in Edit setup.</p>';
    return '<ul class="sheet-list">' + powers.map(function (p) {
      return '<li><strong>' + esc(p.name || 'Unnamed power') + '</strong>' + (p.effect ? ' — ' + esc(p.effect) : '') + '</li>';
    }).join('') + '</ul>';
  }

  // ---------- stage 1: SETUP ----------
  var photoWarnMsg = '';
  function renderSetup() {
    var h = active();
    var pb = playbook(h.playbook);
    var required = requiredMoves(h, pb);
    var picked = chosenMoveCount(h, pb);
    var slots = extraMoveSlots(h, pb);
    var items = impItems(pb);
    var spent = spentPoints(h, pb);
    var left = 10 - spent;

    var ratingHtml = pb.ratings.map(function (r, i) {
      return '<li><label><input type="radio" name="rating" value="' + i + '"' + (h.ratingIdx === i ? ' checked' : '') + '> ' + esc(r) + '</label></li>';
    }).join('');

    // Powers carried over from a D&D life: 3 slots, name + what it does.
    var powersHtmlSetup = '';
    for (var pi = 0; pi < 3; pi++) {
      var pw = (h.powers && h.powers[pi]) || { name: '', effect: '' };
      powersHtmlSetup += '<div class="fieldrow power-row"><label>Power ' + (pi + 1) + ' <input type="text" data-power-name="' + pi + '" value="' + esc(pw.name) + '" placeholder="e.g. Fireball"></label>' +
        '<label>What it does <input type="text" data-power-effect="' + pi + '" value="' + esc(pw.effect) + '" placeholder="e.g. once per voyage, 3-harm far fire, costs 1 luck"></label></div>';
    }

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

    // Improvements: point-based, 10-point budget at the seasoned start.
    var impHtml = items.map(function (g, i) {
      var info = impInfo(g);
      var checked = h.improvements.indexOf(i) !== -1;
      var disabled = '';
      var note = '';
      if (info.type === 'rating') {
        // Disable if the rating is already at its max without this one.
        var vals = effectiveRatings(h, pb, i);
        if (vals[info.rating] >= info.max) { disabled = ' disabled'; note = ' (already at max)'; }
      }
      if (!checked && spent + info.cost > 10) disabled = ' disabled';
      var tag = info.type === 'rating' ? ' (+1 rating)' : info.type === 'ownmove' ? ' (+1 extra move slot)' : info.type === 'xmove' ? ' (pick a move from another playbook)' : info.type === 'advanced' ? ' (advanced)' : '';
      return '<li><label><input type="checkbox" data-imp="' + i + '"' + (checked ? ' checked' : '') + disabled + '> ' + esc(g) + tag + ' <span class="imp-cost">' + info.cost + ' pts</span>' + note + '</label></li>';
    }).join('');
    // Playbooks whose own list has no cross-playbook move still get the
    // universal option: take a new move from a different playbook, 3 pts.
    var hasX = items.some(function (g) { return impInfo(g).type === 'xmove'; });
    if (!hasX) {
      var xChecked = !!h.xMoveExtra;
      var xDisabled = (!xChecked && spent + 3 > 10) ? ' disabled' : '';
      impHtml += '<li><label><input type="checkbox" data-imp-x="1"' + (xChecked ? ' checked' : '') + xDisabled + '> Take a new move from a different playbook <span class="imp-cost">3 pts</span></label></li>';
    }
    var pointsLine = spent > 10
      ? '<p class="warn">You are ' + (spent - 10) + ' point' + (spent - 10 === 1 ? '' : 's') + ' over the 10-point budget — remove improvements until you are back under budget before you can take more.</p>'
      : '<p><strong>Improvement points: ' + spent + ' spent / 10</strong> — ' + left + ' left.</p>';
    var xPickerHtml = '';
    if (xMoveActive(h, pb)) {
      var otherPbs = PLAYBOOKS.filter(function (p) { return p.id !== pb.id; });
      var selPb = (h.xMove && playbook(h.xMove.pb)) || otherPbs[0];
      if (selPb.id === pb.id) selPb = otherPbs[0];
      var moveOpts = selPb.moves.map(function (m, i) { return { m: m, i: i }; }).filter(function (o) { return !o.m.fixed; });
      xPickerHtml = '<div class="xmove-box"><h4>Move from another playbook</h4>' +
        '<p class="muted">A bonus from your improvements — it does not count toward your 3 chosen moves.</p>' +
        '<div class="fieldrow"><label>Playbook <select id="xMovePb">' + otherPbs.map(function (p) {
          return '<option value="' + p.id + '"' + (selPb.id === p.id ? ' selected' : '') + '>' + esc(p.name) + '</option>';
        }).join('') + '</select></label>' +
        '<label>Move <select id="xMoveMove">' + moveOpts.map(function (o) {
          return '<option value="' + o.i + '"' + (h.xMove && h.xMove.pb === selPb.id && h.xMove.moveIdx === o.i ? ' selected' : '') + '>' + esc(o.m.name) + '</option>';
        }).join('') + '</select></label></div></div>';
    }

    var movesNote = '';
    if (picked < required) movesNote = '<p class="warn">Pick ' + (required - picked) + ' more move' + (required - picked === 1 ? '' : 's') + ' to build your sheet — every hunter takes exactly ' + required + ' chosen moves' + (slots ? ' (3 + ' + slots + ' extra from improvements)' : '') + '. Fixed moves are always included on top.</p>';
    else if (picked > required) movesNote = '<p class="warn">You have ' + picked + ' moves picked — untick down to ' + required + ' to build your sheet.</p>';
    var ready = picked === required;

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
      '<p class="muted">Improvements below can raise a rating by +1 (2 points each, up to the max shown).</p>' +
      '<h3>Seasoned start</h3>' +
      '<div class="fieldrow"><label>Scar <input type="text" data-field="scar" value="' + esc(h.scar) + '" placeholder="A limp, a hand that shakes near bells…"></label>' +
      '<label>Famed deed <input type="text" data-field="deed" value="' + esc(h.deed) + '" placeholder="The deed the ports still sing about"></label></div>' +
      '<div class="fieldrow"><label>Old debt <input type="text" data-field="debt" value="' + esc(h.debt) + '" placeholder="A debt someone can collect"></label>' +
      '<label>Signature treasure <input type="text" data-field="treasure" value="' + esc(h.treasure) + '" placeholder="Your best magic item, translated into tags"></label></div>' +
      '<h3>Powers carried over</h3>' +
      '<p class="muted">Bring up to three powers from your old life. Agree what each power costs with the Chronicler — rare, costly, story-shaped. If a power could fly, teleport or raise the dead every morning, it does not work like that any more.</p>' +
      powersHtmlSetup +
      '<h3>Gear — convert your D&amp;D weapons</h3>' +
      '<p class="muted">Find your old weapons on the chart and add them — they arrive converted into this game\u2019s harm and tags. Armour converts too.</p>' +
      '<h4>Your gear</h4>' + carriedHtml +
      '<div class="fieldrow"><label>Other gear <input type="text" id="otherGearInput" placeholder="e.g. spyglass, lockpicks, lucky coin"></label><span><button type="button" data-action="add-other-gear">Add gear</button></span></div>' +
      '<h4>Conversion chart</h4>' + chartHtml +
      '<h3>Moves — picked ' + picked + ' of ' + required + '</h3>' +
      movesNote +
      '<p class="muted">Tick the moves you want. Picked moves will show up in <strong>My Moves</strong> on your sheet. The eight Alternative Weird moves are listed at the end for the magic playbooks — take one instead of Work Sorcery.</p>' +
      '<ul class="checklist moves">' + movesPickerHtml(h, pb, required) + '</ul>' +
      '<h3>Improvements — 10 points to spend</h3>' +
      '<p class="muted">Costs: +1 to a rating = 2 points · another move from your own playbook = 2 points · any other improvement = 2 points · an advanced improvement = 3 points · a move from a different playbook = 3 points.</p>' +
      pointsLine +
      '<ul class="checklist">' + impHtml + '</ul>' +
      xPickerHtml +
      '<h3>Notes</h3><textarea data-field="notes" rows="5" placeholder="Allies, enemies, and anything else worth remembering…">' + esc(h.notes) + '</textarea>' +
      '<p><button type="button" class="primary big" data-action="build-sheet">Build my sheet — see my sheet</button></p>' +
      (ready ? '' : '<p class="warn">Pick exactly ' + required + ' chosen moves above before you build your sheet.</p>') +
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
    var pickedImp = h.improvements.map(function (i) {
      var it = items[i];
      return it ? it + ' (' + impInfo(it).cost + ' pts)' : null;
    }).filter(function (g) { return g; });
    if (h.xMoveExtra) pickedImp.push('Take a new move from a different playbook (3 pts)');
    var spent = spentPoints(h, pb);
    var bonus = ratingBonusText(h, pb);
    // On a blank sheet the legend fields are empty write-in lines.
    function legendVal(v) { return blankMode ? '<span class="blank-line">&nbsp;</span>' : esc(v || '—'); }

    $('#sheet').innerHTML =
      '<article class="sheet character-sheet">' +
      '<p class="no-print sheet-actions"><button type="button" data-action="edit-setup">\u2190 Edit setup</button></p>' +
      '<div class="sheet-banner"><p class="sheet-playbook">' + esc(pb.name) + '</p>' +
      '<p class="sheet-quote">\u201c' + esc(pb.quote) + '\u201d</p></div>' +
      '<h2 class="sheet-name">' + (blankMode ? '<span class="blank-line name-line">&nbsp;</span>' : esc(h.name || 'Unnamed hunter')) + '</h2>' +
      (h.pronouns ? '<p class="sheet-sub">' + esc(h.pronouns) + '</p>' : '') +
      (h.photo && !blankMode ? '<p class="sheet-photo-wrap"><img class="sheet-photo" src="' + esc(h.photo) + '" alt="Hunter portrait"></p>' : '') +
      (blankMode ? '<p class="sheet-look"><strong>Look:</strong> <span class="blank-line">&nbsp;</span></p>' : (h.look ? '<p class="sheet-look"><strong>Look:</strong> ' + esc(h.look) + '</p>' : '')) +
      '<h3 class="sheet-h">Ratings</h3><div class="stat-row">' + statBoxesHtml(h, pb) + '</div>' +
      '<p class="sheet-ratings-line muted">' + esc(pb.ratings[h.ratingIdx] || pb.ratings[0]) + (bonus && !blankMode ? ' · Improvements: ' + esc(bonus) : '') + '</p>' +
      '<h3 class="sheet-h">Standing</h3><div class="trackers">' +
      '<p class="tracker-row"><strong>Harm</strong> ' + boxes(7, h.harm, 'harm') + ' <span class="muted">At 4+, unstable. ' +
      '<label><input type="checkbox" data-field="unstable"' + (h.unstable ? ' checked' : '') + '> Unstable</label></span></p>' +
      '<p class="tracker-row"><strong>Luck</strong> ' + boxes(7, h.luckUsed, 'luck') + ' <span class="muted">Boxes marked = luck spent. Seasoned start: 1 spent, 6 left.' + (pb.luck ? ' ' + esc(pb.luck) : '') + '</span></p>' +
      '<p class="tracker-row"><strong>Experience</strong> ' + boxes(5, h.xp, 'xp') + ' <span class="muted">Fill 5 to level up.</span></p>' +
      trackerHtml(h, pb) +
      '</div>' +
      featHtml(pb) +
      '<h3 class="sheet-h">My Moves</h3>' + myMovesHtml(h, pb) +
      '<h3 class="sheet-h">Gear</h3>' + (blankMode ? '<div class="blank-lines" aria-label="Write your gear here"><span></span><span></span><span></span></div>' : ((h.gear && h.gear.length) ? '<ul class="sheet-list"><li>' + h.gear.map(esc).join('</li><li>') + '</li></ul>' : '<p class="muted">No gear carried — go to Edit setup to add gear from the weapon chart.</p>')) +
      '<h3 class="sheet-h">Your Legend</h3><div class="legend-grid">' +
      '<div class="legend-item"><span class="legend-label">Scar</span><span>' + legendVal(h.scar) + '</span></div>' +
      '<div class="legend-item"><span class="legend-label">Famed deed</span><span>' + legendVal(h.deed) + '</span></div>' +
      '<div class="legend-item"><span class="legend-label">Old debt</span><span>' + legendVal(h.debt) + '</span></div>' +
      '<div class="legend-item"><span class="legend-label">Signature treasure</span><span>' + legendVal(h.treasure) + '</span></div>' +
      '</div>' +
      '<h3 class="sheet-h">Powers carried over</h3>' + powersHtml(h) +
      (pickedImp.length ? '<h3 class="sheet-h">Improvements taken (' + spent + ' / 10 points)</h3><ul class="sheet-list"><li>' + pickedImp.map(esc).join('</li><li>') + '</li></ul>' : '') +
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
    h.luckUsed = 0;   // seasoned start spends 1 luck; a blank sheet starts full
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
      if (a === 'build-sheet') {
        var hb = active(); var pb = playbook(hb.playbook);
        if (chosenMoveCount(hb, pb) !== requiredMoves(hb, pb)) {
          alert('Pick exactly ' + requiredMoves(hb, pb) + ' chosen moves before you build your sheet.');
          return;
        }
        hb.view = 'sheet'; save(); renderAll(); return;
      }
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
      active().gear = []; active().improvements = []; active().xMove = null; active().xMoveExtra = false; active().trackers = {};
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
    if (t.matches('[data-imp]')) {
      var ii = +t.getAttribute('data-imp');
      h.improvements = t.checked ? h.improvements.concat([ii]) : h.improvements.filter(function (x) { return x !== ii; });
      if (!t.checked) {
        // Unpicking the cross-playbook improvement also drops the move.
        var it = impItems(playbook(h.playbook))[ii];
        if (it && impInfo(it).type === 'xmove') h.xMove = null;
      }
      save(); renderAll(); return;
    }
    if (t.matches('[data-imp-x]')) {
      h.xMoveExtra = !!t.checked;
      if (!t.checked) h.xMove = null;
      save(); renderAll(); return;
    }
    if (t.id === 'xMovePb') {
      var np = playbook(t.value);
      var first = -1;
      np.moves.forEach(function (m, mi) { if (!m.fixed && first === -1) first = mi; });
      h.xMove = { pb: np.id, moveIdx: first < 0 ? 0 : first };
      save(); renderAll(); return;
    }
    if (t.id === 'xMoveMove') {
      if (h.xMove) h.xMove.moveIdx = +t.value;
      save(); renderAll(); return;
    }
    if (t.id === 'photoInput' && t.files && t.files[0]) { handlePhotoFile(t.files[0]); return; }
    if (t.matches('input[name="rating"]')) { h.ratingIdx = +t.value; save(); return; }
    if (t.matches('[data-field="unstable"]')) { h.unstable = t.checked; save(); return; }
    if (t.id === 'hunterSelect') { activeId = t.value; save(); renderAll(); return; }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.matches('[data-power-name]')) {
      var pi = +t.getAttribute('data-power-name');
      var h = active();
      if (!h.powers[pi]) h.powers[pi] = { name: '', effect: '' };
      h.powers[pi].name = t.value; save(); return;
    }
    if (t.matches('[data-power-effect]')) {
      var pj = +t.getAttribute('data-power-effect');
      var hj = active();
      if (!hj.powers[pj]) hj.powers[pj] = { name: '', effect: '' };
      hj.powers[pj].effect = t.value; save(); return;
    }
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
        h.id = uid(); if (!h.view) h.view = h.name ? 'sheet' : 'setup';
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
