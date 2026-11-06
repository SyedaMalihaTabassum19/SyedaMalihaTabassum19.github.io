// Identity and contact details shown across the site.
import portraitCutout from '../assets/portrait-cutout.png';
import aboutPortrait from '../assets/about-portrait.png';

// Source: the CV. Public contact details only — never add a phone number,
// a home address or referees' details here.

export interface ProfileLink {
  label: string;
  url: string;
  /** Short handle shown next to the label, e.g. "in/username". */
  handle: string;
  icon: 'linkedin' | 'github' | 'scholar' | 'orcid' | 'mail' | 'link';
}

export interface Profile {
  name: string;
  /** Short form used in the header and footer. */
  shortName: string;
  monogram: string;
  /** Primary professional label (page titles, social cards). */
  headline: string;
  /** The supporting line under the name in the hero. */
  focus: string;
  /** Hero introduction — 2–3 sentences. */
  intro: string;
  /** Default meta description. */
  description: string;
  location: string;
  email: string;
  links: ProfileLink[];
  /**
   * What you're looking for, shown in the hero, About, Contact and the contact
   * band. Set to null to hide it everywhere.
   */
  availability: null | {
    /** Full sentence-style label, e.g. "Open to PhD positions for Fall 2027". */
    label: string;
    /** Compact form for small badges. */
    short: string;
  };
  /** Path inside /public, or null to hide every CV download button. */
  cv: { path: string; label: string; updated: string } | null;
  /** Hero portrait (transparent cut-out) — null shows the abstract diagram instead. */
  portrait: null | { src: ImageMetadata; alt: string };
  /** About-section photo (transparent cut-out) — null falls back to the hero portrait. */
  aboutPortrait: null | { src: ImageMetadata; alt: string };
  interests: string[];
}

export const profile: Profile = {
  name: 'Syeda Maliha Tabassum',
  shortName: 'Maliha Tabassum',
  monogram: 'SMT',
  headline: 'AI Researcher & Computer Science Graduate',
  focus: 'Multimodal AI, agentic systems and reliable decision-making',
  intro:
    'I build and evaluate AI systems that perceive, reason and decide in the physical world — and that know when to hold back. My work spans monocular 3D perception, calibrated models for health, assistive edge–cloud agents, and hands-on embedded and robotic systems.',
  description:
    'Syeda Maliha Tabassum — computer science graduate (BRAC University) and AI researcher working on multimodal AI, agentic systems and reliable decision-making. Open to PhD positions for Fall 2027.',
  location: 'Dhaka, Bangladesh',
  email: 'syeda.maliha.tabassum1@g.bracu.ac.bd',
  links: [
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/syeda-maliha-tabassum19',
      handle: 'in/syeda-maliha-tabassum19',
      icon: 'linkedin',
    },
    {
      label: 'GitHub',
      url: 'https://github.com/SyedaMalihaTabassum19',
      handle: 'SyedaMalihaTabassum19',
      icon: 'github',
    },
  ],
  availability: {
    label: 'Open to PhD positions for Fall 2027',
    short: 'Open to PhD positions · Fall 2027',
  },
  cv: {
    path: 'cv/Syeda-Maliha-Tabassum-CV.pdf',
    label: 'Download CV (PDF)',
    updated: '2026-10',
  },
  // Generated from "Formal picture in suit.jpg" by scripts/make-portrait-cutout.py.
  portrait: { src: portraitCutout, alt: 'Syeda Maliha Tabassum, in a navy suit, smiling' },
  // Generated from "890187627_…_n.jpg" by scripts/make-portrait-cutout.py.
  aboutPortrait: {
    src: aboutPortrait,
    alt: 'Syeda Maliha Tabassum in a beige checked blazer and coral shirt, smiling',
  },
  interests: [
    'Reliable AI Evaluation',
    'AI Calibration',
    'Sequential Decision-Making',
    'Agentic AI Systems',
    'Multimodal Learning',
    'Human-Centered AI',
    'Edge–Cloud AI Systems',
    'Automation',
    'Assistive Intelligence',
  ],
};
