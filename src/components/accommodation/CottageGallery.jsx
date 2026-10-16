'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Arrow } from '@/components/ui/Button';
import { centerInScroller } from '@/lib/scroll';
import styles from './Cottages.module.css';

const srcSet = (m) => m.widths.map((w) => `${m.src}-${w}.webp ${w}w`).join(', ');
const pick = (m, want) => `${m.src}-${m.widths.find((w) => w >= want) ?? m.widths[m.widths.length - 1]}.webp`;

/**
 * Gallery for one cottage: stage + prev/next + thumbnails + full-screen
 * lightbox (<dialog>). Keyboard: arrows on the stage/lightbox, Esc closes.
 * Touch: horizontal swipe. Only the active cottage's gallery is mounted, and
 * thumbnails are small (480w) lazy images.
 */
export default function CottageGallery({ name, images }) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const stageImg = useRef(null);
  const dialogRef = useRef(null);
  const thumbsRef = useRef(null);
  const swipe = useRef(null);
  const swiped = useRef(false);
  const count = images.length;

  useGSAP(
    () => {
      if (!stageImg.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo(stageImg.current, { opacity: 0, scale: 1.04 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' });
    },
    { dependencies: [index] }
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (lightbox && !d.open) d.showModal();
    if (!lightbox && d.open) d.close();
  }, [lightbox]);

  // warm the cache for the neighbouring photos so Next/Previous feel instant
  useEffect(() => {
    if (images.length < 2) return;
    [1, -1].forEach((d) => {
      const n = images[(index + d + images.length) % images.length];
      const pre = new Image();
      pre.decoding = 'async';
      pre.sizes = '(min-width: 1100px) 760px, 100vw';
      pre.srcset = srcSet(n.m);
      pre.src = pick(n.m, 960);
    });
  }, [index, images]);

  // keep the active thumbnail visible in its strip (never scrolls the page)
  useEffect(() => {
    centerInScroller(thumbsRef.current?.querySelector('[aria-current="true"]'));
  }, [index]);

  if (!count) {
    return (
      <div className={styles.empty}>
        <p>Photographs of {name} are not yet available.</p>
      </div>
    );
  }

  const go = (d) => setIndex((i) => (i + d + count) % count);
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };
  const onPointerDown = (e) => { swipe.current = e.clientX; };
  const onPointerUp = (e) => {
    if (swipe.current == null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 40) {
      swiped.current = true; // suppress the click that follows a swipe
      go(dx < 0 ? 1 : -1);
    }
  };
  const current = images[index];

  return (
    <div className={styles.gallery} role="region" aria-roledescription="gallery" aria-label={`${name} photos`}>
      <div className={styles.stage} onKeyDown={onKey} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        <button
          type="button"
          className={styles.stageBtn}
          onClick={() => {
            if (swiped.current) {
              swiped.current = false;
              return;
            }
            setLightbox(true);
          }}
          aria-label={`Open photo ${index + 1} of ${count} full screen: ${current.alt}`}
        >
          <img
            ref={stageImg}
            key={current.m.src}
            src={pick(current.m, 960)}
            srcSet={srcSet(current.m)}
            sizes="(min-width: 1100px) 760px, 100vw"
            width={current.m.w}
            height={current.m.h}
            alt={current.alt}
            decoding="async"
            draggable="false"
          />
        </button>
        {count > 1 && (
          <>
            <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous photo">
              <Arrow dir="left" className={styles.navIcon} />
            </button>
            <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)} aria-label="Next photo">
              <Arrow dir="right" className={styles.navIcon} />
            </button>
          </>
        )}
        <p className={styles.counter} aria-live="polite">
          <span className="visually-hidden">Photo </span>
          {index + 1} / {count}
        </p>
      </div>

      {count > 1 && (
        <ul role="list" className={styles.thumbs} ref={thumbsRef}>
          {images.map((img, i) => (
            <li key={img.m.src}>
              <button
                type="button"
                className={styles.thumb}
                aria-current={i === index ? 'true' : undefined}
                aria-label={`Show photo ${i + 1} of ${count}`}
                onClick={() => setIndex(i)}
              >
                <img src={pick(img.m, 240)} width={img.m.w} height={img.m.h} alt="" loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label={`${name} photos, full screen`}
        onClose={() => setLightbox(false)}
        onKeyDown={onKey}
        onClick={(e) => e.target === dialogRef.current && setLightbox(false)}
      >
        {lightbox && (
          <figure className={styles.lbFigure} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
            <img
              src={pick(current.m, 1600)}
              srcSet={srcSet(current.m)}
              sizes="100vw"
              width={current.m.w}
              height={current.m.h}
              alt={current.alt}
              draggable="false"
            />
            <figcaption>
              {name} · {index + 1} / {count}
            </figcaption>
          </figure>
        )}
        <button type="button" className={styles.lbClose} onClick={() => setLightbox(false)} autoFocus>
          Close
        </button>
        {count > 1 && (
          <>
            <button type="button" className={`${styles.nav} ${styles.prev} ${styles.lbNav}`} onClick={() => go(-1)} aria-label="Previous photo">
              <Arrow dir="left" className={styles.navIcon} />
            </button>
            <button type="button" className={`${styles.nav} ${styles.next} ${styles.lbNav}`} onClick={() => go(1)} aria-label="Next photo">
              <Arrow dir="right" className={styles.navIcon} />
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}
