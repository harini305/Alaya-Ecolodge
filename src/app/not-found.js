import Link from 'next/link';
import site from '@/content/site.json';
import Button from '@/components/ui/Button';
import styles from './not-found.module.css';

export const metadata = {
  title: { absolute: 'Page not found | Alaya Ecolodge' },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`container ${styles.wrap}`} aria-labelledby="nf-title">
      <p className="eyebrow">404</p>
      <h1 id="nf-title" className={styles.title}>
        This path has wandered off
      </h1>
      <p className={styles.text}>The page you were looking for does not exist or has moved. These pages will lead you back:</p>
      <div className={styles.actions}>
        <Button href="/">Home</Button>
        <Button href="/about-us#contact" variant="outline">
          Contact Us
        </Button>
      </div>
      <nav aria-label="Site pages">
        <ul role="list" className={styles.links}>
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
