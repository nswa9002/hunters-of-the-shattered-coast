# Hunters of the Shattered Coast — GitHub Pages site

A player-facing static site for the *Hunters of the Shattered Coast*
playbooks: a fantasy reskin of the classic hunter playbooks in which
veteran heroes (converted from a D&D 5e level 13 campaign) hunt one
Pirate Lord across the Shattered Coast. Now with **28 playbooks** — the
original 12, plus 16 more from the consolidated 2025 pack.

There is no Keeper content on this site. It is written for players:
how to play, your character sheet, and the moves reference.

## Pages

- `index.html` — **How to Play**: welcome, the hunt-has-changed
  conversion table, how a roll works, your ratings, harm / luck /
  experience, converting your level 13 hero + veteran start, your ship
  (player-facing: name, kind, qualities, hull harm, crew, funds), and
  the short basic moves.
- `hunters.html` — **Hunters**: interactive character sheets for all 28
  playbooks, in two stages. **Setup first:** pick a playbook, fill in
  name/pronouns, look, a ratings line, veteran-start fields (scar, famed
  deed, old debt, signature treasure), gear, history, and the moves picker
  (picked X of Y expected). Press **Build my sheet**. **Player sheet
  second:** a stylised parchment character sheet — playbook banner and
  quote, big hunter name, ratings as stat boxes, harm/luck/experience/
  unstable trackers, My Moves as readable cards, gear, a "Your Legend"
  section (scar, famed deed, old debt, signature treasure), history,
  improvements taken, and notes. **Edit setup** goes back to setup
  keeping everything; **Print Sheet** prints only the finished sheet.
  Setup and sheet are two views of the same hunter. The six magic
  playbooks (Battle-Mage, Witch, Touched, Cursed, Channeler,
  Fae-Blooded) also offer the 8 Alternative Weird moves as pickable moves.
  A **Dice tray** sits below the sheet: tap a rating to roll 2d6 + that
  rating (taken from the hunter's chosen ratings line), with a situational
  +1/−1 adjuster for forward/ongoing, the 12+/10+/7–9/miss bands, and a
  short roll log. Rolls are not saved; the tray never prints.
- `reference.html` — **Moves Reference**: the player-facing condensed
  reference sheets — Hunter Agenda, all 8 basic moves in full (10+ /
  7-9 / 12+ and the Use Magic glitch list), the Alternative Weird moves
  and Phenomena (player-facing: the extra Search for Clues questions and
  phenomenon types), and harm / armour / luck / recovery / levelling /
  end of session (player side only).
- `data.js` — all 28 playbooks' data (quotes, looks, ratings, moves, gear,
  history, improvements), shared by the Hunters page. 236 moves total:
  188 playbook moves + 48 Alternative Weird moves (8 each on the 6 magic
  playbooks).
- `app.js` — the Hunters sheet app. No build step, no server, no external
  dependencies. Save format unchanged: old saves still open (named
  hunters on their sheet, unnamed in setup).
- `style.css` — dark nautical styling, mobile-friendly, with a parchment
  character sheet and a print stylesheet (Print Sheet prints only the
  finished sheet, light background, no wasted ink).
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
`index.html`, `hunters.html`, `reference.html`, `data.js`,
`app.js`, `style.css`, `playbooks.pdf`, `README.md`. Pages is already enabled from
`main` / (root) at `https://nswa9002.github.io/hunters-of-the-shattered-coast/`.

NOTE: `keepers.html` was deleted from this local site. It still exists in
the GitHub repo — push-files cannot delete a file, so it must be deleted
from the repo separately (GitHub web UI or API delete), otherwise the old
Keeper's Korner page stays live.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from the two source playbook PDFs. An
unofficial fan conversion for private table use; keep the original rulebook
at the table for the full text of the game.
