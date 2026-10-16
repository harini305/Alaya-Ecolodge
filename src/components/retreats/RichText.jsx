/** Renders text segments [{ text, href? }] from the content files. */
export default function RichText({ segments }) {
  return segments.map((s, i) =>
    s.href ? (
      <a key={i} href={s.href} className="text-link" target="_blank" rel="noopener noreferrer">
        {s.text}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    ) : (
      <span key={i}>{s.text}</span>
    )
  );
}
