import site from '@/content/site.json';

/** Per-route metadata built from the original page titles/descriptions. */
export function pageMetadata({ title, description, path, og }) {
  const url = path === '/' ? '/' : path;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en',
      images: [{ url: `/media/og/${og}.jpg`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`/media/og/${og}.jpg`] },
  };
}
