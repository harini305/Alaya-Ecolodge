'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Gentle smooth scrolling for mouse wheel / trackpad (Lenis), driven by the
 * GSAP ticker so ScrollTrigger animations stay in sync. Touch scrolling stays
 * native, and nothing runs when the visitor prefers reduced motion.
 * The instance is exposed as window.__lenis for scroll-to-top / menu lock.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;

    // In-page #anchor links: measure from the real current scroll position
    // (Lenis's own anchor handling can use a stale position after a native
    // scroll from the scrollbar or keyboard, and land short of the target).
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href^="#"]');
      if (!a || a.classList.contains('skip-link')) return;
      const id = decodeURIComponent(a.getAttribute('href').slice(1));
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const target = el.getBoundingClientRect().top + window.scrollY - offset;
      lenis.resize();
      lenis.scrollTo(target, { force: true });
      history.pushState(null, '', `#${id}`);
    };
    document.addEventListener('click', onClick);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
