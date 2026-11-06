# CLAUDE.md — working on this portfolio

Static Astro 7 + TypeScript site for **Syeda Maliha Tabassum**, deployed to GitHub Pages.
README.md has setup, editing and deployment instructions; CONTENT_TODO.md lists open content
questions.

## Commands

- `npm run dev` — live preview at http://localhost:4321/
- `npm run check` — type-check code and content schemas
- `npm run build` then `npm test` — build and test the output
- `npm run verify` — build for root AND `/portfolio-test/` base paths and test both (run before
  declaring work done)
- Requires Node ≥ 22.23.4 (Node 24 LTS). The owner's machine may still have an older Node.

## Factual-content safeguards (most important)

The CV (`Maliha_Updated_Resume___PHD.pdf`, private, git-ignored) and information the owner
gives directly are the **only** factual sources.

- **Never invent** metrics, results, impact, deployment claims, users, publication outcomes,
  acceptances, leadership roles, awards, endorsements or team sizes.
- **Never overstate her contribution.** She is 4th of 6 authors on the JCSSE paper. Don't
  write "led", "designed the architecture" etc. unless she says so.
- **Publication status is exact.** `under-review` means submitted, not accepted. A submission
  venue goes in `submittedTo`, never `venue`. Don't add DOIs, page numbers, citations or
  BibTeX to unpublished work — the schema in `src/content.config.ts` rejects this. Don't
  weaken those rules.
- **Under-review / in-progress summaries** stay within what the CV states. Don't add
  methods, datasets or numbers from elsewhere.
- **Don't invent profile URLs** (Scholar, ORCID…). Her confirmed GitHub is
  `SyedaMalihaTabassum19`. Repos under `Reshad-Ul-Karim` are a collaborator's; credit them with
  `hostedBy`, never present them as hers.
- **Author lists only for published work** (owner's decision). Don't add co-authors to
  under-review or in-progress entries.
- **Private data never ships:** no phone numbers, home address, referee names or contacts,
  signatures. `tests/privacy.test.mjs` enforces this. Only the redacted
  `public/cv/Syeda-Maliha-Tabassum-CV.pdf` may be published; regenerate it with
  `scripts/make-public-cv.py`, never by copying the original.
- **No visitor-facing placeholders** ("coming soon", "lorem", "TBD"). Missing info goes in
  CONTENT_TODO.md and the UI simply omits it.
- **Media only when real:** no stock photos, no fabricated screenshots or portraits. The code
  covers in `ProjectCover.astro` are deliberately abstract.
- When unsure whether something is supported by the source, leave it out and add a question to
  CONTENT_TODO.md.

## Conventions

- **Base path:** every internal link and `/public` asset goes through `withBase()` from
  `src/lib/url.ts`. Never hard-code `/…` hrefs. Page links end with `/`
  (`trailingSlash: 'always'`). Site URL/base live only in `site.config.mjs`.
- **Strictly one page:** everything lives on `src/pages/index.astro`, which stacks the
  components in `src/components/sections/` with anchors `#home #about #skills #research
  #projects #experience #education #contact` (ids must match `src/data/navigation.ts`). Do
  **not** add separate About/research/project pages. Extra detail goes in inline expanders:
  research rows (`#research-<id>`) and project panels (`#project-<id>`). Every former URL
  (`/about/`, `/research/<id>/`, `/projects/<id>/` …) is a `SectionRedirect` stub pointing at
  its anchor — keep them so published links keep working.
- **Expanders:** `button[data-expander-toggle][aria-controls]` + `.expander[data-expander] >
  .expander-inner`. Panels render open (readable without JS); `src/scripts/site.ts` collapses
  them, animates rows 0fr↔1fr, opens a panel from the URL hash, restores focus on close.
- **Visual language (v3):** dark-first, near-black/charcoal surfaces, orange `#FD6F00` accent,
  Lato + JetBrains Mono, centred `SectionHeading`s, 4px-radius buttons, small status labels.
  Orange fills carry `--on-accent` (near-black) text; orange *text* uses `--accent-text`. See
  REDESIGN_PLAN.md. Reuse tokens and patterns instead of inventing one-off styles.
- **Content first:** facts belong in `src/content/**` (Markdown) or `src/data/**`
  (JSON/TS), validated by `src/content.config.ts`. Vocabularies (statuses, topics,
  categories) are in `src/data/taxonomy.ts`.
- **Styling:** design tokens in `src/styles/global.css` use `light-dark()`. Add colours as
  tokens there and check WCAG AA contrast in both themes. Component styles are scoped
  `<style>` blocks.
- **JavaScript is progressive enhancement.** Everything must read and navigate with JS off.
  Controls that need JS render `hidden` and are revealed by script. Keep scripts small and
  dependency-free.
- **Motion:** opacity/transform only, everything inside
  `@media (prefers-reduced-motion: no-preference)`. No scroll hijacking, custom cursors or
  autoplay.
- **Accessibility:** semantic landmarks, one `<h1>` per page, visible focus, 44px touch
  targets, `aria-live` feedback via `src/scripts/announce.ts`, `rel="noopener noreferrer"` on
  `target="_blank"` links.
- **No new dependencies, analytics, trackers, third-party embeds that load before user
  action, forms or databases** without the owner's explicit request.
- Astro 7 specifics: Rust compiler rejects unclosed/invalid HTML nesting; `compressHTML: true`
  is set deliberately; content config is `src/content.config.ts` with `z` from `astro/zod`
  (Zod 4).
- **Windows/Git Bash:** prefix commands that set `BASE_PATH=/…` with `MSYS_NO_PATHCONV=1`.

## Don't

- Don't commit or publish the original CV, push to GitHub, or deploy unless asked.
- Don't delete content entries without being asked; set fields or `featured: false` instead.
