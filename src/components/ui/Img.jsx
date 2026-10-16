/**
 * Responsive <img> for pre-generated WebP derivatives.
 * `m` is a resolved media object ({ src, w, h, widths }) from lib/media.
 * Width/height attributes reserve the aspect ratio (no layout shift).
 */
export default function Img({
  m,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  style,
  focal,
  fallbackWidth = 960,
  ...rest
}) {
  const srcSet = m.widths.map((w) => `${m.src}-${w}.webp ${w}w`).join(', ');
  const fallback = m.widths.find((w) => w >= fallbackWidth) ?? m.widths[m.widths.length - 1];
  return (
    <img
      src={`${m.src}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      // No fetchPriority="high": React hoists eager images into <link rel=preload>
      // hints, and Next applies the hints of every *prefetched* route, which
      // made each page download all other pages' heroes. Heroes are therefore
      // also wrapped in <picture>, which React does not hoist.
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={focal ? { objectPosition: focal, ...style } : style}
      {...rest}
    />
  );
}
