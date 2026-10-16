import Img from '@/components/ui/Img';
import styles from './PageHero.module.css';

/**
 * Inner-page hero, split layout: H1 + the page's original
 * description (verbatim source copy) beside the page photo in an arched frame
 * (a nod to Balinese gateways). No text sits on the photo.
 */
export default function PageHero({ title, lead, m, alt, focal }) {
  return (
    <section className={`container ${styles.hero}`} data-hero aria-labelledby="page-title">
      <div className={styles.text}>
        <h1 id="page-title" className={styles.title} style={{ '--chars': title.length }}>
          <span className="line-mask" data-hero-line>
            <span>{title}</span>
          </span>
        </h1>
        {lead && (
          <p className={styles.lead}>
            <span className="line-mask" data-hero-line>
              <span>{lead}</span>
            </span>
          </p>
        )}
      </div>

      <div className={styles.frame}>
        <div className={styles.media} data-hero-media>
          {/* <picture> stops React hoisting this eager image into a preload
              hint, which Next would otherwise apply on every page that
              prefetches this route. */}
          <picture>
            <Img m={m} alt={alt} sizes="(min-width: 900px) 58vw, 100vw" priority focal={focal} fallbackWidth={1600} />
          </picture>
        </div>
      </div>
    </section>
  );
}
