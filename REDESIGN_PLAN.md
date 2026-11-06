# Redesign plan — v3 "dark / orange single page"

Reference: Figma Community file *Personal website | Portfolio (Community)*
<https://www.figma.com/community/file/1351551318943737601/personal-website-portfolio>

## 1. Reference observations and access limits

**Access.** No Figma tools are available in this environment, and the file was not opened
in Figma. The source examined was the owner-supplied screen recording
`Recording 2026-10-29 061445.mp4` (30.8 s, 1524×900): a scroll-through of the Figma
prototype frames. Colours below were sampled from that recording, which is
compressed, so they are close approximations, not exact Figma values. Fonts, spacing
and radii are estimated from the frames. No animation settings were visible or verifiable;
every motion spec here is my own proposal.

**Observed in the recording**

| Area | Observation |
| --- | --- |
| Page | Near-black background (sampled `#111111`); charcoal surfaces (`#181A1A`). |
| Type | **Lato** (double-storey *a* and *g* match). Bold white section titles, centred, with a grey subtitle beneath. |
| Navigation | Gradient orange→red "LOGO" wordmark left; centred text links (active link orange); compact filled orange "Hire Me" button right. |
| Hero | Two columns. Left: "Hi I am" (grey) → name (grey, bold, ~28px) → very large orange role title with a dark-to-bright orange gradient → four small circular outlined social icons → filled orange "Hire Me" + outlined grey "Download CV" (small 4px radius) → charcoal stats panel with three columns separated by thin vertical rules, orange numbers, white labels. Right: large grayscale portrait over a big charcoal circle. |
| Services | Centred heading + subtitle; 3×2 grid of charcoal cards, each with an orange line icon, orange title and grey text. |
| About | Centred heading + subtitle; portrait on a charcoal arch (rounded-top rectangle) left, justified grey paragraph right, filled orange "Download CV" with icon. Skills shown as circular orange progress rings with percentages. |
| Portfolio | Centred heading; small rectangular filter chips (active filled orange, others charcoal); 3-column grid of image cards with a "Name Project / Categories" caption bar. |
| Contact | Centred heading + subtitle; two-column dark form (name, email, phone, service, timeline, details) and outlined "Send" button. |
| Not visible | Footer, mobile layouts, hover states, animation timing. |

**Deliberately not adopted:** skill percentage rings (invented proficiency numbers),
"years of experience" and "happy clients" stats, the contact form (no delivery service is
configured), and stock portraiture.

## 2. Design tokens (implemented in `src/styles/global.css`)

| Token | Dark (default) | Light | Notes |
| --- | --- | --- | --- |
| `--bg` | `#101010` | `#F7F4EF` | page |
| `--bg-alt` | `#151515` | `#EFEBE4` | alternate sections |
| `--surface` | `#1D1D1D` | `#FFFFFF` | cards, panels |
| `--border` | `#303030` | `#DDD6CB` | decorative rules |
| `--border-strong` | `#5E5E5E` | `#8C8479` | form controls (≥3:1) |
| `--text` | `#F5F5F5` | `#1A1A1A` | 17.5:1 / 15.9:1 |
| `--text-2` | `#B3B3B3` | `#4D4D4D` | ≥7:1 |
| `--muted` | `#8F8F8F` | `#646464` | ≥4.5:1 on every surface |
| `--accent` | `#FD6F00` | `#FD6F00` | fills, markers, focus |
| `--accent-hover` | `#E76000` | `#E76000` | |
| `--accent-text` | `#FD6F00` | `#A84400` | orange *text*: 6.5:1 dark, 5.1:1 light |
| `--on-accent` | `#111111` | `#111111` | text on orange: 6.7:1 (white would be 2.8:1) |

Type: **Lato** 400/700/900 for everything, plus **JetBrains Mono** 500 for small metadata
(dates, status labels). Display sizes use `clamp()`. Spacing uses an 8px scale
(8, 16, 24, 32, 48, 64, 96, 128). Radii are 4px for controls and 8–12px for cards. Content
width is max 1200px, with 56px desktop gutters and 20px mobile gutters.

## 3. Section-by-section layout

One page, stable anchors: `#home`, `#about` (with `#skills`), `#research`, `#projects`,
`#experience`, `#education`, `#contact`.

1. **Header:** sticky. Transparent at the top; on scroll it gets a dark background and a 1px
   bottom border. Gradient wordmark; links Home / About / Research / Projects / Experience /
   Contact (an orange underline marks the current section); a compact orange "Get in touch"
   button. Education is reached from the mobile menu, the Experience section ("Education &
   recognition ↓") and the footer.
2. **Home:** split hero as in the reference.
   - Left: "Hi, I am" → **Syeda Maliha Tabassum** (large, white) → orange gradient role
     "AI Researcher" → focus line → intro → circular social icons (LinkedIn, GitHub, email
     only) → "Explore my work" (filled) + "Download CV" (outlined) → stats panel:
     1 published paper · 4 under review · 5 projects · 250+ students mentored, all
     computed from content.
   - Right: charcoal circle with an abstract perception diagram (no portrait was supplied).
3. **About & Skills:**
   - Arch-backed monogram composition on the left (echoing the reference's About portrait),
     personal statement and biography on the right, PhD availability note, Download CV.
   - Below: a 3×2 grid of expertise cards in the reference's "Services" style (orange
     icon, title, description, technology labels, "Applied in" links that jump to and open
     the matching entry). No percentages.
4. **Research & Publications:**
   - Centred heading and interest statement; status legend.
   - Search plus compact status buttons and a topic select.
   - The published paper is a featured row; the other rows are an editorial list (year
     and status column, then title, authors, venue/submission, topics, and a "Details"
     toggle).
   - The inline panel holds the CV summary, publication-status note, DOI, citation copy,
     BibTeX and a permalink. Deep link: `#research-<id>`.
5. **Projects:**
   - Filter chips in the reference style. A featured full-width card (ArUco bot, with a
     real photo from its demo video), then a 2-column grid.
   - Cards have consistent 16:9 media, title, tagline, technology labels and an "Explore
     project" button.
   - The detail panel opens full-width directly under the card's row (CSS grid with
     `dense` packing; on mobile, directly under the card). It contains overview,
     technologies, demo video, links, credits, related research and a Close button.
     Deep link: `#project-<id>`.
   - Projects without media get a decorative abstract graphic marked as decorative.
6. **Experience:** timeline with dates in a narrow column, a thin vertical rule with orange
   markers, role and organisation, and contributions. Includes the engineering-team
   activity (Mars rover).
7. **Education & Recognition:** two columns of compact rows (education with results;
   awards, scholarships and competitions with small icons). Stacks on mobile.
8. **Contact:** large typographic invitation, prominent orange email action, copy email,
   profile circles, CV, availability.
9. **Footer:** name, year, back to top, design attribution to the Figma Community file.

Old URLs (`/about/`, `/research/`, `/research/<id>/`, `/projects/<id>/` …) are kept as
tiny `noindex` redirect pages pointing to the matching anchor, so the live site's links
keep working without duplicate content.

## 4. Responsive rules

- **≥ 1024px:** split hero, horizontal nav, 3-column expertise grid, 2-column project grid
  under the featured card, 2-column education & recognition.
- **640–1023px:** hero stacks (art below text, smaller), nav collapses to a menu button,
  2-column expertise grid, 2-column projects, research rows keep year/status above the
  title.
- **< 640px:** single column everywhere; filter chips wrap; stats 2×2; touch targets
  ≥ 44px; no horizontal overflow; long academic titles wrap naturally (no truncation).

## 5. Motion (proposed; not taken from the reference)

| Element | Spec |
| --- | --- |
| Hero entrance | greeting → name → role → focus → intro → socials → actions → stats; 560ms, 75ms stagger, opacity + 16px translateY, `cubic-bezier(.22,1,.36,1)`. CSS only, so content is never hidden if JS fails. |
| Section reveal | One-time, 420ms, opacity + 14px; only elements starting below the fold are hidden, and only by JS. |
| Nav | Underline grows on hover/focus (180ms); orange marker on the active section; header background and border fade in after 8px of scroll. |
| Project cards | Media scales to 1.02 on hover-capable devices; border turns orange-tinted; actions always visible. |
| Inline expansion | `grid-template-rows: 0fr → 1fr` (no fixed heights) over 320ms; collapsed content is `inert`. |
| Theme switch | 250ms colour transition only while toggling; a pre-paint script prevents a flash of the wrong theme. |
| Reduced motion | Every transition and animation is disabled; nothing depends on motion. |

No marquees, parallax, custom cursor, scroll hijacking or autoplay.

## 6. Files

- **Rewritten:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`,
  `src/components/SiteHeader.astro`, `SiteFooter.astro`, `FilterControls.astro`,
  `ProjectCover.astro` (styles), `CopyButton.astro` (styles), `SectionRedirect.astro`,
  `src/scripts/site.ts`, `src/scripts/filters.ts` (select facet, reset/applied events),
  `src/components/sections/Hero.astro`, `About.astro` (now includes skills), `Research.astro`,
  `Projects.astro`, `Experience.astro`, `src/pages/index.astro`, `src/data/navigation.ts`,
  `src/lib/content.ts` (skill evidence now links to anchors), `src/content.config.ts`
  (optional project `cover`), `astro.config.mjs` (Lato + JetBrains Mono; sitemap filter),
  `public/favicon.svg`, PNG icons, `public/og/default.png`, `scripts/social-card.html`,
  `tests/links.test.mjs`, `tests/status.test.mjs`.
- **New:** `src/components/SectionHeading.astro`, `src/components/ResearchRow.astro`,
  `src/components/sections/Education.astro`, `src/components/sections/Contact.astro`,
  `src/assets/projects/aruco-service-bot/demo-frame.jpg`.
- **Converted to redirects:** `src/pages/research/[id].astro`, `src/pages/projects/[id].astro`,
  and the section stubs (`about`, `research`, `projects`, `experience`, `education`,
  `skills`, `contact`).
- **Token rename only:** `CitationBlock`, `LinkList`, `YouTubeEmbed`, `Gallery`,
  `AuthorList`, `Breadcrumbs`, `PageHeader`, `HeroArt`, `404`, Writing page.
- **No longer used** (kept until the owner approves removal): `AvailabilityBadge.astro`,
  `ContactBand.astro`, `Marquee.astro`, `Monogram.astro`, `Pager.astro`, `ResearchItem.astro`,
  `SectionTitle.astro`, `sections/Recognition.astro`, `sections/Skills.astro`.
