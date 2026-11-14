// Hunters of the Shattered Coast — interactive character sheets.
// Plain JS, no dependencies. State lives in localStorage (this browser only).
// Two stages: SETUP (pick a playbook, build the hunter) then PLAYER SHEET
// (the finished hunter, clean and printable). Both views are the same hunter:
// the view is stored on the hunter object, so switching never loses anything.
// Old saves (without a `view` field) open on the sheet if the hunter has a
// name, and in setup if they don't — nothing is lost in the migration.
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
      id: uid(), playbook: pb.id, name: '', pronouns: '', look: '',
      ratingIdx: 0, harm: 0, luckUsed: 1, xp: 0, unstable: false,
      gear: [], moves: moves, scar: '', deed: '', debt: '', treasure: '',
      notes: '', improvements: [], trackers: {}, view: 'setup'
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
  hunters.forEach(function (h) {
    if (!h.view) h.view = h.name ? 'sheet' : 'setup';
    if (typeof h.luckUsed !== 'number') h.luckUsed = 1;
    if (!Array.isArray(h.moves)) h.moves = [];
    if (!Array.isArray(h.gear)) h.gear = [];
    if (!Array.isArray(h.improvements)) h.improvements = [];
    if (!h.trackers) h.trackers = {};
  });
  function active() {
    for (var i = 0; i < hunters.length; i++) if (hunters[i].id === activeId) return hunters[i];
    activeId = hunters[0].id;
    return hunters[0];
  }
  function save() {
    try {
      localStorage.setItem(STORE, JSON.stringify(hunters));
      localStorage.setItem(ACTIVE, activeId);
      var d = new Date();
      var t = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
      $('#saveStatus').textContent = 'Saved in this browser · ' + t;
    } catch (e) {
      $('#saveStatus').textContent = 'Could not save in this browser (storage unavailable)';
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

  function renderPicker() {
    var groups = { original: 'The original 12', 'new': 'The 16 new playbooks' };
    var html = '';
    ['original', 'new'].forEach(function (g) {
      html += '<h3>' + groups[g] + '</h3><div class="pickgrid">';
      PLAYBOOKS.filter(function (p) { return p.group === g; }).forEach(function (p) {
        html += '<button type="button" class="pickbtn' + (active().playbook === p.id ? ' on' : '') + '" data-pb="' + p.id + '">' + esc(p.name) + '<span>' + esc(p.orig) + '</span></button>';
      });
      html += '</div>';
    });
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
  function movesPickerHtml(h, pb) {
    return pb.moves.map(function (m, i) {
      var checked = h.moves.indexOf(i) !== -1;
      return '<li><label class="movepick"><input type="checkbox" data-move="' + i + '"' + (checked ? ' checked' : '') + (m.fixed ? ' disabled' : '') + '>' +
        '<span><strong>' + esc(m.name) + '</strong>' + (m.fixed ? ' <em>(you get this)</em>' : '') + ' — ' + esc(m.text) + '</span></label></li>';
    }).join('');
  }
  function myMovesHtml(h, pb) {
    var list = h.moves.map(function (i) {
      var m = pb.moves[i];
      if (!m) return '';
      return '<article class="move-card"><h4>' + esc(m.name) + '</h4><p>' + esc(m.text) + '</p></article>';
    }).join('');
    return list ? '<div class="move-cards">' + list + '</div>' : '<p class="muted">No moves picked yet — go to Edit setup and tick moves, and they will appear here.</p>';
  }
  function statBoxesHtml(h, pb) {
    var vals = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0]);
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
  function renderSetup() {
    var h = active();
    var pb = playbook(h.playbook);
    var fixedCount = pb.moves.filter(function (m) { return m.fixed; }).length;
    var expected = fixedCount + pb.pick;
    var picked = h.moves.length;
    var gearItems = splitList(pb.gear);
    var impItems = splitList(pb.improvements);

    var gearHtml = gearItems.map(function (g, i) {
      var checked = h.gear.indexOf(i) !== -1;
      return '<li><label><input type="checkbox" data-gear="' + i + '"' + (checked ? ' checked' : '') + '> ' + esc(g) + '</label></li>';
    }).join('') || '<li>' + esc(pb.gear) + '</li>';

    var impHtml = impItems.map(function (g, i) {
      var checked = h.improvements.indexOf(i) !== -1;
      return '<li><label><input type="checkbox" data-imp="' + i + '"' + (checked ? ' checked' : '') + '> ' + esc(g) + '</label></li>';
    }).join('');

    var ratingHtml = pb.ratings.map(function (r, i) {
      return '<li><label><input type="radio" name="rating" value="' + i + '"' + (h.ratingIdx === i ? ' checked' : '') + '> ' + esc(r) + '</label></li>';
    }).join('');

    $('#sheet').innerHTML =
      '<article class="sheet setup">' +
      '<h2>Set up your hunter — ' + esc(pb.name) + ' <span class="muted">(' + esc(pb.orig) + ')</span></h2>' +
      '<blockquote>' + esc(pb.quote) + '</blockquote>' +
      '<p class="muted">Step 1 — pick a playbook above. Step 2 — fill in the hunter below. Step 3 — press <strong>Build my sheet</strong> at the bottom to see the finished sheet. Everything saves in this browser as you go.</p>' +
      '<h3>Name &amp; pronouns</h3>' +
      '<div class="fieldrow"><label>Name <input type="text" data-field="name" value="' + esc(h.name) + '" placeholder="Your hunter\u2019s name"></label>' +
      '<label>Pronouns <input type="text" data-field="pronouns" value="' + esc(h.pronouns) + '" placeholder="she / he / they"></label></div>' +
      '<h3>Look</h3><p><strong>Pick from the lists:</strong> ' + esc(pb.look) + '</p>' +
      '<label class="blocklabel">My look <input type="text" data-field="look" value="' + esc(h.look) + '" placeholder="Pick from the lists above, or write your own"></label>' +
      '<h3>Ratings — pick one line</h3><ul class="checklist">' + ratingHtml + '</ul>' +
      '<h3>Veteran start — level 13</h3>' +
      '<div class="fieldrow"><label>Scar <input type="text" data-field="scar" value="' + esc(h.scar) + '" placeholder="A limp, a hand that shakes near bells…"></label>' +
      '<label>Famed deed <input type="text" data-field="deed" value="' + esc(h.deed) + '" placeholder="The deed the ports still sing about"></label></div>' +
      '<div class="fieldrow"><label>Old debt <input type="text" data-field="debt" value="' + esc(h.debt) + '" placeholder="A debt someone can collect"></label>' +
      '<label>Signature treasure <input type="text" data-field="treasure" value="' + esc(h.treasure) + '" placeholder="Your best magic item, translated into tags"></label></div>' +
      '<h3>Gear — pick what you carry</h3><ul class="checklist">' + gearHtml + '</ul>' +
      '<h3>History</h3><p>' + esc(pb.history) + '</p>' +
      '<h3>Moves — picked ' + picked + ' of ' + expected + ' expected' + (picked > expected ? ' (you have ' + (picked - expected) + ' extra — that is fine, just noted)' : '') + '</h3>' +
      '<p class="muted">Tick the moves you want. Picked moves will show up in <strong>My Moves</strong> on your sheet. The eight Alternative Weird moves are listed at the end for the magic playbooks — take one instead of Work Sorcery.</p>' +
      '<ul class="checklist moves">' + movesPickerHtml(h, pb) + '</ul>' +
      '<h3>Improvements</h3><ul class="checklist">' + impHtml + '</ul>' +
      '<h3>Notes &amp; history</h3><textarea data-field="notes" rows="5" placeholder="History picks, allies, enemies, consumed magics, rotes, and anything else worth remembering…">' + esc(h.notes) + '</textarea>' +
      '<p><button type="button" class="primary big" data-action="build-sheet">Build my sheet — see my sheet</button></p>' +
      '</article>';
    renderPicker();
    renderSelect();
  }

  // ---------- stage 2: PLAYER SHEET ----------
  function renderSheetView() {
    var h = active();
    var pb = playbook(h.playbook);
    var gearItems = splitList(pb.gear);
    var impItems = splitList(pb.improvements);
    var pickedGear = h.gear.map(function (i) { return gearItems[i]; }).filter(function (g) { return g; });
    var pickedImp = h.improvements.map(function (i) { return impItems[i]; }).filter(function (g) { return g; });

    $('#sheet').innerHTML =
      '<article class="sheet character-sheet">' +
      '<p class="no-print sheet-actions"><button type="button" data-action="edit-setup">\u2190 Edit setup</button></p>' +
      '<div class="sheet-banner"><p class="sheet-playbook">' + esc(pb.name) + '</p>' +
      '<p class="sheet-quote">\u201c' + esc(pb.quote) + '\u201d</p></div>' +
      '<h2 class="sheet-name">' + esc(h.name || 'Unnamed hunter') + '</h2>' +
      '<p class="sheet-sub">' + esc(pb.orig) + (h.pronouns ? ' \u00b7 ' + esc(h.pronouns) : '') + '</p>' +
      (h.look ? '<p class="sheet-look"><strong>Look:</strong> ' + esc(h.look) + '</p>' : '') +
      '<h3 class="sheet-h">Ratings</h3><div class="stat-row">' + statBoxesHtml(h, pb) + '</div>' +
      '<p class="sheet-ratings-line muted">' + esc(pb.ratings[h.ratingIdx] || pb.ratings[0]) + '</p>' +
      '<h3 class="sheet-h">Standing</h3><div class="trackers">' +
      '<p class="tracker-row"><strong>Harm</strong> ' + boxes(7, h.harm, 'harm') + ' <span class="muted">At 4+, unstable. ' +
      '<label><input type="checkbox" data-field="unstable"' + (h.unstable ? ' checked' : '') + '> Unstable</label></span></p>' +
      '<p class="tracker-row"><strong>Luck</strong> ' + boxes(7, h.luckUsed, 'luck') + ' <span class="muted">Boxes marked = luck spent. Veteran start: 1 spent, 6 left.' + (pb.luck ? ' ' + esc(pb.luck) : '') + '</span></p>' +
      '<p class="tracker-row"><strong>Experience</strong> ' + boxes(5, h.xp, 'xp') + ' <span class="muted">Fill 5 to level up.</span></p>' +
      trackerHtml(h, pb) +
      '</div>' +
      featHtml(pb) +
      '<h3 class="sheet-h">My Moves</h3>' + myMovesHtml(h, pb) +
      '<h3 class="sheet-h">Gear</h3>' + (pickedGear.length ? '<ul class="sheet-list"><li>' + pickedGear.map(esc).join('</li><li>') + '</li></ul>' : '<p class="muted">No gear picked — go to Edit setup to pick gear.</p>') +
      '<h3 class="sheet-h">Your Legend</h3><div class="legend-grid">' +
      '<div class="legend-item"><span class="legend-label">Scar</span><span>' + esc(h.scar || '—') + '</span></div>' +
      '<div class="legend-item"><span class="legend-label">Famed deed</span><span>' + esc(h.deed || '—') + '</span></div>' +
      '<div class="legend-item"><span class="legend-label">Old debt</span><span>' + esc(h.debt || '—') + '</span></div>' +
      '<div class="legend-item"><span class="legend-label">Signature treasure</span><span>' + esc(h.treasure || '—') + '</span></div>' +
      '</div>' +
      '<h3 class="sheet-h">History</h3><p>' + esc(pb.history) + '</p>' +
      (pickedImp.length ? '<h3 class="sheet-h">Improvements taken</h3><ul class="sheet-list"><li>' + pickedImp.map(esc).join('</li><li>') + '</li></ul>' : '') +
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
    var vals = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0]);
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

  // Events (delegated on the document)
  document.addEventListener('click', function (e) {
    var act = e.target.closest('[data-action]');
    if (act) {
      var a = act.getAttribute('data-action');
      if (a === 'build-sheet') { active().view = 'sheet'; save(); renderAll(); return; }
      if (a === 'edit-setup') { active().view = 'setup'; save(); renderAll(); return; }
      if (a === 'print-sheet') { window.print(); return; }
    }
    var b = e.target.closest('[data-pb]');
    if (b) { active().playbook = b.getAttribute('data-pb'); active().moves = playbook(b.getAttribute('data-pb')).moves.map(function (m, i) { return m.fixed ? i : -1; }).filter(function (i) { return i >= 0; }); active().gear = []; active().improvements = []; active().trackers = {}; save(); renderAll(); return; }
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
    if (t.matches('[data-gear]')) {
      var gi = +t.getAttribute('data-gear');
      h.gear = t.checked ? h.gear.concat([gi]) : h.gear.filter(function (x) { return x !== gi; });
      save(); return;
    }
    if (t.matches('[data-imp]')) {
      var ii = +t.getAttribute('data-imp');
      h.improvements = t.checked ? h.improvements.concat([ii]) : h.improvements.filter(function (x) { return x !== ii; });
      save(); return;
    }
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

  // Dice tray events (delegated on the tray; it is static HTML, so the
  // listeners survive every sheet re-render).
  var tray = $('#diceTray');
  if (tray) {
    tray.addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('[data-dice]') : null;
      if (b) {
        var h = active(); var pb = playbook(h.playbook);
        var vals = parseRatings(pb.ratings[h.ratingIdx] || pb.ratings[0]);
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
