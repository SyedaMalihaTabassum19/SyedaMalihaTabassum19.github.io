// Typed content collections. Every content file is validated against these
// schemas at build time, so a typo or a missing required field fails the build
// instead of silently publishing wrong information.
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  awardCategories,
  experienceKinds,
  ids,
  projectCategories,
  researchStatuses,
  researchTopics,
  researchTypes,
} from './data/taxonomy';

/** Month precision dates: "2026-09". */
const yearMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM, e.g. 2026-09');

const link = z.object({
  label: z.string(),
  url: z.url(),
  kind: z.enum(['repository', 'website', 'video', 'report', 'paper', 'doi', 'other']),
  /** Set when the link lives on someone else's account, e.g. "Reshad Ul Karim (collaborator)". */
  hostedBy: z.string().optional(),
});

// ── Research & publications ────────────────────────────────────────────────
const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/[^_]*.md' }),
  schema: z
    .object({
      title: z.string(),
      shortTitle: z.string().optional(),
      status: z.enum(ids(researchStatuses)),
      type: z.enum(ids(researchTypes)),
      topics: z.array(z.enum(ids(researchTopics))).min(1),
      /** One or two sentences, taken from the CV. Shown in lists and as the page lead. */
      summary: z.string(),
      year: z.number().int().optional(),
      /** Complete author list exactly as published. Leave empty if unknown. */
      authors: z.array(z.string()).default([]),
      /** Where the work appeared (published / accepted only). */
      venue: z.string().optional(),
      /** Short venue label for compact displays, e.g. "JCSSE 2026". */
      venueShort: z.string().optional(),
      /** Where a manuscript is under review. This is NOT an acceptance. */
      submittedTo: z.string().optional(),
      publisher: z.string().optional(),
      pages: z.string().optional(),
      doi: z.string().optional(),
      /** Full reference text used by the "Copy citation" button. */
      citation: z.string().optional(),
      /** Only provide when the bibliographic record is complete. */
      bibtex: z.string().optional(),
      links: z.array(link).default([]),
      featured: z.boolean().default(false),
      /** Lower numbers appear first within the same status group. */
      order: z.number().default(100),
    })
    .superRefine((entry, ctx) => {
      const issue = (message: string) => ctx.addIssue({ code: 'custom', message });
      const isOut = entry.status === 'published' || entry.status === 'accepted';
      if (isOut && (!entry.venue || !entry.year || entry.authors.length === 0)) {
        issue(`"${entry.status}" work needs venue, year and the complete author list.`);
      }
      if (!isOut && entry.venue) {
        issue('Only published/accepted work may have a `venue`. Use `submittedTo` for submissions.');
      }
      if (entry.status === 'under-review' && !entry.submittedTo) {
        issue('Under-review work needs `submittedTo`.');
      }
      if (entry.status !== 'under-review' && entry.submittedTo) {
        issue('`submittedTo` is only for under-review work.');
      }
      if (entry.status !== 'published' && (entry.doi || entry.pages)) {
        issue('A DOI or page range is only valid for published work.');
      }
      if (entry.bibtex && !(entry.status === 'published' && entry.doi && entry.citation)) {
        issue('Offer BibTeX only for published work with a DOI and a full citation.');
      }
    }),
});

// ── Projects ───────────────────────────────────────────────────────────────
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/[^_]*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One-line description for lists. */
      tagline: z.string(),
      /** Fuller description, taken from the CV. */
      summary: z.string(),
      start: yearMonth,
      end: yearMonth.optional(),
      categories: z.array(z.enum(ids(projectCategories))).min(1),
      /** Technologies named in the source material — do not pad this list. */
      technologies: z.array(z.string()).default([]),
      links: z.array(link).default([]),
      /**
       * Real media only. Images go in src/assets/projects/<project>/ and are
       * optimised automatically; YouTube videos use a click-to-load player.
       */
      media: z
        .array(
          z.discriminatedUnion('type', [
            z.object({
              type: z.literal('image'),
              src: image(),
              alt: z.string().min(1),
              caption: z.string().optional(),
            }),
            z.object({
              type: z.literal('youtube'),
              videoId: z.string().regex(/^[\w-]{11}$/),
              title: z.string(),
              caption: z.string().optional(),
              hostedBy: z.string().optional(),
            }),
          ]),
        )
        .default([]),
      /** Team credits. Only list people documented in the source material. */
      credits: z.array(z.string()).default([]),
      relatedResearch: z.array(reference('research')).default([]),
      featured: z.boolean().default(false),
      order: z.number().default(100),
    }),
});

// ── Experience, education, awards, skills (JSON data files) ────────────────
const experience = defineCollection({
  loader: file('src/data/experience.json'),
  schema: z.object({
    id: z.string(),
    role: z.string(),
    organisation: z.string(),
    unit: z.string().optional(),
    kind: z.enum(ids(experienceKinds)),
    start: yearMonth,
    end: yearMonth.optional(),
    highlights: z.array(z.string()).min(1),
    order: z.number().default(100),
  }),
});

const education = defineCollection({
  loader: file('src/data/education.json'),
  schema: z.object({
    id: z.string(),
    qualification: z.string(),
    field: z.string().optional(),
    institution: z.string(),
    start: yearMonth,
    end: yearMonth,
    result: z.object({ label: z.string(), value: z.string(), scale: z.string() }).optional(),
    order: z.number().default(100),
  }),
});

const awards = defineCollection({
  loader: file('src/data/awards.json'),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    /** e.g. "Top 6 Finalist", "Second Runner-Up" — exactly as documented. */
    result: z.string().optional(),
    organiser: z.string(),
    category: z.enum(ids(awardCategories)),
    start: yearMonth.optional(),
    date: yearMonth,
    order: z.number().default(100),
  }),
});

const evidence = z.object({
  projects: z.array(reference('projects')).default([]),
  research: z.array(reference('research')).default([]),
  experience: z.array(reference('experience')).default([]),
});

const skills = defineCollection({
  loader: file('src/data/skills.json'),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    description: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        /** Where this skill is visibly used. Leave empty rather than guess. */
        usedIn: evidence.optional(),
      }),
    ),
    order: z.number().default(100),
  }),
});

// ── Writing (optional) ─────────────────────────────────────────────────────
// Add Markdown files to src/content/writing/ to publish articles. The Writing
// page and its navigation link appear automatically once a post exists.
const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/[^_]*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { research, projects, experience, education, awards, skills, writing };
