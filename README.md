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
  and the moves picker (tick as many moves as you like — your own
  playbook's moves are free). There are no improvements in setup any
  more: improvements come from levelling up, one per level, as per the
  rulebook (see the sheet below). Press
  **Build my sheet**. **Player sheet second:** a wanted-poster
  character sheet — a big WANTED masthead, big hunter name, playbook
  banner and quote, photo if uploaded, ratings as stat boxes (with any +1 improvements
  applied), a clearer Standing section — harm, luck and experience each
  as its own labelled poster row with larger boxes, marked with
  rubber-stamp glyphs (a skull for harm, a star for experience and luck),
  and the Unstable line
  prominent under Harm (at 4+ harm you are unstable) — the luck track
  always shows 7 boxes: you have 5 luck, and two boxes are already marked,
  spent in past adventures, a Level Up button next to Experience (enabled at 5
  experience — it walks you through picking one improvement, step by
  step), your level, My Moves as
  readable cards (including any cross-playbook moves, marked with where
  they came from), gear and improvements taken.
  The Far-Traveller's Expatriation feature is a typeable box
  with a Hint button showing the options from the playbook. There is no History section any
  more, no Notes section, and no Seasoned start section (no scar, famed deed, old debt,
  signature treasure or powers carried over). Every hunter has 5 luck —
  two boxes already marked, spent in past adventures — and luck cannot
  be earned any more.
  **Edit setup** goes back to setup keeping everything; **Print
  Sheet** prints only the finished sheet; **Print Blank Sheet** prints
  the chosen playbook's sheet with everything empty — blank name, look,
  gear, unticked moves and empty trackers (including the full 7-box luck
  track, for handwriting), with ruled write-in lines —
  ready to fill in by hand, without changing the saved hunter. Setup
  and sheet are two views of the same hunter. The six magic playbooks
  (Battle-Mage, Witch, Touched, Cursed, Channeler, Fae-Blooded) also
  offer the 8 Alternative Weird moves as pickable moves.
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
  dependencies. Save format: hunters carry `photo` (data URL), `level` (1 for new
  hunters), `luckMax` (fixed at 5 for every hunter — the track shows 7
  boxes, two marked used from past adventures), `xMoveLevels`
  (cross-playbook moves taken through level-ups),
  `xMoves` (an array of cross-playbook picks, one per level), `allyCount`
  (allies gained through "Gain an ally"), `impRatings` (repeatable +1
  rating counts), and `expatriation` (the Far-Traveller's typed answer);
  gear is carried text, not indices. There is no points budget any more
  — improvements are earned one per level-up. Old saves migrate in place:
  gear indices become the same gear text, improvements pointing at removed
  list items are dropped, surviving +1 rating picks become `impRatings`
  counts, a bought "Gain an ally" becomes `allyCount` 1, cross-playbook
  picks become `xMoveLevels` (with a default pick filled in for any level
  bought but never chosen), own-move picks are dropped (moves are
  unlimited and free now — the hunter keeps every move they picked), old
  hunters are set to 5 luck (`luckUsed` clamped to 5) and keep whatever
  improvements they already bought, and `level` defaults to 1. Old scar /
  deed / debt / treasure / powers fields may linger in stored JSON; they
  are never rendered.
- `style.css` — dark nautical styling, mobile-friendly, with a wanted-poster
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
itself" section were removed 2026-11-16; the last two improvements of every playbook's
list were removed. Improvements are now earned by levelling up
(2026-11-17): fill 5 experience, tap Level Up on the sheet, pick one
improvement from your playbook's list — one per level, as per the
rulebook, no points budget. Ratings are repeatable up to the listed max;
"Gain an ally" adds one ally each time (Far-Traveller, Star-Crossed,
Seeker and Showmaster); the differently-worded ally items on the
Fae-Blooded, Vessel and Broadsheet stay one-off. Luck: every hunter
has 5 luck and the track always shows 7 boxes (two boxes already
marked, spent in past adventures); luck cannot be earned any more.
The Notes section was removed 2026-11-17 — hunters arrive fully
developed from D&D, so there is no background-info writing space.
Moves are unlimited: as many of your own playbook's moves as you like, free, and moves from other
playbooks come through level-ups. The dice tray was removed 2026-11-17.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from the two source playbook PDFs. An
unofficial fan-made game for private table use.
