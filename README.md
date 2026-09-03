# renatoquiliche.github.io

Personal data science portfolio. Plain static HTML/CSS/JS — no build step, no
framework, no dependencies to install. Hosted free on GitHub Pages.

```
index.html                  the whole site (one page, anchored sections)
assets/css/style.css        all styling, incl. light/dark theme tokens
assets/js/main.js           theme toggle, project filter, footer year
assets/files/…-cv.pdf       the CV linked from the "Download CV" button
.nojekyll                   tells GitHub Pages to serve files as-is
```

---

## 1. Publish it (one time, ~5 minutes)

The repository **must** be named `renatoquiliche.github.io` — exactly your GitHub
username followed by `.github.io`. That name is what makes GitHub serve it at the
root domain `https://renatoquiliche.github.io` instead of a subfolder.

### Create the empty repo on GitHub

1. Go to <https://github.com/new>
2. **Repository name:** `renatoquiliche.github.io`
3. **Public** (GitHub Pages needs public on the free plan)
4. Do **not** add a README, .gitignore or licence — the folder already has files
5. Click **Create repository**

### Push this folder

Open a terminal in this folder and run:

```bash
git init -b main
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/renatoquiliche/renatoquiliche.github.io.git
git push -u origin main
```

If Git asks for a password, use a **personal access token**, not your account
password: GitHub → Settings → Developer settings → Personal access tokens →
Tokens (classic) → Generate new token → tick the `repo` scope.

### Turn Pages on

1. On the repo page: **Settings** → **Pages** (left sidebar)
2. **Source:** `Deploy from a branch`
3. **Branch:** `main`, folder `/ (root)` → **Save**

Wait 1–2 minutes, then open <https://renatoquiliche.github.io>. The first build is
the slow one; later pushes appear in about 30 seconds. Build status is visible under
the repo's **Actions** tab.

---

## 2. Editing it later

Every change is: edit the file → commit → push. The live site follows.

```bash
git add .
git commit -m "Add project X"
git push
```

### Add a project

Copy one `<article class="card">` block in `index.html` and edit it. The
`data-tags` attribute drives the filter buttons — use any of `ml`, `bigdata`,
`genai`, `policy` (space-separated, a card can have several):

```html
<article class="card" data-tags="ml bigdata">
  <div class="card-head">
    <h3>Project title</h3>
    <span class="year">2026</span>
  </div>
  <p class="card-sub">One-line subtitle</p>
  <p>Two or three sentences: the problem, what you built, the result.</p>
  <ul class="metrics">
    <li><b>0.81</b><span>AUC</span></li>
  </ul>
  <ul class="tags"><li>PySpark</li><li>Databricks</li></ul>
  <p class="card-links">
    <a href="https://github.com/renatoquiliche/REPO">Code&nbsp;↗</a>
  </p>
</article>
```

The `metrics` block is optional — drop it when there is no headline number.
Add a new filter by adding a `<button class="chip" data-filter="newtag">` in the
`.filters` div; the JavaScript picks it up automatically.

### Update the CV

Replace `assets/files/renato-quiliche-cv.pdf` with a newer export, keeping the same
filename, and the download button keeps working.

### Preview before pushing

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Open the file directly with `file://` and the
CSS/JS will not load — always use the local server.

---

## 3. Optional: a custom domain

If you buy e.g. `renatoquiliche.com`:

1. Create a file named `CNAME` in this folder containing only `renatoquiliche.com`
2. At your DNS registrar add four `A` records for `@` pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
   and a `CNAME` record for `www` pointing to `renatoquiliche.github.io`
3. Repo → Settings → Pages → Custom domain → enter it → tick **Enforce HTTPS**

---

## Notes

- `.nojekyll` matters: without it GitHub runs Jekyll, which ignores any folder
  starting with an underscore. Keep the file even though it is empty.
- The site has no analytics and sets no cookies. `localStorage` is used only to
  remember the light/dark choice, in the visitor's own browser.
- Fonts load from Google Fonts; everything else is served from this repo.
