/**
 * Primary navigation. Paths are relative to the site base URL so the links
 * work on the GitHub Pages project path as well as at a domain root.
 * Section fragments match the IDs used by the single-page layout.
 */
export const primaryNav = [
  { label: 'Home', path: '' },
  { label: 'Property', path: '#properties' },
  { label: 'About us', path: '#about' },
  { label: 'Contact us', path: '#contact' },
] as const;
