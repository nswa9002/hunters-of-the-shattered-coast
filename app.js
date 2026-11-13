// Hunters of the Shattered Coast — interactive character sheets.
// Plain JS, no dependencies. State lives in localStorage (this browser only).
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
      notes: '', improvements: [], trackers: {}
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

  function renderSheet() {
    var h = active();
    var pb = playbook(h.playbook);
    var fixedCount = pb.moves.filter(function (m) { return m.fixed; }).length;
    var expected = fixedCount + pb.pick;
    var picked = h.moves.length;
    var gearItems = splitList(pb.gear);
    var impItems = splitList(pb.improvements);

    var movesHtml = pb.moves.map(function (m, i) {
      var checked = h.moves.indexOf(i) !== -1;
      return '<li><label class="movepick"><input type="checkbox" data-move="' + i + '"' + (checked ? ' checked' : '') + (m.fixed ? ' disabled' : '') + '>' +
        '<span><strong>' + esc(m.name) + '</strong>' + (m.fixed ? ' <em>(you get this)</em>' : '') + ' — ' + esc(m.text) + '</span></label></li>';
    }).join('');

    var myMoves = h.moves.map(function (i) {
      var m = pb.moves[i];
      return '<li><strong>' + esc(m.name) + '</strong> — ' + esc(m.text) + '</li>';
    }).join('');

    var featHtml = (pb.features || []).map(function (f) {
      return '<h3>' + esc(f.title) + '</h3><p>' + esc(f.text) + '</p>';
    }).join('');

    var trackerHtml = (pb.trackers || []).map(function (tr) {
      var val = h.trackers[tr.key] || 0;
      return '<p><strong>' + esc(tr.label) + ':</strong> ' + boxes(tr.boxes, val, 'tr:' + tr.key) +
        ' <span class="muted">' + esc(tr.note || '') + '</span></p>';
    }).join('');

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
      '<article class="sheet">' +
      '<h2>' + esc(pb.name) + ' <span class="muted">(' + esc(pb.orig) + ')</span></h2>' +
      '<blockquote>' + esc(pb.quote) + '</blockquote>' +
      '<div class="fieldrow"><label>Name <input type="text" data-field="name" value="' + esc(h.name) + '" placeholder="Your hunter\u2019s name"></label>' +
      '<label>Pronouns <input type="text" data-field="pronouns" value="' + esc(h.pronouns) + '" placeholder="she / he / they"></label></div>' +
      '<p><strong>Look:</strong> ' + esc(pb.look) + '</p>' +
      '<label class="blocklabel">My look <input type="text" data-field="look" value="' + esc(h.look) + '" placeholder="Pick from the lists above, or write your own"></label>' +
      '<h3>Ratings — pick one line</h3><ul class="checklist">' + ratingHtml + '</ul>' +
      '<div class="trackers">' +
      '<p><strong>Harm:</strong> ' + boxes(7, h.harm, 'harm') + ' <span class="muted">At 4+, unstable. ' +
      '<label><input type="checkbox" data-field="unstable"' + (h.unstable ? ' checked' : '') + '> Unstable</label></span></p>' +
      '<p><strong>Luck:</strong> ' + boxes(7, h.luckUsed, 'luck') + ' <span class="muted">Boxes marked = luck spent. Veteran start: 1 spent, 6 left.' + (pb.luck ? ' ' + esc(pb.luck) : '') + '</span></p>' +
      '<p><strong>Experience:</strong> ' + boxes(5, h.xp, 'xp') + ' <span class="muted">Fill 5 to level up.</span></p>' +
      trackerHtml +
      '</div>' +
      featHtml +
      '<h3>Moves — picked ' + picked + ' of ' + expected + ' expected' + (picked > expected ? ' (you have ' + (picked - expected) + ' extra — that is fine, just noted)' : '') + '</h3>' +
      '<ul class="checklist moves">' + movesHtml + '</ul>' +
      '<h3>My Moves</h3>' +
      (myMoves ? '<ul class="mymoves">' + myMoves + '</ul>' : '<p class="muted">No moves picked yet — tick moves above and they will appear here.</p>') +
      '<h3>Gear</h3><ul class="checklist">' + gearHtml + '</ul>' +
      '<h3>History</h3><p>' + esc(pb.history) + '</p>' +
      '<h3>Veteran start — level 13</h3>' +
      '<div class="fieldrow"><label>Scar <input type="text" data-field="scar" value="' + esc(h.scar) + '" placeholder="A limp, a hand that shakes near bells…"></label>' +
      '<label>Famed deed <input type="text" data-field="deed" value="' + esc(h.deed) + '" placeholder="The deed the ports still sing about"></label></div>' +
      '<div class="fieldrow"><label>Old debt <input type="text" data-field="debt" value="' + esc(h.debt) + '" placeholder="A debt someone can collect"></label>' +
      '<label>Signature treasure <input type="text" data-field="treasure" value="' + esc(h.treasure) + '" placeholder="Your best magic item, translated into tags"></label></div>' +
      '<h3>Improvements</h3><ul class="checklist">' + impHtml + '</ul>' +
      '<h3>Notes &amp; history</h3><textarea data-field="notes" rows="5" placeholder="History picks, allies, enemies, consumed magics, rotes, and anything else worth remembering…">' + esc(h.notes) + '</textarea>' +
      '</article>';
    renderPicker();
    renderSelect();
  }

  function renderAll() { renderSheet(); }

  // Events (delegated on the sheet)
  document.addEventListener('click', function (e) {
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
      save(); renderSheet(); return;
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
        h.id = uid(); hunters.push(h); activeId = h.id; save(); renderAll();
      } catch (err) { alert('That file did not look like an exported hunter.'); }
    };
    r.readAsText(f); e.target.value = '';
  });
  $('#btnPrint').addEventListener('click', function () { window.print(); });

  renderAll();
  save();
})();
