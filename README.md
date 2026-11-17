# Hunters of the Shattered Coast — GitHub Pages site

A player-facing static site for the *Hunters of the Shattered Coast*
playbooks: a fantasy game in which hunters hunt the
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
  sheet), a ratings line, gear from the D&D weapon conversion chart,
  and the moves picker (exactly 3 chosen moves). Improvements are
  point-based: 15 points to spend (+1 to a rating = 1 point, and a
  rating can be raised more than once up to its listed max; another move
  from your own playbook = 2, any other improvement = 2, an advanced
  improvement = 3, a move from a different playbook = 3). Every
  playbook offers both move options — its own list may already have
  one, otherwise a universal option is shown. Press
  **Build my sheet**. **Player sheet second:** a stylised parchment
  character sheet — playbook banner and quote, big hunter name, photo
  if uploaded, ratings as stat boxes (with any +1 improvements
  applied), harm/luck/experience/unstable trackers, My Moves as
  readable cards (including any cross-playbook move, marked with where
  it came from), gear, improvements taken
  with their point costs, and notes. There is no History section any
  more, and no Seasoned start section (no scar, famed deed, old debt,
  signature treasure or powers carried over). Hunters start with all
  7 luck. **Edit setup** goes back to setup keeping everything; **Print
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
  playbooks). The last two improvements of every playbook's list were
  removed — the look lists, gear lists and history text are still in the
  data, but the setup no longer shows the look helper lists, the gear
  checkboxes or history.
- `app.js` — the Hunters sheet app. No build step, no server, no external
  dependencies. Save format: hunters carry `photo` (data URL), `xMove`
  (a move from another playbook), `xMoveExtra`, `ownMoveExtra`, and
  `impRatings` (repeatable +1 rating counts); gear is carried text, not
  indices. Old saves migrate in place: gear indices become the same gear
  text, improvements pointing at removed list items are dropped,
  surviving +1 rating picks become `impRatings` counts, a cross-playbook
  move is dropped if the improvement that bought it is gone, and a save
  with more than 3 chosen moves shows a warning and blocks Build until
  it is trimmed to 3. Old scar / deed / debt / treasure / powers fields
  may linger in stored JSON; they are never rendered.
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
a redirect to it. The Seasoned start section (scar, famed deed, old
debt, signature treasure, powers carried over) and the "Your sheet keeps
itself" section were removed 2026-11-16; improvements are now a
15-point budget with +1 ratings at 1 point each, repeatable up to the
listed max, and the last two improvements of every playbook's list
were removed.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from the two source playbook PDFs. An
unofficial fan-made game for private table use.
