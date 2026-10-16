import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Home.module.css';

/**
 * "Experience Alaya": the three offerings as equal cards side by side.
 * Each card: one large photo, the other two as a tidy pair, then copy + link.
 * No overlapping collages, no numbering.
 */
export default function Experience({ experience, images }) {
  return (
    <section className={`container ${styles.experience}`} aria-labelledby="experience-title">
      <SectionHeading id="experience-title" title={experience.heading} script />

      <div className={styles.expGrid}>
        {experience.rows.map((row, r) => (
          <article key={row.key} className={styles.expCard} aria-labelledby={`exp-${row.key}`}>
            <div className={styles.expPhotos}>
              {row.images.map((img, i) => (
                <div key={img.id} className={i === 0 ? styles.expMain : styles.expSmall} data-reveal-image>
                  <Img
                    m={images[r][i]}
                    alt={img.alt}
                    sizes={i === 0 ? '(min-width: 1000px) 30vw, (min-width: 700px) 50vw, 100vw' : '(min-width: 1000px) 15vw, 50vw'}
                  />
                </div>
              ))}
            </div>

            <div className={styles.expText}>
              <h3 id={`exp-${row.key}`} className={styles.expTitle} data-reveal>
                {row.title}
              </h3>
              <p className={styles.expBody} data-reveal>
                {row.text}
              </p>
              <div className={styles.expAction} data-reveal>
                <Button href={row.cta.href} aria-label={`${row.cta.label}: ${row.title}`}>
                  {row.cta.label}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
