# Hunters of the Shattered Coast — GitHub Pages site

A player-facing static site for the *Hunters of the Shattered Coast*
playbooks: a fantasy game in which seasoned hunters hunt the
Twelve Pirate Lords across the Shattered Coast — a different lord each
voyage, and that week's lord is the voyage's monster. **28 playbooks**
in one grouped list — the original 12, plus 16 more from the
consolidated 2025 pack. The site is focused on the themed roles and
the character sheet: pick a playbook, build your hunter, print the
finished sheet — or print a blank one to fill in by hand. There is no
How to Play section and no Keeper content on this site.

## Pages

- `index.html` — **Hunters** (home): interactive character sheets for
  all 28 playbooks, in two stages. **Setup first:** pick a playbook
  (each button shows the playbook's name and its quote as the blurb),
  fill in name/pronouns, look (type it in, or upload a photo — shrunk
  client-side to ~480px and saved in the browser, printed on the
  sheet), a ratings line, seasoned-start fields (scar, famed deed, old
  debt, signature treasure, plus up to 3 powers carried over from a
  D&D life), gear from the D&D weapon conversion chart, and the moves
  picker (exactly 3 chosen moves). Improvements are point-based: 10
  points to spend at the seasoned start (+1 rating = 2, another move
  from your own playbook = 2, any other improvement = 2, an advanced
  improvement = 3, a move from a different playbook = 3). Press
  **Build my sheet**. **Player sheet second:** a stylised parchment
  character sheet — playbook banner and quote, big hunter name, photo
  if uploaded, ratings as stat boxes (with any +1 improvements
  applied), harm/luck/experience/unstable trackers, My Moves as
  readable cards (including any cross-playbook move, marked with where
  it came from), gear, a "Your Legend" section (scar, famed deed, old
  debt, signature treasure), powers carried over, improvements taken
  with their point costs, and notes. There is no History section any
  more. **Edit setup** goes back to setup keeping everything; **Print
  Sheet** prints only the finished sheet; **Print Blank Sheet** prints
  the chosen playbook's sheet with everything empty — blank name, look,
  gear, unticked moves and empty trackers, with ruled write-in lines —
  ready to fill in by hand, without changing the saved hunter. Setup
  and sheet are two views of the same hunter. The six magic playbooks
  (Battle-Mage, Witch, Touched, Cursed, Channeler, Fae-Blooded) also
  offer the 8 Alternative Weird moves as pickable moves. A **Dice
  tray** sits below the sheet: tap a rating to roll 2d6 + that rating
  (taken from the hunter's chosen ratings line, with +1 improvements
  applied), with a situational +1/−1 adjuster for forward/ongoing, the
  12+/10+/7–9/miss bands, and a short roll log. Rolls are not saved;
  the tray never prints.
- `hunters.html` — a redirect to `index.html`, kept so old links to
  the Hunters page do not 404. (The Hunters page used to live here;
  it is now the home page.)
- `reference.html` — **Moves Reference**: the player-facing condensed
  reference sheets — Hunter Agenda, all 8 basic moves in full (10+ /
  7-9 / 12+ and the Work Sorcery glitch list), the Alternative Weird moves
  and Phenomena (player-facing: the extra Search for Clues questions and
  phenomenon types), and harm / armour / luck / recovery / levelling /
  end of session (player side only).
- `data.js` — all 28 playbooks' data (quotes, looks, ratings, moves, gear,
  history, improvements), shared by the Hunters page. 236 moves total:
  188 playbook moves + 48 Alternative Weird moves (8 each on the 6 magic
  playbooks). Unchanged by the seasoned-start rework — the look lists,
  gear lists and history text are still in the data, but the setup no
  longer shows the look helper lists, the gear checkboxes or history.
- `app.js` — the Hunters sheet app. No build step, no server, no external
  dependencies. Save format: hunters now carry `powers` (up to 3
  name/effect pairs), `photo` (data URL), `xMove` (a move from another
  playbook) and `xMoveExtra`; gear is carried text, not indices. Old
  saves migrate in place: gear indices become the same gear text,
  powers/photo/xMove default empty, improvements keep their indices
  (their point costs are computed from the same list), and a save with
  more than 3 chosen moves shows a warning and blocks Build until it
  is trimmed to 3.
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
Print Sheet, Print Blank Sheet. Saving is per-browser and does not sync
between devices — export to move a hunter. Print Blank Sheet never writes
to localStorage: it renders a blank sheet in memory, prints it, and puts
the saved hunter's sheet straight back.

## Publish on GitHub Pages

Push these files to the root of the repository's `main` branch:
`index.html`, `hunters.html`, `reference.html`, `data.js`,
`app.js`, `style.css`, `playbooks.pdf`, `README.md`. Pages is already enabled from
`main` / (root) at `https://nswa9002.github.io/hunters-of-the-shattered-coast/`.

NOTE: `keepers.html` was deleted from this local site and from the
GitHub repo (commit 6515afb), so the old Keeper's Korner page is gone.
The How to Play page was removed 2026-11-16 (the beginner guide, voyage
flow, Twelve Lords section, ship section and seasoned-hero appendix are
gone); the Hunters page moved to `index.html` and `hunters.html` is now
a redirect to it.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from the two source playbook PDFs. An
unofficial fan-made game for private table use.
