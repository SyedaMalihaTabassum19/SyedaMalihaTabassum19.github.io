// Site-wide behaviour: theme switch, mobile menu, scroll reveals, back-to-top.
// Everything here is progressive enhancement — the site is fully readable
// and navigable without it.
import { announce } from './announce';

const root = document.documentElement;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');


// ── Theme ────────────────────────────────────────────────────────────────
function initTheme(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const label = button?.querySelector<HTMLElement>('[data-theme-label]');
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  if (!button || !label) return;

  const effective = () => (root.dataset.theme as 'light' | 'dark' | undefined) ?? (system.matches ? 'dark' : 'light');

  const sync = () => {
    const now = effective();
    root.dataset.effectiveTheme = now;
    const next = now === 'dark' ? 'light' : 'dark';
    label.textContent = `Switch to ${next} theme`;
    button.title = `Switch to ${next} theme`;
  };

  button.hidden = false;
  sync();

  button.addEventListener('click', () => {
    const next = effective() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable — the choice lasts for this page only */
    }
    sync();
    announce(`${next[0].toUpperCase()}${next.slice(1)} theme on`);
  });

  // Follow the operating system until the visitor makes an explicit choice.
  system.addEventListener('change', () => {
    if (!root.dataset.theme) sync();
  });
}

// ── Mobile menu ──────────────────────────────────────────────────────────
function initMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  const outside = [document.querySelector('main'), document.querySelector('.site-footer'), document.querySelector('[data-to-top]')];
  const compact = window.matchMedia('(max-width: 66rem)');

  const setOpen = (open: boolean, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.toggleAttribute('data-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    outside.forEach((el) => el?.toggleAttribute('inert', open));
    if (open) menu.querySelector<HTMLAnchorElement>('a')?.focus();
    else if (returnFocus) toggle.focus();
  };

  const applyMode = () => {
    toggle.hidden = !compact.matches;
    if (!compact.matches) setOpen(false);
  };

  applyMode();
  compact.addEventListener('change', applyMode);

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.hasAttribute('data-open')) setOpen(false, true);
  });

  menu.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) setOpen(false);
  });

  // Keep Tab inside the open menu panel + toggle button.
  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !menu.hasAttribute('data-open')) return;
    const links = [...menu.querySelectorAll<HTMLAnchorElement>('a')];
    const last = links.at(-1);
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      toggle.focus();
    }
  });
}

// ── Scroll state, back-to-top ────────────────────────────────────────────
function initScrollState(): void {
  const toTop = document.querySelector<HTMLAnchorElement>('[data-to-top]');
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    root.classList.toggle('is-scrolled', y > 8);
    toTop?.classList.toggle('is-shown', y > window.innerHeight * 0.9);
    ticking = false;
  };
  update();
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  // Move focus to the top of the page for keyboard and screen-reader users.
  toTop?.addEventListener('click', () => {
    window.setTimeout(() => document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true }), 0);
  });
}

// ── Reveal on scroll ─────────────────────────────────────────────────────
// Only elements that start below the fold are hidden, and only once this
// script runs — so nothing is ever invisible when JS is off or fails.
function initReveal(): void {
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
  const fold = window.innerHeight * 0.92;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('reveal-in');
        el.classList.remove('reveal-pending');
        observer.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  for (const el of items) {
    if (el.getBoundingClientRect().top < fold) continue;
    el.classList.add('reveal-pending');
    observer.observe(el);
  }
}

initTheme();
initMenu();
initScrollState();
initReveal();
