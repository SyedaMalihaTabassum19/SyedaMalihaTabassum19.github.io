# Syeda Maliha Tabassum — Portfolio

Academic and professional portfolio site. Static [Astro](https://astro.build) + TypeScript,
hosted on GitHub Pages. No server, database, tracking or API keys.

- **Pages:** Home, About, Research & Publications (+ a page per entry), Projects (+ a case
  study per project), Experience, Education & Recognition, Skills, Contact, 404. A Writing
  section appears automatically once you add a post.
- **Features:** light/dark theme (follows the system, remembers your choice), publication
  status/topic filters and search, copy citation / BibTeX / email, click-to-load video demos,
  image gallery with lightbox (when images exist), redacted public CV download.

---

## 1. Run it on your computer

### Requirements

- **Node.js 22.23.4 or newer — Node 24 LTS recommended.** Check with `node --version`.
  This computer currently has **Node 22.14.0, which is too old** for the current Astro release.
  Install the "LTS" version from <https://nodejs.org/>, then open a new terminal.

### Commands

Run these in the project folder (`G:\My portfolio`):

| Command           | What it does                                                              |
| ----------------- | ------------------------------------------------------------------------- |
| `npm install`     | Install dependencies (first time, or after changing `package.json`).      |
| `npm run dev`     | Start the live preview at <http://localhost:4321/> — updates as you edit. |
| `npm run build`   | Build the production site into `dist/`.                                   |
| `npm run preview` | Serve the built `dist/` at <http://localhost:4321/> to check it.          |
| `npm run check`   | Type-check all code and content.                                          |
| `npm test`        | Test the last build (links, base path, privacy, publication status).      |
| `npm run verify`  | Build for **both** GitHub Pages URL shapes and run all tests on each.     |

Stop a running server with `Ctrl + C`.

> Astro's command-line tool sends anonymous usage statistics by default. To turn that off on
> your machine, run `npx astro telemetry disable` once. (The deployed website itself contains
> no analytics or trackers.)

---

## 2. Edit the content

All facts live in content files — you never need to touch the page code to update them.
Every file is validated when you run `npm run dev`/`build`; a missing or misspelt field stops
the build with a message naming the file.

| To change…                                   | Edit                                                                                     |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Name, headline, intro, email, profile links  | `src/data/profile.ts`                                                                    |
| A publication / manuscript / ongoing project | `src/content/research/<id>.md`                                                           |
| A project case study                         | `src/content/projects/<id>.md`                                                           |
| Jobs, research and teaching roles            | `src/data/experience.json`                                                               |
| Degrees and results                          | `src/data/education.json`                                                                |
| Awards and competitions                      | `src/data/awards.json`                                                                   |
| Skills and where they were used              | `src/data/skills.json`                                                                   |
| Topic, category and status names             | `src/data/taxonomy.ts`                                                                   |
| Navigation                                   | `src/data/navigation.ts`                                                                 |
| About page text                              | `src/pages/about.astro`                                                                  |
| Colours, fonts, spacing                      | `src/styles/global.css` (colours), `astro.config.mjs` (fonts)                             |

The file name becomes the page address: `src/content/research/camdet.md` →
`/research/camdet/`.

### Add a research entry

Create `src/content/research/my-paper.md`:

```markdown
---
title: Full Paper Title
shortTitle: Shorter title for lists and links   # optional
status: under-review          # published | accepted | under-review | in-progress
type: journal-article         # conference-paper | journal-article | systematic-review | research-project
topics: [reliable-ai, health] # ids from src/data/taxonomy.ts
summary: One or two sentences describing the work.
submittedTo: Journal Name     # under-review only — this is NOT an acceptance
featured: false               # true = may appear on the home page
order: 5                      # position within its status group
---

Optional longer description in Markdown (shown on the entry's own page).
```

The build **refuses** inconsistent status data — for example a DOI on unpublished work, a
`venue` on an under-review manuscript, or BibTeX without a full published record. When a
paper is published, change `status: published` and add `venue`, `venueShort`, `year`,
`authors` (complete, in order), `publisher`, `pages`, `doi`, `citation` and, optionally,
`bibtex`. See `src/content/research/gesture-virtual-keyboard-mouse.md` as the model.

### Add a project, screenshots, diagrams or a video

Copy an existing file in `src/content/projects/`. Media is optional and only shown when it
exists:

1. Put images in `src/assets/projects/<project-id>/` (PNG/JPG/WebP — Astro optimises them).
2. Reference them in the project's front matter:

```yaml
media:
  - type: image
    src: ../../assets/projects/aruco-service-bot/robot.jpg
    alt: The service bot driving over gravel toward an ArUco marker
    caption: Field test on mixed terrain        # optional
  - type: youtube
    videoId: WJUcASlT_to                         # the part after watch?v=
    title: Service bot demo
    hostedBy: Reshad Ul Karim                    # if it's on someone else's channel
```

Images get a gallery with an accessible lightbox. YouTube videos use a privacy-friendly player
that loads nothing from YouTube until the visitor presses Play.

Credit collaborators in `credits:` and mark links on someone else's account with `hostedBy:`.

### Add a photo of yourself

1. Save it as `src/assets/portrait.jpg` (portrait orientation, at least 800px wide).
2. In `src/data/profile.ts`, add `import portraitImage from '../assets/portrait.jpg';` at the
   top and set `portrait: { src: portraitImage, alt: 'Syeda Maliha Tabassum' }`.

Until then the About page shows the abstract monogram mark.

### Add GitHub, Google Scholar or ORCID

Add an entry to `links` in `src/data/profile.ts`:

```ts
{ label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=…', handle: 'Google Scholar', icon: 'scholar' },
```

Icons available: `linkedin`, `github`, `scholar`, `orcid`, `mail`, `link`. Links appear in the
footer, About, Contact and the contact band automatically.

### Update the CV

The public CV is `public/cv/Syeda-Maliha-Tabassum-CV.pdf` — a **redacted** copy without your
phone number or referees. Never put the original CV in `public/`. To regenerate it from a new
CV (needs Python with `pip install pymupdf`):

```bash
python scripts/make-public-cv.py "Maliha_Updated_Resume___PHD.pdf" public/cv/Syeda-Maliha-Tabassum-CV.pdf
```

The script removes phone-number lines and the whole REFERENCES section, then verifies the
result and stops with an error if anything private remains. Open the PDF to check it looks
right. To hide all CV buttons instead, set `cv: null` in `src/data/profile.ts`.

### Write articles (optional)

Add Markdown files to `src/content/writing/`:

```markdown
---
title: What calibration tells you that accuracy doesn't
description: One-sentence summary for the list and search engines.
published: 2026-11-01
tags: [calibration]
draft: false
---

Your article…
```

The `/writing/` page and the "Writing" navigation link appear automatically once at least
one non-draft post exists. With no posts, no Writing pages are built. (You'll see one harmless
build warning, "No files found … writing", until then.)

### Social sharing image

`public/og/default.png` is the preview image shown when the site is shared. It's generated
from `scripts/social-card.html` — instructions are at the top of that file.

---

## 3. Deploy to GitHub Pages

You'll need a free GitHub account. Below, replace **`<username>`** with your GitHub username
and **`<repository>`** with the repository name you choose. Nothing here has been published
yet.

### Choose your address

| Repository name          | Site address                                 |
| ------------------------ | -------------------------------------------- |
| `<username>.github.io`   | `https://<username>.github.io/` (recommended) |
| anything else, e.g. `portfolio` | `https://<username>.github.io/portfolio/` |

**You don't need to change any configuration for either option.** The deploy workflow asks
GitHub for the real address and base path at build time and passes them in
(`SITE_URL`/`BASE_PATH`). These feed `site.config.mjs`, the single place they are defined.
Every link, asset, the CV download, canonical URL and sitemap use them.

### Step by step

1. **Create the repository.** On github.com click **+ → New repository**. Name it
   `<username>.github.io` (or e.g. `portfolio`). Choose **Public** (GitHub Pages on a free plan
   needs a public repository). Don't add a README or .gitignore — this project has them.
2. **Commit and push the source.** In a terminal in this folder:

   ```bash
   git init
   git add .
   git status            # check: Maliha_Updated_Resume___PHD.pdf must NOT be listed
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<username>/<repository>.git
   git push -u origin main
   ```

   The private original CV is excluded by `.gitignore`; `git status` lets you confirm it.
   (GitHub Desktop also works: *Add local repository* → this folder → *Publish repository*.)
3. **Turn on Pages.** In the repository: **Settings → Pages → Build and deployment →
   Source: GitHub Actions**.
4. **Watch the deployment.** Open the **Actions** tab. The *Deploy to GitHub Pages* workflow
   runs on every push to `main` (re-run it from the Actions tab with **Run workflow** if it
   started before step 3). It type-checks, builds, runs the tests, then deploys. A green tick
   means it's live.
5. **Find your URL.** Click the finished run → the **deploy** job shows the link, as does
   **Settings → Pages** ("Your site is live at …").

### Updating the site later

Edit content, check it with `npm run dev`, then:

```bash
git add .
git commit -m "Add new publication"
git push
```

Every push to `main` rebuilds and redeploys automatically (about 1–2 minutes).

### Troubleshooting

| Symptom | Likely cause and fix |
| --- | --- |
| Site shows the README or a blank page | Settings → Pages → Source must be **GitHub Actions**, not "Deploy from a branch". |
| Page loads without styling, images or fonts (project site) | An asset path is missing the base path. Always build links with `withBase()` from `src/lib/url.ts`. `npm run verify` catches this. |
| 404 on a page that should exist | Internal links must end with `/` (e.g. `research/camdet/`). Check the content file name matches the link. |
| Workflow fails at "Install dependencies" | Commit `package-lock.json` along with `package.json`. |
| Workflow fails at "Build" with a content error | The message names the file and field — fix the front matter or JSON there. |
| Workflow fails at "deploy" with a permissions error | Settings → Pages source must be GitHub Actions; for organisation repos, Pages must be allowed in the organisation settings. |
| Old version still showing | Wait a minute and hard-refresh (`Ctrl + F5`); check the latest Actions run succeeded. |

**Custom domain later?** Add it in Settings → Pages → Custom domain. The workflow picks up
the new address automatically on the next deploy.

### Testing a project-site build locally (Windows note)

`npm run verify` already builds and tests the `/<repository>/` shape for you. If you set
`BASE_PATH` by hand in **Git Bash**, prefix the command with `MSYS_NO_PATHCONV=1`. Otherwise
Git Bash rewrites `/portfolio` into a Windows path. PowerShell is unaffected:
`$env:BASE_PATH='/portfolio'; npm run build`.

---

## 4. How it's organised

```
.github/workflows/deploy.yml  GitHub Pages build + deploy
site.config.mjs               Site URL and base path (one place)
astro.config.mjs              Astro settings, fonts, sitemap
public/                       Files copied as-is: CV, favicon, social image
scripts/                      CV redaction, social card template, verify script
src/content/                  Research, projects, writing (Markdown)
src/data/                     Profile, experience, education, awards, skills, vocabularies
src/content.config.ts         Schemas that validate all content
src/components/               Reusable UI pieces
src/layouts/BaseLayout.astro  <head>, header, footer, theme script
src/pages/                    One file per route
src/scripts/                  Small client-side scripts (theme, menu, filters)
src/styles/global.css         Design tokens and shared styles
tests/                        Build-output tests (node:test, no extra dependencies)
CONTENT_TODO.md               Missing information and editorial decisions to review
CLAUDE.md                     Conventions for editing this project with Claude Code
```
