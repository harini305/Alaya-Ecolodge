import content from '@/content/retreats.json';
import { media } from '@/lib/media';
import { pageMetadata } from '@/lib/seo';
import { groupProgrammes } from '@/lib/retreats';
import PageHero from '@/components/sections/PageHero';
import ClosingImage from '@/components/sections/ClosingImage';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import ProgrammeEntry from '@/components/retreats/ProgrammeEntry';
import PastPanel from '@/components/retreats/PastPanel';
import styles from '@/components/retreats/Retreats.module.css';

// Status (upcoming / happening now / ended) is date-based: re-render daily.
export const revalidate = 86400;

export const metadata = pageMetadata({ ...content.meta, path: '/retreats', og: 'retreats' });

const resolve = (p) => ({
  ...p,
  images: p.images.map((img) => ({ m: media(img.id), alt: img.alt })),
  partnerLogo: p.partnerLogo ? { m: media(p.partnerLogo.id), alt: p.partnerLogo.alt } : null,
});

export default function RetreatsPage() {
  const groups = groupProgrammes(content.programmes);
  const tabsDef = [
    { id: 'upcoming', label: 'Upcoming', items: groups.open },
    { id: 'tbc', label: 'Dates to be confirmed', items: groups.unconfirmed },
    { id: 'ended', label: 'Recently ended', items: groups.ended },
  ].filter((t) => t.items.length);

  const pastItems = content.past.map((p) => ({
    ...p,
    images: p.images.map((img) => ({ m: media(img.id), alt: img.alt })),
  }));

  return (
    <>
      <PageHero title="Retreats" lead={content.meta.description} m={media(content.hero.image)} alt={content.hero.alt} focal={content.hero.focal} />

      {/* Intro */}
      <section className={`container ${styles.intro}`} aria-labelledby="oasis-title">
        <SectionHeading id="oasis-title" title={content.intro.heading} script align="center" />
        <p className={styles.introText} data-reveal>
          {content.intro.text}
        </p>
      </section>

      {/* Two paths */}
      <section className={`container ${styles.paths}`} aria-label="Ways to take part">
        {content.paths.map((path) => (
          <article key={path.key} className={`${styles.path} ${styles[`path_${path.key}`]}`} data-reveal>
            <h2 className={styles.pathTitle}>{path.title}</h2>
            <p>{path.text}</p>
            <div>
              <Button href={path.cta.href} variant="outline" icon={path.cta.icon}>
                {path.cta.label}
              </Button>
            </div>
          </article>
        ))}
      </section>

      {/* Programmes */}
      <section id="programmes" className={styles.programmes} aria-labelledby="programmes-title">
        <div className={`container ${styles.programmesInner}`}>
          <div className={styles.programmesHead}>
            <SectionHeading id="programmes-title" title={content.programmesHeading[0]} sub={content.programmesHeading[1]} script />
          </div>
          <Tabs
            idBase="programmes"
            label="Programmes by date"
            tabs={tabsDef.map((t) => ({ id: t.id, label: t.label }))}
            panels={tabsDef.map((t) => (
              <div key={t.id} className={styles.entries}>
                {t.items.map((p, i) => (
                  <ProgrammeEntry key={p.slug} p={resolve(p)} labels={content.detailLabels} flip={i % 2 === 1} />
                ))}
              </div>
            ))}
          />
        </div>
      </section>

      {/* Past */}
      <section id="past" className={`container ${styles.pastSection}`} aria-labelledby="past-title">
        <SectionHeading id="past-title" title={content.pastHeading} sub={content.pastSubheading} script />
        <Tabs
          idBase="past"
          variant="rail"
          label="Past retreats"
          tabs={pastItems.map((p) => ({ id: p.slug, label: p.tab }))}
          panels={pastItems.map((p) => (
            <PastPanel key={p.slug} item={p} />
          ))}
        />
      </section>

      <ClosingImage m={media(content.closing.image)} alt={content.closing.alt} next={{ href: "/activities", label: "Activities" }} />
    </>
  );
}
