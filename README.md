# Hunters of the Shattered Coast — GitHub Pages site

A static site for the *Hunters of the Shattered Coast* playbooks: a fantasy
reskin of the classic hunter playbooks in which veteran heroes (converted
from a D&D 5e level 13 campaign) hunt one Pirate Lord across the Shattered
Coast. Now with **28 playbooks** — the original 12, plus 16 more from the
consolidated 2025 pack.

## Pages

- `index.html` — **How to Play**: premise, the hunt-has-changed conversion
  table, converting your level 13 hero + veteran start, basic moves
  (all 8 + harm/luck/experience).
- `keepers.html` — **Keeper's Korner**: everything for the Chronicler —
  the Pirate Lord sheet (wants, hidden weaknesses, the Tide, his fleet),
  running the hunt and the shape of a voyage, and the ship & company sheet.
- `hunters.html` — **Hunters**: interactive character sheets for all 28
  playbooks. Pick a playbook, fill in name/pronouns/look, pick a ratings
  line, tap harm/luck/experience trackers, tick gear and improvements, and
  pick moves — picked moves appear in a "My Moves" section on the sheet.
- `data.js` — all 28 playbooks' data (quotes, looks, ratings, moves, gear,
  history, improvements), shared by the Hunters page.
- `app.js` — the Hunters sheet app. No build step, no server, no external
  dependencies.
- `style.css` — dark nautical / parchment styling, mobile-friendly, with a
  print stylesheet (Print Sheet prints only the active sheet).
- `playbooks.pdf` — the full 18-page playbook PDF for **the first 12
  playbooks only**. The site now covers 28 playbooks; the PDF is kept as
  the printable version of the original 12.

## Saving (Hunters page)

Every change autosaves to the browser's localStorage, per hunter (keyed by
playbook + name), with a sheet list so several hunters can be kept. Buttons:
New Hunter, Duplicate, Delete, Export (download JSON), Import (upload JSON),
Print Sheet. Saving is per-browser and does not sync between devices —
export to move a hunter.

## Publish on GitHub Pages

Push these files to the root of the repository's `main` branch:
`index.html`, `keepers.html`, `hunters.html`, `data.js`, `app.js`,
`style.css`, `playbooks.pdf`, `README.md`. Pages is already enabled from
`main` / (root) at `https://nswa9002.github.io/hunters-of-the-shattered-coast/`.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from the two source playbook PDFs. An
unofficial fan conversion for private table use; keep the original rulebook
at the table for the full text of the game.
