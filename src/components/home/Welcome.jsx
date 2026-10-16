import SectionHeading from '@/components/ui/SectionHeading';
import styles from './Home.module.css';

/**
 * Heading + lead on one row, the three intro paragraphs as a balanced
 * three-column band, then the closing line in a framed band.
 */
export default function Welcome({ welcome }) {
  return (
    <section id="welcome" className={`container ${styles.welcome}`} aria-labelledby="welcome-title">
      <div className={styles.welcomeHead}>
        <SectionHeading id="welcome-title" title={welcome.heading} script />
        <p className={styles.welcomeLead} data-reveal>
          {welcome.lead}
        </p>
      </div>
      <div className={styles.welcomeBody}>
        {welcome.paragraphs.map((p, i) => (
          <p key={i} data-reveal className={i === 0 ? styles.dropcap : undefined}>
            {p}
          </p>
        ))}
      </div>
      <div className={styles.welcomeClosing}>
        <p data-reveal>{welcome.closing}</p>
      </div>
    </section>
  );
}
