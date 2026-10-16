'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { centerInScroller } from '@/lib/scroll';
import styles from './Tabs.module.css';

/**
 * WAI-ARIA tabs with roving tabindex (Arrow keys, Home, End) and a GSAP
 * panel transition. Panels are server-rendered nodes; hidden panels use the
 * `hidden` attribute, so their lazy images are not fetched until shown.
 *
 * variant: "pills" (wrapping row) | "rail" (vertical list on desktop,
 * horizontal scroller on small screens).
 */
export default function Tabs({ idBase, label, tabs, panels, variant = 'pills', className = '' }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const panelRefs = useRef([]);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const panel = panelRefs.current[active];
      if (!panel || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const tl = gsap.timeline();
      tl.fromTo(panel, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
      const imgs = panel.querySelectorAll('[data-tab-anim]');
      if (imgs.length) {
        tl.fromTo(
          imgs,
          { opacity: 0, scale: 0.97 },
          { opacity: 1, scale: 1, duration: 0.8, stagger: 0.07, ease: 'power3.out' },
          0.05
        );
      }
    },
    { dependencies: [active] }
  );

  const select = (i, focus = true) => {
    const n = (i + tabs.length) % tabs.length;
    setActive(n);
    if (focus) tabRefs.current[n]?.focus();
    centerInScroller(tabRefs.current[n]);
  };

  const onKeyDown = (e) => {
    const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in map) {
      e.preventDefault();
      select(active + map[e.key]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(tabs.length - 1);
    }
  };

  return (
    <div className={`${styles.tabs} ${styles[variant]} ${className}`}>
      <div className={styles.listWrap}>
        <div role="tablist" aria-label={label} className={styles.list} onKeyDown={onKeyDown}>
          {tabs.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              id={`${idBase}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`${idBase}-panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => select(i, false)}
            >
              <span className={styles.tabLabel}>{t.label}</span>
              {t.meta != null && <span className={styles.meta}>{t.meta}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.panels}>
        {tabs.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => (panelRefs.current[i] = el)}
            id={`${idBase}-panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`${idBase}-tab-${t.id}`}
            hidden={i !== active}
            tabIndex={0}
            className={styles.panel}
          >
            {panels[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
