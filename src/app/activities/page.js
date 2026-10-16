import content from '@/content/activities.json';
import { media } from '@/lib/media';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import ClosingImage from '@/components/sections/ClosingImage';
import SectionHeading from '@/components/ui/SectionHeading';
import Img from '@/components/ui/Img';
import styles from './page.module.css';

export const metadata = pageMetadata({ ...content.meta, path: '/activities', og: 'activities' });

function Subtitle({ lines }) {
  return lines.map((line, i) => (
    <span key={i} className={styles.subLine}>
      {line}
    </span>
  ));
}

export default function ActivitiesPage() {
  const { atAlaya, nearAlaya } = content;
  return (
    <>
      <PageHero title="Activities" lead={content.meta.description} m={media(content.hero.image)} alt={content.hero.alt} focal={content.hero.focal} />

      <section className={`container ${styles.intro}`} aria-labelledby="explore-title">
        <SectionHeading id="explore-title" title={content.intro.heading} script />
        <p className={styles.introText} data-reveal>
          {content.intro.text}
        </p>
      </section>

      {/* At Alaya: gap-free bento grid, captions overlaid on the photos */}
      <section className={`container ${styles.at}`} aria-labelledby="at-title">
        <div className={styles.sectionHead}>
          <SectionHeading id="at-title" title={atAlaya.heading} script />
        </div>
        <ul role="list" className={styles.bento}>
          {atAlaya.items.map((item, i) => (
            <li key={item.title} className={`${styles.tile} ${styles[`b${i}`]}`} data-reveal>
              <Img m={media(item.image)} alt={item.alt} sizes={i === 0 ? '(min-width: 900px) 50vw, 100vw' : '(min-width: 900px) 25vw, 50vw'} />
              <div className={styles.tileText}>
                <h3 className={styles.tileTitle}>{item.title}</h3>
                <p className={styles.tileSub}>
                  <Subtitle lines={item.subtitle} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Near Alaya: 4-column card grid on a dark band (several source images are small) */}
      <section className={styles.near} aria-labelledby="near-title">
        <div className="container">
          <div className={styles.sectionHead}>
            <SectionHeading id="near-title" title={nearAlaya.heading} script tone="dark" />
          </div>
          <ul role="list" className={styles.nearList}>
            {nearAlaya.items.map((item, i) => (
              <li key={item.title} className={styles.nearItem} data-reveal>
                <div className={`${styles.nearImg} ${item.graphic ? styles.graphic : ''}`}>
                  <Img m={media(item.image)} alt={item.alt} sizes="(min-width: 900px) 25vw, 50vw" fallbackWidth={480} />
                </div>
                <div>
                  <h3 className={styles.nearTitle}>{item.title}</h3>
                  <p className={styles.nearSub}>
                    <Subtitle lines={item.subtitle} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingImage m={media(content.closing.image)} alt={content.closing.alt} next={{ href: "/about-us", label: "About Us" }} />

    </>
  );
}
