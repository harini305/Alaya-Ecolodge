'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Declarative page motion. Server components opt in with data attributes:
 *   data-hero / data-hero-media / data-hero-line   hero entrance
 *   data-words (+ data-word children)              staggered heading words
 *   data-reveal                                    fade + rise on enter
 *   data-reveal-image                              clip-path image reveal
 *   data-parallax="40"                             gentle y drift (desktop)
 *
 * Mounted from app/template.js, so it remounts on each navigation and
 * useGSAP reverts every tween + ScrollTrigger on unmount (no duplicates).
 * Nothing here runs when the visitor prefers reduced motion; the CSS
 * initial states are only applied under html.motion (see globals.css).
 */
export default function PageMotion({ children }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const root = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          desktop: '(min-width: 768px)',
        },
        (ctx) => {
          const { motion, desktop } = ctx.conditions;
          const q = gsap.utils.selector(scope);
          if (!motion || !root.classList.contains('motion')) return;

          // ---- Hero entrance (+ gentle scroll drift on desktop)
          q('[data-hero]').forEach((hero) => {
            const media = hero.querySelectorAll('[data-hero-media] img');
            const lines = hero.querySelectorAll('[data-hero-line] > *');
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
            tl.fromTo(media, { scale: 1.12 }, { scale: 1, duration: 2.4, ease: 'power2.out' }, 0);
            tl.fromTo(
              lines,
              { yPercent: 40, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1.25, stagger: 0.13 },
              0.2
            );
            if (desktop && media.length) {
              gsap.to(hero.querySelectorAll('[data-hero-media]'), {
                yPercent: 14,
                ease: 'none',
                scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
              });
            }
          });

          // ---- Headings: word stagger
          q('[data-words]').forEach((el) => {
            if (el.closest('[data-hero]') || el.closest('[hidden]')) return;
            gsap.fromTo(
              el.querySelectorAll('[data-word]'),
              // y:0 clears the px offset GSAP reads from the CSS initial state.
              // Fade + rise (no clipping mask) so script glyphs are never cut.
              { yPercent: 35, y: 0, opacity: 0 },
              {
                yPercent: 0,
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.045,
                ease: 'power4.out',
                scrollTrigger: { trigger: el, start: 'top 94%', once: true },
              }
            );
          });

          // ---- Generic reveal, batched so siblings stagger together
          ScrollTrigger.batch(q('[data-reveal]'), {
            start: 'top 96%',
            once: true,
            onEnter: (els) =>
              gsap.fromTo(
                els,
                { y: 22, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.07, overwrite: true }
              ),
          });

          // ---- Image reveal: clip-path opens, inner image settles
          q('[data-reveal-image]').forEach((el) => {
            const img = el.querySelector('img');
            const tl = gsap.timeline({
              scrollTrigger: { trigger: el, start: 'top 94%', once: true },
              defaults: { duration: 1.1, ease: 'power3.out' },
            });
            tl.fromTo(
              el,
              { clipPath: 'inset(10% 6% 10% 6% round 24px)' },
              // stays inline: clearing it would hand back to the CSS initial state
              { clipPath: 'inset(0% 0% 0% 0% round 0px)' }
            );
            if (img) tl.fromTo(img, { scale: 1.1 }, { scale: 1, ease: 'power2.out', duration: 1.4 }, 0);
          });

          // ---- Parallax drift (desktop only, small amplitudes)
          if (desktop) {
            q('[data-parallax]').forEach((el) => {
              const amt = (parseFloat(el.dataset.parallax) || 30) * 0.6;
              gsap.fromTo(
                el,
                { y: -amt },
                {
                  y: amt,
                  ease: 'none',
                  scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
                }
              );
            });
          }

        }
      );

      root.classList.add('motion-ready');
      // Dev-only probe used by QA to confirm triggers don't accumulate across navigations.
      if (process.env.NODE_ENV !== 'production') window.__stCount = () => ScrollTrigger.getAll().length;

      // Fonts change line heights; recalculate trigger positions once loaded.
      let alive = true;
      document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());
      return () => {
        alive = false;
        mm.revert();
      };
    },
    { scope }
  );

  return <div ref={scope}>{children}</div>;
}
