import Img from '@/components/ui/Img';
import RichText from './RichText';
import styles from './Retreats.module.css';

export default function PastPanel({ item }) {
  return (
    <div className={styles.past}>
      <div className={styles.pastText}>
        <p className="eyebrow">{item.when}</p>
        <h3 className={styles.pastTitle}>{item.tab}</h3>
        <div className="prose">
          {item.paragraphs.map((segs, i) => (
            <p key={i}>
              <RichText segments={segs} />
            </p>
          ))}
        </div>
      </div>
      <div className={styles.pastGrid}>
        {item.images.map((img, i) => (
          <div key={img.m.src} className={`${styles.pastImg} ${styles[`p${i}`]}`} data-tab-anim>
            <Img m={img.m} alt={img.alt} sizes={i === 0 ? '(min-width: 900px) 34vw, 100vw' : '(min-width: 900px) 17vw, 50vw'} />
          </div>
        ))}
      </div>
    </div>
  );
}
