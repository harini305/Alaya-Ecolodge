import registry from '@/content/media.json';

/**
 * Resolve a Wix media-id (the stable key used in all content files) to its
 * pre-generated WebP derivative set. Server-side only: client components
 * receive already-resolved objects so the registry never ships to the browser.
 */
export function media(id) {
  const m = registry[id];
  if (!m) throw new Error(`Unknown media id: ${id}`);
  return { src: m.src, w: m.w, h: m.h, widths: m.widths };
}

/** Single derivative URL, closest to (but not below) the wanted width. */
export function mediaUrl(id, want = 1600) {
  const m = media(id);
  const w = m.widths.find((x) => x >= want) ?? m.widths[m.widths.length - 1];
  return `${m.src}-${w}.webp`;
}
