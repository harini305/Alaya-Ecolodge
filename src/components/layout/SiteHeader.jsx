'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './SiteHeader.module.css';

function isActive(pathname, href) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Green header: original white logo + name, spaced uppercase nav
 * with an underline active state, and a dark "Enquire" button (-> contact).
 * Mobile: full-screen menu overlay (Escape closes, focus is contained).
 * Hides while scrolling down, returns on scroll up.
 */
export default function SiteHeader({ nav, logo, contact }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Close the menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Hide the header once the footer reaches the upper part of the screen.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), {
      rootMargin: '0px 0px -40% 0px',
    });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        setHidden(y > 240 && y > lastY + 2);
        if (y < lastY - 2) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = 'hidden';
    window.__lenis?.stop();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = panel.querySelectorAll('[data-menu-item]');
    const tween = reduce
      ? null
      : gsap.fromTo(
          items,
          { yPercent: 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
        );
    panel.querySelector('a')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle?.focus();
      }
      if (e.key === 'Tab') {
        const focusables = [toggle, ...panel.querySelectorAll('a')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.__lenis?.start();
      document.removeEventListener('keydown', onKey);
      tween?.kill();
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${(hidden || atFooter) && !open ? styles.hidden : ''} ${scrolled ? styles.scrolled : ''} ${open ? styles.open : ''}`}
    >
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="Alaya Ecolodge — home">
          <img
            src={`${logo.src}-160.webp`}
            srcSet={`${logo.src}-160.webp 160w, ${logo.src}-320.webp 320w`}
            sizes="72px"
            width={logo.w}
            height={logo.h}
            alt=""
          />
          <span className={styles.brandText} aria-hidden="true">
            <span className={styles.brandName}>Alaya Ecolodge</span>
            <span className={styles.brandTag}>Pemuteran · Bali</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul role="list">
            {[{ label: 'Home', href: '/' }, ...nav].map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={styles.navLink} aria-current={active ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/about-us#contact" className={styles.cta}>
            Enquire
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={styles.toggleLabel}>{open ? 'Close' : 'Menu'}</span>
          <span className={styles.burger} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <nav aria-label="Mobile">
          <ul role="list" className={styles.mobileList}>
            {[{ label: 'Home', href: '/' }, ...nav].map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className={styles.mobileItem}>
                  <Link
                    href={item.href}
                    data-menu-item
                    className={styles.mobileLink}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={styles.mobileContact} data-menu-item>
          <a href={contact.phone.href}>{contact.phone.display}</a>
          <a href={contact.email.href}>{contact.email.display}</a>
          <a href={contact.instagram.href} target="_blank" rel="noopener noreferrer">
            Instagram {contact.instagram.handle}
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </header>
  );
}
