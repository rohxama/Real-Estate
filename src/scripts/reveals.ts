/**
 * Scroll reveals.
 *
 * A single IntersectionObserver adds `.is-revealed` to elements marked with
 * `[data-reveal]`. Sections opt in individually, so the page never animates
 * everything at once. There is no scroll listener, no layout measurement and
 * no animation library.
 */
const targets = Array.from(
  document.querySelectorAll<HTMLElement>('[data-reveal]'),
);

if (targets.length > 0) {
  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  );

  let observer: IntersectionObserver | undefined;

  const revealAll = () => {
    observer?.disconnect();
    document.documentElement.classList.remove('reveal-ready');
    targets.forEach((target) => target.classList.add('is-revealed'));
  };

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    document.documentElement.classList.add('reveal-ready');

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer?.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
      },
    );

    targets.forEach((target) => observer?.observe(target));
  }

  // If the preference changes while the page is open, stop hiding content.
  reducedMotion.addEventListener('change', (event) => {
    if (event.matches) revealAll();
  });
}
