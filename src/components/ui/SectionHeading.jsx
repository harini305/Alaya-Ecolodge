import styles from './SectionHeading.module.css';

/**
 * Splits a heading into masked words so PageMotion can stagger them in.
 * The words remain ordinary text for screen readers and when motion is off.
 */
export function Words({ text }) {
  return text.split(/(\s+)/).map((part, i) =>
    /^\s+$/.test(part) ? (
      part
    ) : (
      <span key={i} className={styles.mask}>
        <span className="word" data-word>
          {part}
        </span>
      </span>
    )
  );
}

export default function SectionHeading({
  as: Tag = 'h2',
  title,
  sub,
  script = false,
  eyebrow,
  align = 'start',
  tone,
  className = '',
  id,
}) {
  return (
    <div className={`${styles.wrap} ${styles[align]} ${tone ? styles[tone] : ''} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${styles.eyebrow}`} data-reveal>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={script ? styles.script : styles.serif} data-words>
        <Words text={title} />
        {sub && (
          <span className={styles.sub}>
            <Words text={sub} />
          </span>
        )}
      </Tag>
    </div>
  );
}
