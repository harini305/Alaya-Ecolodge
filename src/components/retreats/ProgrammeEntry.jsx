import Img from '@/components/ui/Img';
import Button from '@/components/ui/Button';
import { STATUS_LABEL } from '@/lib/retreats';
import RichText from './RichText';
import styles from './Retreats.module.css';

/**
 * One programme. Status is computed from confirmed dates; when dates are not
 * reliable the date row says "To be confirmed" instead of repeating them.
 */
export default function ProgrammeEntry({ p, labels, flip }) {
  const datesValue = p.status === 'unconfirmed' ? 'To be confirmed' : p.dates;
  return (
    <article id={p.slug} className={`${styles.entry} ${flip ? styles.flip : ''}`} aria-labelledby={`${p.slug}-title`}>
      <div className={styles.mosaic}>
        {p.images.map((img, i) => (
          <div key={img.m.src} className={`${styles.tile} ${styles[`t${i}`]}`} data-tab-anim>
            <Img m={img.m} alt={img.alt} sizes={i === 0 ? '(min-width: 900px) 30vw, 100vw' : '(min-width: 900px) 15vw, 50vw'} />
          </div>
        ))}
      </div>

      <div className={styles.entryBody}>
        <p className={styles.entryMeta}>
          <span className={`${styles.status} ${styles[`s_${p.status}`]}`}>{STATUS_LABEL[p.status]}</span>
        </p>
        <div className={styles.entryTitleRow}>
          <h3 id={`${p.slug}-title`} className={styles.entryTitle}>
            {p.title}
          </h3>
          {p.partnerLogo && (
            <span className={styles.partner}>
              <Img m={p.partnerLogo.m} alt={p.partnerLogo.alt} sizes="120px" fallbackWidth={320} />
            </span>
          )}
        </div>

        <dl className={styles.detailsTable}>
          <div>
            <dt>{labels.dates}</dt>
            <dd className={p.status === 'unconfirmed' ? styles.tbc : undefined}>{datesValue}</dd>
          </div>
          <div>
            <dt>{labels.groupSize}</dt>
            <dd>{p.groupSize}</dd>
          </div>
          <div>
            <dt>{labels.accommodation}</dt>
            <dd>{p.accommodation}</dd>
          </div>
          <div>
            <dt>{labels.food}</dt>
            <dd>{p.food}</dd>
          </div>
        </dl>

        <p className={styles.entryText}>
          <RichText segments={p.description} />
        </p>

        {p.note && <p className={styles.note}>{p.note}</p>}

        <div>
          <Button href={p.cta.href} variant="outline" aria-label={`${p.cta.label}: ${p.title}`}>
            {p.cta.label}
          </Button>
        </div>
      </div>
    </article>
  );
}
