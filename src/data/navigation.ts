// Single-page navigation. Each item jumps to a section of the home page
// (`id` must match the section's id). The base path is added automatically.
export interface NavItem {
  label: string;
  /** Section id on the home page. */
  id: string;
  /** Shown in the compact desktop bar (all items appear in the mobile menu and footer). */
  primary: boolean;
}

export const sections: NavItem[] = [
  { label: 'Home', id: 'home', primary: true },
  { label: 'About', id: 'about', primary: true },
  { label: 'Research', id: 'research', primary: true },
  { label: 'Projects', id: 'projects', primary: true },
  { label: 'Experience', id: 'experience', primary: true },
  { label: 'Education', id: 'education', primary: false },
  { label: 'Awards', id: 'recognition', primary: true },
  { label: 'Contact', id: 'contact', primary: true },
];

/**
 * Which desktop nav item lights up while a section is in view.
 * Education has no desktop item, so it highlights Experience until the
 * Recognition part of that section (Awards) is reached.
 */
export const navTargetFor: Record<string, string> = {
  education: 'experience',
};
