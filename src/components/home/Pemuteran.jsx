import Img from '@/components/ui/Img';
import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Home.module.css';

/** Destination section: circular photo beside the About Pemuteran Town copy. */
export default function Pemuteran({ pemuteran, m }) {
  const paras = pemuteran.paragraphs;
  const last = paras[paras.length - 1];
  return (
    <section className={styles.pemuteran} aria-labelledby="pemuteran-title">
      <div className={`container ${styles.pemInner}`}>
        <div className={styles.pemVisual}>
          <div className={styles.pemCircle} data-reveal-image>
            <Img m={m} alt="Sunset over the hills near Alaya" sizes="(min-width: 900px) 30vw, 70vw" />
          </div>
        </div>

        <div className={styles.pemText}>
          <SectionHeading id="pemuteran-title" title={pemuteran.heading} tone="dark" />
          <div className={styles.pemBody}>
            {paras.slice(0, -1).map((p, i) => (
              <p key={i} data-reveal>
                {p.split('\n').map((line, j) => (
                  <span key={j} className={styles.pemLine}>
                    {line}
                  </span>
                ))}
              </p>
            ))}
          </div>
          <p className={styles.pemQuote} data-reveal>
            {last}
          </p>
        </div>
      </div>
    </section>
  );
}
