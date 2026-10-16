import Link from 'next/link';
import Img from '@/components/ui/Img';
import { Arrow } from '@/components/ui/Button';
import styles from './ClosingImage.module.css';

/**
 * Each page's original closing photograph. With `next`, it doubles as the
 * "Continue to" wayfinding (overlaid), so no separate near-empty strip.
 */
export default function ClosingImage({ m, alt, next }) {
  return (
    <figure className={`container ${styles.wrap}`} data-closing>
      <div className={styles.frame} data-reveal-image style={{ aspectRatio: `${m.w} / ${m.h}` }}>
        <Img m={m} alt={alt} sizes="(min-width: 1440px) 1360px, 100vw" fallbackWidth={1600} />
        {next && (
          <>
            <div className={styles.shade} aria-hidden="true" />
            <Link href={next.href} className={styles.next}>
              <span className={styles.nextKicker}>Continue to</span>
              <span className={styles.nextLabel}>
                {next.label}
                <Arrow className={styles.nextArrow} />
              </span>
            </Link>
          </>
        )}
      </div>
    </figure>
  );
}
