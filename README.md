# Hunters of the Shattered Coast — GitHub Pages site

A static site for the *Hunters of the Shattered Coast* playbooks: a fantasy
reskin of the classic hunter playbooks in which veteran heroes (converted
from a D&D 5e level 13 campaign) hunt one Pirate Lord across the Shattered
Coast.

## Files

- `index.html` — the whole site: the hunt conversion, the level 13 conversion
  guide and veteran start, basic moves, the Pirate Lord sheet, all 12
  playbooks, and the ship and company sheet.
- `style.css` — dark nautical / parchment styling, mobile-friendly, with a
  print stylesheet.
- `playbooks.pdf` — the full 18-page playbook PDF, linked from the site.
- `README.md` — this file.

No build step, no JavaScript, no external dependencies except system fonts.
Open `index.html` in a browser to preview it locally.

## Publish on GitHub Pages

1. Create a new GitHub repository named `hunters-of-the-shattered-coast`.
2. Push these files to the root of the repository's `main` branch:
   `index.html`, `style.css`, `playbooks.pdf`, `README.md`.
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**,
   then branch **main** and folder **/(root)**.
5. Save. GitHub will publish the site at
   `https://<your-username>.github.io/<repo-name>/` within a minute or two.

To update the site later, edit the files, commit, and push to `main` — Pages
republishes automatically.

## Source

Content is condensed faithfully from `playbooks.pdf` (18 pages). An
unofficial fan conversion for private table use; keep the original rulebook
at the table for the full text of the game.
