// Main navigation. `href` is relative to the site root (base path is added
// automatically). The Writing link is added automatically once a post exists.
export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: 'About', href: 'about/' },
  { label: 'Research', href: 'research/' },
  { label: 'Projects', href: 'projects/' },
  { label: 'Experience', href: 'experience/' },
  { label: 'Education', href: 'education/' },
  { label: 'Skills', href: 'skills/' },
  { label: 'Contact', href: 'contact/' },
];

export const writingNavItem: NavItem = { label: 'Writing', href: 'writing/' };
