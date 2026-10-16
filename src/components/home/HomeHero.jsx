import Img from '@/components/ui/Img';
import styles from './Home.module.css';

export default function HomeHero({ hero, m, wide }) {
  return (
    <section className={styles.hero} data-hero aria-labelledby="home-title">
      <div className={styles.heroMedia} data-hero-media>
        {/* Landscape screens get a 16:10 crop of the portrait original. */}
        <picture>
          <source
            media="(min-aspect-ratio: 1/1)"
            srcSet={wide.widths.map((w) => `${wide.src}-${w}.webp ${w}w`).join(', ')}
            sizes="100vw"
            width={wide.w}
            height={wide.h}
          />
          <Img m={m} alt={hero.alt} sizes="100vw" priority focal={hero.focal} fallbackWidth={1024} />
        </picture>
      </div>
      <div className={styles.heroShade} aria-hidden="true" />

      <div className={`container ${styles.heroInner}`}>
        <h1 id="home-title" className={styles.heroTitle}>
          {/* No overflow mask here: Charmonman's loops extend past the line box,
              so a clipping mask cut off letter tops/tails. Fade-and-rise only. */}
          <span className={styles.heroLine} data-hero-line>
            <span className={styles.heroScript}>{hero.script}</span>
          </span>
          <span className={`${styles.heroLine} ${styles.heroWordMask}`} data-hero-line>
            <span className={styles.heroWord}>{hero.word}</span>
          </span>
        </h1>

        <div className={styles.heroFoot}>
          <p className={styles.heroTagline}>
            <span className="line-mask" data-hero-line>
              <span>{hero.tagline}</span>
            </span>
          </p>
          <a href="#welcome" className={styles.heroCue}>
            <span className="line-mask" data-hero-line>
              <span>Scroll</span>
            </span>
            <span className={styles.heroCueLine} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
