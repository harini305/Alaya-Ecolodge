'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Arrow } from '@/components/ui/Button';
import styles from './Home.module.css';

function factsLine(f) {
  return [f.guests, f.area].filter(Boolean).join(' · ');
}

/**
 * Index of all 11 cottages linking into the accommodation selector.
 * Pointer devices get a live photo preview; touch devices get inline thumbs.
 * Cottages without photographs show a plain neutral panel, never a
 * borrowed image.
 */
export default function CottageIndex({ cottages }) {
  const [hover, setHover] = useState(cottages.findIndex((c) => c.thumb));
  const current = cottages[hover];

  return (
    <div className={styles.cottageIndex}>
      <ol role="list" className={styles.cottageList}>
        {cottages.map((c, i) => (
          <li key={c.slug}>
            <Link
              href={`/accommodation#${c.slug}`}
              className={styles.cottageRow}
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              aria-current={hover === i ? 'true' : undefined}
            >
              <span className={styles.cottageThumb} aria-hidden="true">
                {c.thumb ? (
                  <img src={`${c.thumb.src}-${c.thumb.widths[0]}.webp`} alt="" width={c.thumb.w} height={c.thumb.h} loading="lazy" decoding="async" />
                ) : (
                  <span className={styles.noThumb} />
                )}
              </span>
              <span className={styles.cottageName}>{c.name}</span>
              <span className={styles.cottageMeta}>
                <span>{c.type}</span>
                {factsLine(c.facts) && <span>{factsLine(c.facts)}</span>}
              </span>
              <Arrow className={styles.cottageArrow} />
            </Link>
          </li>
        ))}
      </ol>

      <div className={styles.cottagePreview} aria-hidden="true">
        <div className={styles.previewFrame}>
          {/* all previews are mounted once (lazy, preview-sized) and cross-faded,
              so hovering never waits on a network request */}
          {cottages.map((c, i) =>
            c.thumb ? (
              <img
                key={c.slug}
                className={`${styles.previewImg} ${hover === i ? styles.previewOn : ''}`}
                src={`${c.thumb.src}-480.webp`}
                srcSet={c.thumb.widths.filter((w) => w <= 960).map((w) => `${c.thumb.src}-${w}.webp ${w}w`).join(', ')}
                sizes="(min-width: 1440px) 440px, 30vw"
                width={c.thumb.w}
                height={c.thumb.h}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ) : null
          )}
          {current && !current.thumb && (
            <div className={styles.previewEmpty}>
              <span>Photographs of {current.name} are not yet available</span>
            </div>
          )}
        </div>
        {current && (
          <p className={styles.previewCaption}>
            <span>{current.name}</span>
            <span>{current.type}</span>
          </p>
        )}
      </div>
    </div>
  );
}
