# HTML & CSS Lab

A browser-based course that teaches HTML and CSS through short lessons, a live
"Try it" editor, quizzes, and labs. Labs are checked automatically against the
DOM and computed styles.

## Run locally
Open `index.html` in a browser, or run a local server:

    python -m http.server 8000

Then visit http://localhost:8000.

## Deploy
1. Create the repo and push: `.\scripts\create-repo.ps1 -Owner <github-username>`
2. On GitHub: Settings > Pages > Source: **GitHub Actions**.
3. Each push to `main` redeploys the site via `.github/workflows/pages.yml`.

## Add a lesson
Add an object to `window.LESSONS` in `js/lessons.js` with `id`, `module`, `title`,
`summary`, `concepts` (HTML), `example`, `quiz`, and `lab` (`title`, `brief`,
`starter`, `tasks` where each task has `text` and `test(doc, win)`).

## Notes
- Learner code runs in a preview with scripts disabled, so it can't run JavaScript.
- Progress is stored in localStorage, per browser.
- The lab preview loads `https://placehold.co` for the image example. Replace it if that is blocked.
