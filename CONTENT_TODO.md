# Content to-do

Things the site needs from you, and wording decisions to review. Nothing here appears on the
site — missing items are simply left out until supplied.

## Needed from you

### Accounts and links
- [x] **GitHub profile** confirmed as `github.com/SyedaMalihaTabassum19` — added to the footer,
      About, Contact and the contact band.
- [x] **Google Scholar, ORCID, ResearchGate** supplied — shown in the hero, About (Research
      card), Contact and footer. The ResearchGate link's tracking parameter (`?ev=hdr_xprf`) was
      removed.
- [ ] **Long-term email.** The site uses `syeda.maliha.tabassum1@g.bracu.ac.bd`. University
      addresses sometimes expire after graduation — do you want a personal address instead?
- [ ] **GitHub username and repository name** for deployment (see README → Deploy).

### Broken or questionable links
- [x] **WeHeal:** the repository link returns 404, so the site links only the live website
      (weheal.live) — confirmed as sufficient. Optional: the public CV PDF still contains the
      old repository link; remove it from your LaTeX source next time you update the CV.
- [ ] The DOI link (`doi.org/10.1109/JCSSE68839.2026.11596610`) resolves. Check it lands on
      the right IEEE Xplore page once indexed.

### Media (all optional — shown only when supplied)
- [ ] **Portrait photo** for the About page (README → "Add a photo of yourself").
- [ ] **Project photos, screenshots or diagrams**, especially the ArUco service bot, the
      Arduino health monitor hardware, PathGuard's circuit, WeHeal screens, and Mars rover
      subsystem work if shareable.
- [ ] **Figures for research entries**, only where publication/review rules allow.

### Details only you can confirm
- [ ] **Your role in each project and paper** (you're preparing these). The site uses the CV's
      wording only. Add them as a Markdown section in each `src/content/projects/*.md` (below
      the `---`), e.g. `## My role`.
- [ ] **Team members for projects.** Only Reshad Ul Karim is credited, because his account hosts
      the ArUco bot and WeHeal repositories and the demo video. Who else should be credited?
- [x] **Author lists:** decided — complete author lists are shown **only for published papers**.
      Add `authors:` to a manuscript when it is published (together with venue, DOI, etc.).
- [ ] **Preprints** (arXiv etc.) for any under-review manuscript, to link.
- [ ] **CSE471 Project Demonstration, 1st Runner-Up (Dec 2025):** which project was it? If it
      was WeHeal, it can be noted on that case study.
- [ ] **NEXTERN:** the CV lists it as the role title. Would you like a descriptive title such as
      "NEXTERN Intern" for visitors who don't know the programme?
- [ ] **DRISTEE:** may the site say more about the assistive technology project (what it is,
      your part)?
- [ ] **Location:** "Dhaka, Bangladesh" (city only, from the CV) appears on About and Contact.
      Remove it if you'd rather not show it.
- [x] **Availability:** "Open to PhD positions for Fall 2027" (confirmed) — shown as a badge in
      the hero, Contact page and contact band, and as a note on About. Change or remove it via
      `availability` in `src/data/profile.ts` (`null` hides it everywhere).
- [ ] **BibTeX:** check the JCSSE entry against IEEE Xplore's own export once available,
      especially how multi-part names ("Reshad Ul Karim") are split.

## Draft wording to review

Written from the CV; please read and adjust anything that doesn't sound like you.

| Where | Draft |
| --- | --- |
| Headline (`profile.ts`) | "AI Researcher & Computer Science Graduate" |
| Focus line (`profile.ts`) | "Multimodal AI, agentic systems and reliable decision-making." |
| Hero intro (`profile.ts`) | "I build and evaluate AI systems that perceive, reason and decide in the physical world — and that know when to hold back. My work spans monocular 3D perception, calibrated models for health, assistive edge–cloud agents, and hands-on embedded and robotic systems." |
| Home, research themes heading | "Perception that can be trusted, for the people who rely on it." |
| Home, theme blurbs (`taxonomy.ts`) | Four one-line summaries grouping your research by topic |
| About page | Five paragraphs + "Where I'm heading" (ends: "…systems whose confidence means something, and that can recognise when they should not decide at all.") |
| JCSSE paper summary | "A vision-based framework for hand-gesture control of a virtual keyboard and mouse, combined with bilingual next-word prediction." — written from the title, since the CV has no description. Replace with the abstract's first sentence if you prefer. |
| Project taglines | One-line summaries per project (e.g. PathGuard: "Autonomous navigation without a microcontroller — decisions made in discrete logic.") |
| Skill name | CV line "Data-Driven Decision" (cut off at a line break) is shown as "Data-Driven Decision-Making". |
| 404 page | A light joke about abstaining when evidence is insufficient. |

## Editorial decisions made

- **Leadership & Activities section omitted.** The only candidates are the Mars rover team
  (shown under Experience) and the Duke of Edinburgh's Award (under Recognition). Add the
  section once there are distinct roles to list (club positions, organising, volunteering).
- **Writing section hidden** until the first post exists (README → "Write articles").
- **References and phone number** removed from the public CV and never shown on the site.
- **Research grouping:** Published → Under review → In progress. Every entry has its own page.
  Under-review entries say "Submitted to … and under peer review" (owner asked to drop
  the "has not been accepted" line, 2026-11-10).
- **Topic tags** (reliable AI, perception, health, assistive, interaction) were assigned from
  the CV descriptions. Adjust in each `src/content/research/*.md`.
- **Related links:** the Arduino fall-detection project is cross-linked with the vision-based
  fall detection review as related *topics*, not as a claim that one fed into the other.
- **Skill evidence:** a skill links to a project, paper or role only where the CV text
  for that item names it, or names something it directly covers. Most skills deliberately
  have no link. See `src/data/skills.json`.
- **Project covers** are abstract, code-drawn illustrations by category, not screenshots.

## Added with the v3 redesign (dark / orange single page)

### Assets the new layout is ready for
- [x] **Portrait photo** supplied (`Formal picture in suit.jpg`) — background removed with
      `scripts/make-portrait-cutout.py --no-enhance` (no filters, at the owner's request). The
      About photo is a separate colour cut-out; the top bar's avatar is cropped from the hero
      cut-out (`src/assets/avatar.png`).
- [x] **WeHeal card image** supplied — a screenshot of the weheal.live home page
      (`src/assets/projects/weheal/homepage.png`).
- [ ] **Project card images** for the Arduino health monitor, PathGuard and the smoking
      model (screenshots, photos of the hardware, or diagrams). Until then those cards show an
      abstract decorative graphic. Add each as `cover:` in its project file.
- [ ] **ArUco bot card image:** a frame from the demo video published by Reshad Ul Karim
      (`src/assets/projects/aruco-service-bot/demo-frame.jpg`, credited in the project
      panel). Confirm he's happy for it to be used, or supply your own photo.
- [ ] **Your contribution per research entry.** The design has room for a "My contribution"
      note in each research panel, but the CV only gives the project descriptions, so none is
      shown. Add a short note in each `src/content/research/*.md` body if you'd like one.

### Decisions
- Skill percentages from the reference's About section were **not** used (they would be
  invented ratings); skills appear as grouped labels with links to where they were applied.
- The reference's stats ("years of experience", "happy clients") were replaced with counts
  computed from content: published papers, manuscripts under review, projects, and the 250+
  students from the teaching role.
- The reference's contact form was not added (no delivery service is configured); the
  contact section uses a prominent email action instead.
- The former per-paper and per-project pages now forward to their inline entries
  (`#research-<id>`, `#project-<id>`), so links already shared keep working.
- The reference recording (`Recording 2026-10-29 061445.mp4`) stays local and is excluded
  from git.

## Certificates and photos for Recognition
- [x] **University Rover Challenge 2025** — "Globally ranked 8th of 102 teams" (The Mars Society,
      with BRACU Mongol Tori) added as the highlight card, at the owner's request (she was on the
      team). It is not on the current CV. The ranking is the team's result.
- [ ] **URC 2025 team photo** for the highlight card: save the original as
      `src/assets/awards/urc-2025.jpg` and add `"photoAlt"` (a screenshot from another website
      would be too low-resolution).
- [ ] **URC 2025 month** — only the year is shown. Add e.g. `"date": "2025-06"` if you want the month.
- [ ] **URC 2025 certificate** (Drive link) and any results page to link.
- [ ] **Award photos** (optional), e.g. from the competitions. Save as
      `src/assets/awards/<award id>.jpg` (README → "Recognition").
- [ ] **Google Drive links** for each award's certificate (Dean's List/VC's List, merit scholarship,
      EXCELERATE, CSE471, RoboSoccer ×2, Hult Prize, Duke of Edinburgh). Each one gets a
      "View certificate" button with an in-page preview once its link is added to
      `src/data/awards.json` (README → "Add certificate links"). Set sharing to
      "Anyone with the link → Viewer".
- [x] **Secondary School Certificate** added (Jan 2017 – May 2019, Shaheed Bir Uttam Lt. Anwar Girls
      College, GPA 5.00/5.00) — supplied by the owner; it is not on the current CV.
- [x] **Highest Distinction** for the B.Sc. — supplied by the owner (not on the current CV);
      shown on the degree card and in About. Consider adding it to the CV too.
- [ ] **Citation count:** the About research card shows paper counts only. A Google Scholar
      citation number can be added if you want one (it would need updating by hand).

## Added with the new projects (from the owner's pictures and reports)

Six projects were added (PetSeg, Rakkhosh Must Die, Matrimonial Hub, Smart City Healthcare
Network, ProCV, VoltScope) and the existing ones got photos, team credits and details from the
reports. Everything comes from the reports, the Matrimonial repository and the owner's own
description. The original pictures and reports stay in `Pictures/` (git-ignored). At the owner's
request the reports are published in `public/reports/` and linked from each project, with
**student IDs blacked out** (names kept). The health monitor keeps its existing Drive report link.

- [ ] **Dates.** Only VoltScope (Spring 2024, from its report) has a date among the new projects.
      Add `start`/`end` (YYYY-MM) or `period: Fall 2024` to ProCV, Matrimonial Hub, the network
      design, Rakkhosh Must Die and PetSeg.
- [ ] **Your role** in PetSeg, the network design, Rakkhosh Must Die, VoltScope and ProCV — only
      the health monitor's report lists individual contributions.
- [ ] **Team for Rakkhosh Must Die (Group 09), VoltScope and ProCV** — the reports don't name
      the members.
- [ ] **WeHeal course** (folder "470"): CSE470? And was WeHeal the CSE471 1st Runner-Up project?
- [ ] **Matrimonial Hub course name** (CSE370 — Database Systems?). The site shows only "CSE370".

### Image decisions
- **WeHeal screenshots:** a phone number and two e-mail addresses (the project contact line and
  Reshad's personal Gmail) were blurred.
- [ ] **Smoking prediction and PetSeg images are shown in full (owner's request), but their
      numbers don't match the reports.** The smoking graphic's charts show accuracies of
      0.83–0.91 and blood pressure as the top feature; the report has 55–82% accuracy and
      near-zero correlations. The PetSeg graphic shows a pixel accuracy of 0.985 and a "U-Net++"
      model; the report has about 0.95 and no U-Net++. Consider correcting the graphics.
- **Card images:** the health monitor, PathGuard, network design, ProCV, WeHeal and
  Matrimonial Hub cards show animated 3D scenes (owner's request); their real
  photos/screenshots are in each project's gallery.
  VoltScope's card is a landscape crop of its bench photo.
- [ ] **Rakkhosh Must Die screenshot:** when supplied, add it to `media` (gallery); the card can
      keep its animated arena or switch to the screenshot with `cover:`.
- **VoltScope videos** were compressed (9.6 MB → 1.8 MB, 18 MB → 4.9 MB) and muted.
- `Pictures/mongoltori  v1.jpg` (two spaces; the rover alone in the desert) was not used — the
  one named `mongoltori v1.jpg` (rover with the flag) was. Swap them if you prefer.
- `Pictures/Aspire Leaders Certificate for Maliha.png` was not used (not requested). If you'd
  like it under Recognition, note it shows signatures — link it from Drive rather than
  publishing the image.

## English proficiency (IELTS)

Supplied by the owner on 2026-11-09: IELTS Academic, taken 3 November 2026; overall band 7.5,
CEFR C1; Listening 8.5, Reading 8.0, Speaking 7.0, Writing 6.5. Shown as a card in the About
"at a glance" boxes (module scores behind a button), from `src/data/language-tests.ts`.

- [ ] Optional: a Test Report Form link or verification number, if you want one shown.
