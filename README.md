# TigerHacks website

The official site for **TigerHacks**, the student-run high-school coding competition at Greenwich Country Day School: <https://tiger-hacks.net>

It is a plain static site: HTML, one CSS file, one JavaScript file. There is no build step, framework, or package to install.

## Structure

```
index.html            Home: hero, about, format, schedule, photos, team, FAQ
problems/index.html   Prior questions (PDF links, previews, solutions)
results/index.html    2023–2025 standings (year tabs and search)
rules/index.html      Competition rules
register/index.html   Registration (embedded Google Form)
404.html              Not-found page
pset2023/24/25.pdf    Problem sets (kept at the old URLs)
assets/css/style.css  All styles
assets/js/main.js     All interactions (no dependencies)
assets/fonts/         Self-hosted Inter, Playfair Display, JetBrains Mono (SIL OFL)
assets/img/           Logo, social share image, optimized photos
CNAME                 tiger-hacks.net custom domain
sitemap.xml, robots.txt, site.webmanifest, .nojekyll
```

## Deploying

Every push to `main` publishes the site automatically through `.github/workflows/deploy.yml`. The workflow uploads the repository root as-is, with no build step. Edit the HTML/CSS/JS, commit, push, and the live site updates within a minute or two (watch the **Actions** tab).

The custom domain `tiger-hacks.net` is configured in **Settings → Pages** and stays in place. The `CNAME` file is kept as a backup in case Pages is ever switched to "Deploy from a branch".

After a big change, submit `https://tiger-hacks.net/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).

## Common updates

| Change | Where |
| --- | --- |
| **2026 date** | Search all pages for `TBD` / `To be announced`, plus the "When is TigerHacks 2026?" FAQ in `index.html` (two places: the visible answer and the FAQ JSON-LD in `<head>`). |
| **New registration form** | Search for `docs.google.com/forms` in `register/index.html` (iframe and "Open form in a new tab" button). |
| Team members | `team/index.html`, the "Led together" section in `index.html`, and the `Person` entries in every page's JSON-LD. |
| Team photos | `assets/img/team/mary-chickering.jpg`, `oliver-servedio.jpg`, `oliver-davis.jpg` (square, at least 1200×1200 is best). Keep these file names: they include each person's name, which helps the photos rank in Google Images. |
| New results year | Copy a `year-panel` section and its `tab` button in `results/index.html`. |
| New problem set | Add the PDF at the root and copy a `dossier` article in `problems/index.html`. |

When the 2026 date is set, consider adding a schema.org `Event` block to the JSON-LD on the home page. This can make the competition eligible for Google's event results.

## Accessibility and performance notes

- All content is in the HTML, so search engines and users without JavaScript see every page. JavaScript only adds animations and interactions.
- Animations respect the `prefers-reduced-motion` setting.
- Photos were resized from about 4 MB to about 2.5 MB in total, with smaller versions used for the grid.
