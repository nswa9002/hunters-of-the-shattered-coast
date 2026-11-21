# Hunters of the Shattered Coast — GitHub Pages site

A player-facing static site for the *Hunters of the Shattered Coast*
playbooks: a fantasy game in which hunters hunt the
Twelve Pirate Lords across the Shattered Coast — a different lord each
voyage, and that week's lord is the voyage's quarry. **28 playbooks**
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
  sheet), a ratings line, and the moves picker (stamp as many moves as you like with a star
  stamp — your own playbook's moves are free; there are no native
  checkboxes anywhere on the site). There are no improvements in setup any
  more: improvements come from levelling up, one per level, as per the
  rulebook (see the sheet below). Press
  **Build my sheet**. **Player sheet second:** a wanted-poster
  character sheet — a big WANTED masthead, big hunter name, playbook
  banner and quote, photo if uploaded, ratings as stat boxes (with any +1 improvements
  applied), a clearer Standing section — harm, luck and experience each
  as its own labelled poster row with larger boxes, marked with
  real SVG stamp images, never characters or checkboxes: a filled mark
  is an icon in a double-rule stamp ring (a skull for harm, a star for
  experience and luck), an empty slot is a stamp frame holding only a
  faint ghost of its icon, and the Unstable line
  is a stamp button under Harm whose text reflects the hunter's current
  state — "Stable — you are steady for now. At 4+ harm you become
  unstable." with an empty stamp slot, or "Unstable — you are unstable;
  your wounds will get worse unless treated." with the filled skull
  stamp. The line switches to Unstable on its own when a harm increase
  lands at 4+ harm; tapping it by hand marks the hunter stable again
  (after treatment), and it stays stable until more harm is taken. Harm is
  one non-wrapping line of 7 boxes with a drawn red divider after the
  3rd box — a vertical line with a small skull and an "Unstable" label —
  and boxes 4-7 tinted as the danger zone; the line and the zone deepen
  when harm reaches 4, so it is obvious the hunter is in the danger zone.
  The luck track
  always shows 7 boxes on one line: you have 5 luck, and two boxes are already marked,
  spent in past adventures, a Level Up button next to Experience (enabled at 5
  experience — it walks you through picking one improvement, step by
  step), your level, My Moves as
  readable cards (including any cross-playbook moves, marked with where
  they came from), and improvements taken. The Level Up wizard always
  offers "Take a new move from your own playbook", even for the
  original 12 playbooks whose improvements lists no longer name one.
  Every playbook's improvements list also names **"Perfect a move"**:
  pick it at a level-up and then choose one of the 8 basic moves to
  perfect — perfecting unlocks that move's 12+ version: a 12+ on a
  perfected move gives you its 12+ result, while a 12+ on a move you
  haven't perfected counts as a 10+. Only the 8 basic moves have 12+ versions,
  so only they can be perfected, each one only once; the option stays
  available on later level-ups until all 8 are perfected. Perfected
  moves show on the sheet under My Moves, in a "Perfected moves"
  section — a blank sheet shows nothing there.
  The playbook's default (fixed) moves always show in My Moves, tagged
  "Default" — old saves get any missing defaults backfilled on load,
  and the setup moves picker always shows them stamped and untickable.
  There is no History section any more, no Notes section, and no Seasoned start section (no scar, famed deed, old debt,
  signature treasure or powers carried over). There is no gear section
  and no playbook background/features section either — hunters arrive
  fully developed from D&D, with their background and their D&D items
  already, so the sheet carries neither. The Far-Traveller's
  Expatriation typeable box went with the background sections. Every hunter has 5 luck —
  two boxes already marked, spent in past adventures — and luck cannot
  be earned any more.
  **Edit setup** goes back to setup keeping everything; **Print
  Sheet** prints only the finished sheet; **Print Blank Sheet** prints
  the chosen playbook's sheet with everything empty — blank name, look,
  unticked moves and empty trackers (including the full 7-box luck
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
  7-9 / 12+ and the Do Magic glitch list),
  laid out as easy-to-read tables — one compact table per move, with a
  row for each result band (10+ / 7–9 / Miss / 12+), plus the Do Magic
  effects and glitches as tables — and harm / armour / luck /
  recovery / levelling / end of session (player side only).
- `data.js` — all 28 playbooks' data (quotes, looks, ratings, moves, gear,
  history, improvements), shared by the Hunters page. 236 moves total:
  188 playbook moves + 48 Alternative Weird moves (8 each on the 6 magic
  playbooks). The last two improvements of every playbook's list were
  removed — the look lists, gear lists and history text are still in the
  data, but the setup no longer shows the look helper lists, and the
  sheet shows no gear and no playbook background features. Move, gear,
  look and feature wording was audited 2026-11-18 against each move's
  title and the pirate-lord, ship-and-sea setting: "monster" wording and
  modern leftovers (guns, vehicles, film-crew jobs, recording gear and
  the like) were reworded to ship/sea terms with mechanics unchanged. A
  few original move titles still carry their old flavour (they are not
  renamed), the Far-Traveller's alien gear stays strange by design, and
  one move still says "cursed phenomena" — Jeremy has not said whether
  that word goes from it too. Moves were also audited 2026-11-19 so the
  group's persuasion never targets another hunter: Persuade Someone
  (the basic move) has no "another hunter" result clauses — it only
  ever works on other humans (port folk and other NPCs) — and 15 other
  moves were reworded so their effects target other people or benefit
  only the hunter themself. Seven moves whose whole effect was on
  another hunter (Lend Aid, Often Right, No One Listens to Zathras,
  Collaborative Effort, The Power of Love, Taste of Home, Tactical
  Advice) were removed and then restored again the same day at Jeremy's
  word, with their original texts — no migration remap is needed, since
  the removal never went live.
- `app.js` — the Hunters sheet app. No build step, no server, no external
  dependencies. Save format: hunters carry `photo` (data URL), `level` (1 for new
  hunters), `luckMax` (fixed at 5 for every hunter — the track shows 7
  boxes, two marked used from past adventures), `xMoveLevels`
  (cross-playbook moves taken through level-ups),
  `xMoves` (an array of cross-playbook picks, one per level), `allyCount`
  (allies gained through "Gain an ally"), `perfected` (an array of the
  basic moves the hunter has perfected, at most one entry per move),
  `impRatings` (repeatable +1 rating counts). Old `gear` and `expatriation` values may linger in
  stored JSON; they are never rendered — the gear section and the
  playbook background/features sections (including the Far-Traveller's
  Expatriation box) were removed 2026-11-17, because hunters arrive
  with their D&D background and items. There is no points budget any more
  — improvements are earned one per level-up. Old saves migrate in place:
  gear indices become the same gear text, improvements pointing at removed
  list items are dropped, surviving +1 rating picks become `impRatings`
  counts, a bought "Gain an ally" becomes `allyCount` 1, cross-playbook
  picks become `xMoveLevels` (with a default pick filled in for any level
  bought but never chosen), own-move picks are dropped (moves are
  unlimited and free now — the hunter keeps every move they picked), old
  hunters are set to 5 luck (`luckUsed` clamped to 5) and keep whatever
  improvements they already bought, and `level` defaults to 1. Default
  (fixed) moves missing from an old save are backfilled into `moves`.
  Old scar /
  deed / debt / treasure / powers fields may linger in stored JSON; they
  are never rendered.
- `style.css` — dark nautical styling, mobile-friendly, with a wanted-poster
  character sheet and a print stylesheet (Print Sheet prints only the
  finished sheet, light background, no wasted ink).
- `master-playbook.pdf` — the site's download (76 pages): the **Everyone
  Playbook** (the 8 basic moves everyone has) then all 28 playbooks,
  original 12 first then the 16 new, every move as a wanted-poster card.
  `playbooks.pdf` (the old 18-page PDF for the first 12 playbooks only)
  is still in the repo but no longer linked from the site.

  **2026-11-19 changes:** the four basic moves were renamed to **Act
  Under Pressure**, **Investigate**, **Read a Bad Situation** and **Do
  Magic** — renamed everywhere (reference tables, move texts, setup
  note). The Alternative Weird section was removed
  from the Moves Reference page; the 8 Alternative Weird moves still
  live in their home playbooks (the 6 magic playbooks) and in the setup
  moves picker. A full PDF of all 28 playbooks, **The Playbook**
  (`the-playbook.pdf`, original 12 first then the 16 new), was built
  2026-11-19 from the current data; it is not linked from the site.
  On 2026-11-20 the site's download was swapped to the **Master
  Playbook** (`master-playbook.pdf`, 76 pages — Everyone Playbook first,
  then all 28 playbooks, every move as a poster card); the old
  `playbooks.pdf` stays in the repo unlinked. Also 2026-11-19: the Fight and Guard
  Another 10+ results no longer say "As 7–9" — they just say you choose
  the extra effect — and the intro paragraph under the "Moves Reference"
  heading was removed (the "How to read a move" paragraph stays). Also
  2026-11-19: starting moves are capped at 3 per playbook, as in Monster
  of the Week (all 8 basic moves plus 3 playbook moves); fixed/Default
  moves count toward the 3, the picker shows a counter, and the
  Alternative Weird choice does not count. Old saves with more than 3
  moves keep them. Level-ups can still add moves beyond the starting 3.
  Also 2026-11-20: a new improvement, **"Perfect a move"**, was added
  to all 28 playbooks' improvements lists (the original 12 now list 5
  improvements each). Perfecting a move unlocks its 12+ version — a 12+
  on a perfected move gives you its 12+ result, and a 12+ on a move you
  haven't perfected counts as a 10+; only the 8 basic moves can be
  perfected, each one only once. Old
  saves migrate with an empty perfected list and keep everything else.

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
`app.js`, `style.css`, `master-playbook.pdf`, `README.md`. Pages is already enabled from
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
The same day, the playbook background/features sections (including
the Far-Traveller's Expatriation typeable box and Hint button) and the
whole gear system (the setup's D&D weapon conversion chart, carried
gear and "Other gear", and the Gear section on the sheet) were
removed — the characters already have their background and their D&D
items.
Moves are unlimited: as many of your own playbook's moves as you like, free, and moves from other
playbooks come through level-ups. The dice tray was removed 2026-11-17.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from the two source playbook PDFs. An
unofficial fan-made game for private table use.
