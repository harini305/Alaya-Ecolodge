'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Button, { Arrow } from '@/components/ui/Button';
import CottageGallery from './CottageGallery';
import { centerInScroller } from '@/lib/scroll';
import styles from './Cottages.module.css';

const FACT_LABELS = [
  ['guests', 'Guests'],
  ['bedrooms', 'Bedrooms'],
  ['bathrooms', 'Bathrooms'],
  ['area', 'Area'],
];

/**
 * All 11 cottages as an ARIA tablist (vertical list on desktop, swipeable
 * chips on mobile) driving one detail panel. Deep-linkable via #slug, which
 * is also how the homepage cottage index links in.
 */
export default function CottageSelector({ cottages, defaultSlug, booking, grounds }) {
  const defaultIndex = Math.max(0, cottages.findIndex((c) => c.slug === defaultSlug));
  const [active, setActive] = useState(defaultIndex);
  const tabRefs = useRef([]);
  const panelRef = useRef(null);
  const sectionRef = useRef(null);
  const firstRender = useRef(true);

  // Sync with #slug (on load and when the hash changes).
  useEffect(() => {
    const apply = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      const i = cottages.findIndex((c) => c.slug === slug);
      if (i >= 0) {
        setActive(i);
        sectionRef.current?.scrollIntoView({ block: 'start' });
      }
    };
    const raf = requestAnimationFrame(apply);
    window.addEventListener('hashchange', apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('hashchange', apply);
    };
  }, [cottages]);

  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(
        panelRef.current.querySelectorAll('[data-panel-part]'),
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.06, ease: 'power3.out' }
      );
    },
    { dependencies: [active] }
  );

  const select = (i, focus = false) => {
    const n = (i + cottages.length) % cottages.length;
    setActive(n);
    history.replaceState(null, '', `#${cottages[n].slug}`);
    if (focus) tabRefs.current[n]?.focus();
    centerInScroller(tabRefs.current[n]);
  };

  const onKeyDown = (e) => {
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in map) {
      e.preventDefault();
      select(active + map[e.key], true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(cottages.length - 1, true);
    }
  };

  const c = cottages[active];
  const prev = cottages[(active - 1 + cottages.length) % cottages.length];
  const next = cottages[(active + 1) % cottages.length];

  return (
    <div className={styles.selector} ref={sectionRef}>
      <div className={styles.listWrap}>
        <div role="tablist" aria-label="Cottages" aria-orientation="vertical" className={styles.list} onKeyDown={onKeyDown}>
          {cottages.map((item, i) => (
            <button
              key={item.slug}
              ref={(el) => (tabRefs.current[i] = el)}
              id={item.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls="cottage-panel"
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => select(i)}
            >
              <span className={styles.tabName}>{item.name}</span>
              <span className={styles.tabMeta}>{[item.facts.guests, item.facts.area].filter(Boolean).join(' · ') || item.type}</span>
            </button>
          ))}
        </div>
      </div>

      <div id="cottage-panel" role="tabpanel" aria-labelledby={c.slug} className={styles.panel} ref={panelRef} tabIndex={-1}>
        <header className={styles.panelHead} data-panel-part>
          <h3 className={styles.panelName}>{c.name}</h3>
          <p className={styles.panelType}>{c.type}</p>
        </header>

        <div data-panel-part>
          <CottageGallery key={c.slug} name={c.name} images={c.images} grounds={grounds} />
        </div>

        <div className={styles.details} data-panel-part>
          <div className={styles.detailsMain}>
            <p className={styles.description}>{c.description}</p>
            <dl className={styles.facts}>
              {FACT_LABELS.map(([key, label]) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd className={c.facts[key] ? undefined : styles.tbc}>{c.facts[key] ?? 'To be confirmed'}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className={styles.offers}>
            <h4 className={styles.offersTitle}>What it offers</h4>
            <ul role="list">
              {c.offers.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.book} data-panel-part>
          <Button href={booking.href}>{booking.label}</Button>
          <Button href="/about-us#contact" variant="outline">
            Contact Us
          </Button>
        </div>

        <nav className={styles.stepper} aria-label="Browse cottages">
          <button type="button" onClick={() => select(active - 1)}>
            <Arrow dir="left" className={styles.stepIcon} />
            <span>
              <span className={styles.stepLabel}>Previous</span>
              {prev.name}
            </span>
          </button>
          <button type="button" onClick={() => select(active + 1)}>
            <span>
              <span className={styles.stepLabel}>Next</span>
              {next.name}
            </span>
            <Arrow dir="right" className={styles.stepIcon} />
          </button>
        </nav>
      </div>
    </div>
  );
}
