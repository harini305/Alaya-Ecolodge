import content from '@/content/accommodation.json';
import site from '@/content/site.json';
import { media } from '@/lib/media';
import { pageMetadata } from '@/lib/seo';
import PageHero from '@/components/sections/PageHero';
import ClosingImage from '@/components/sections/ClosingImage';
import SectionHeading from '@/components/ui/SectionHeading';
import Img from '@/components/ui/Img';
import CottageSelector from '@/components/accommodation/CottageSelector';
import styles from './page.module.css';

export const metadata = pageMetadata({ ...content.meta, path: '/accommodation', og: 'accommodation' });

export default function AccommodationPage() {
  const { intro, amenities } = content;
  // Resolve images server-side; the client selector never sees the registry.
  const cottages = content.cottages.map((c) => ({
    slug: c.slug,
    name: c.name,
    type: c.type,
    description: c.description,
    facts: c.facts,
    offers: c.offers,
    images: c.images.map((img) => ({ m: media(img.id), alt: img.alt })),
  }));
  const defaultSlug = content.cottages.find((c) => c.images.length)?.slug;

  return (
    <>
      <PageHero title="Accommodation" lead={content.meta.description} m={media(content.hero.image)} alt={content.hero.alt} focal={content.hero.focal} />

      {/* Intro */}
      <section className={`container ${styles.intro}`} aria-labelledby="stay-title">
        <div className={styles.introText}>
          <SectionHeading id="stay-title" title={intro.heading} script />
          <div className="prose">
            {intro.paragraphs.slice(0, 3).map((p, i) => (
              <p key={i} data-reveal className={i === 2 ? styles.whisper : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.introImages}>
          {intro.images.map((img, i) => (
            <figure key={img.id} className={`${styles.introFig} ${styles[`fig${i}`]}`}>
              <div className={styles.introFrame} data-reveal-image>
                <Img m={media(img.id)} alt={img.alt} sizes="(min-width: 900px) 26vw, 50vw" />
              </div>
              <figcaption data-reveal>{img.caption}</figcaption>
            </figure>
          ))}
        </div>

        <p className={styles.tumpeng} data-reveal>
          {intro.paragraphs[3]}
        </p>
      </section>

      {/* Cottages */}
      <section id="cottages" className={`container ${styles.cottages}`} aria-labelledby="cottages-title">
        <div className={styles.cottagesHead}>
          <SectionHeading id="cottages-title" title={content.cottagesHeading} script />
          <p data-reveal className={styles.cottagesNote}>
            {cottages.length} cottages · select one to see its photographs and details
          </p>
        </div>
        <CottageSelector cottages={cottages} defaultSlug={defaultSlug} booking={site.booking} />
      </section>

      {/* Amenities */}
      <section className={`container ${styles.amenities}`} aria-labelledby="amenities-title">
        <SectionHeading id="amenities-title" title={amenities.heading} script />
        <div className={styles.amenityCols}>
          <div className={styles.amenityGroup} data-reveal>
            <h3 className={styles.amenityTitle}>{amenities.complementaryHeading}</h3>
            <div className={styles.amenityGrid}>
              {amenities.complementary.map((group, g) => (
                <ul role="list" key={g}>
                  {group.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <div className={`${styles.amenityGroup} ${styles.charge}`} data-reveal>
            <h3 className={styles.amenityTitle}>{amenities.additionalChargeHeading}</h3>
            <ul role="list">
              {amenities.additionalCharge.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ClosingImage m={media(content.closing.image)} alt={content.closing.alt} next={{ href: "/retreats", label: "Retreats" }} />
    </>
  );
}
