# Content to-do

Things the site needs from you, and wording decisions to review. Nothing here appears on the
site — missing items are simply left out until supplied.

## Needed from you

### Accounts and links
- [x] **GitHub profile** confirmed as `github.com/SyedaMalihaTabassum19` — added to the footer,
      About, Contact and the contact band.
- [ ] **Google Scholar, ORCID, ResearchGate** URLs, if you have them.
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
  Under-review pages state plainly that the work "has not been accepted".
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
- [x] **Portrait photo** supplied (`Formal picture in suit.jpg`) — cut out with
      `scripts/make-portrait-cutout.py`; colour in the hero, grayscale on the About arch.
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

## Certificates for Recognition
- [ ] **Google Drive links** for each award's certificate (Dean's List/VC's List, merit scholarship,
      EXCELERATE, CSE471, RoboSoccer ×2, Hult Prize, Duke of Edinburgh). Each one gets a
      "View certificate" button with an in-page preview once its link is added to
      `src/data/awards.json` (README → "Add certificate links"). Set sharing to
      "Anyone with the link → Viewer".
- [x] **Secondary School Certificate** added (Jan 2017 – May 2019, Shaheed Bir Uttam Lt. Anwar Girls
      College, GPA 5.00/5.00) — supplied by the owner; it is not on the current CV.
