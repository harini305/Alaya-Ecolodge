import Link from 'next/link';
import Img from '@/components/ui/Img';
import Button, { Arrow } from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import { STATUS_LABEL } from '@/lib/retreats';
import styles from './Home.module.css';

const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' });
const parse = (iso) => new Date(`${iso}T00:00:00Z`);

/** Date block from the confirmed ISO dates: "4–18" / "Oct 2026", or "30 May–8 Jun" / "2027". */
function dateParts(start, end) {
  const s = parse(start);
  const e = parse(end);
  const year = e.getUTCFullYear();
  if (s.getUTCMonth() === e.getUTCMonth()) {
    return { days: `${s.getUTCDate()}–${e.getUTCDate()}`, month: `${MONTH.format(s)} ${year}` };
  }
  return {
    days: `${s.getUTCDate()}–${e.getUTCDate()}`,
    month: `${MONTH.format(s)}–${MONTH.format(e)} ${year}`,
  };
}

/** Next dated programmes as a schedule (confirmed dates only). */
export default function RetreatPreview({ heading, labels, items }) {
  if (!items.length) return null;

  return (
    <section className={`container ${styles.retreats}`} aria-labelledby="home-retreats-title">
      <div className={styles.retreatsGrid}>
        <div className={styles.retreatsSide}>
          <SectionHeading id="home-retreats-title" title={heading[0]} sub={heading[1]} script />
          <div data-reveal>
            <Button href="/retreats#programmes" variant="outline">
              {heading[1]}
            </Button>
          </div>
        </div>

        <ul role="list" className={styles.schedule}>
          {items.map((p) => {
            const d = dateParts(p.start, p.end);
            return (
              <li key={p.slug} data-reveal>
                <Link href={`/retreats#${p.slug}`} className={styles.slot}>
                  <span className={styles.dateBlock} aria-label={p.dates}>
                    <span className={styles.dateDays} aria-hidden="true">
                      {d.days}
                    </span>
                    <span className={styles.dateMonth} aria-hidden="true">
                      {d.month}
                    </span>
                  </span>
                  <span className={styles.slotImg}>
                    <Img m={p.cover} alt="" sizes="170px" fallbackWidth={240} />
                  </span>
                  <span className={styles.slotText}>
                    <span className={`${styles.status} ${styles[`status_${p.status}`] ?? ''}`}>
                      {STATUS_LABEL[p.status]}
                    </span>
                    <span className={styles.slotTitle}>{p.title}</span>
                    <span className={styles.slotMeta}>
                      <span>
                        {labels.groupSize}: {p.groupSize}
                      </span>
                    </span>
                  </span>
                  <Arrow className={styles.slotArrow} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
