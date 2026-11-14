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
  playbooks, in two stages. **Setup first:** pick a playbook, fill in
  name/pronouns, look, a ratings line, veteran-start fields (scar, famed
  deed, old debt, signature treasure), gear, history, and the moves picker
  (picked X of Y expected). Press **Build my sheet**. **Player sheet
  second:** the finished hunter — name, playbook, look, ratings, clickable
  harm/luck/experience/unstable trackers, My Moves with the full text of
  the picked moves, gear, special feature, scar/deed/debt/treasure, notes.
  **Edit setup** goes back to setup keeping everything; **Print Sheet**
  prints only the sheet. Setup and sheet are two views of the same hunter.
  The six magic playbooks (Battle-Mage, Witch, Touched, Cursed, Channeler,
  Fae-Blooded) also offer the 8 Alternative Weird moves as pickable moves.
  A **Dice tray** sits below the sheet: tap a rating to roll 2d6 + that
  rating (taken from the hunter's chosen ratings line), with a situational
  +1/−1 adjuster for forward/ongoing, the 12+/10+/7–9/miss bands, and a
  short roll log. Rolls are not saved; the tray never prints.
- `reference.html` — **Moves Reference**: the condensed reference sheets —
  Hunter Agenda, all 8 basic moves in full (10+ / 7-9 / 12+ and the Use
  Magic glitch list), the Alternative Weird moves and Phenomena, harm /
  armour / luck / recovery / levelling / end of session, the Keeper's
  reference (Agenda, Principles, Keeper moves, Harm moves, Pirate Lord /
  captain / port-folk / location moves), and voyage & threat creation
  (including the countdown names vs the site's Tide).
- `data.js` — all 28 playbooks' data (quotes, looks, ratings, moves, gear,
  history, improvements), shared by the Hunters page. 236 moves total:
  188 playbook moves + 48 Alternative Weird moves (8 each on the 6 magic
  playbooks).
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
`index.html`, `keepers.html`, `hunters.html`, `reference.html`, `data.js`,
`app.js`, `style.css`, `playbooks.pdf`, `README.md`. Pages is already enabled from
`main` / (root) at `https://nswa9002.github.io/hunters-of-the-shattered-coast/`.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from the two source playbook PDFs. An
unofficial fan conversion for private table use; keep the original rulebook
at the table for the full text of the game.
