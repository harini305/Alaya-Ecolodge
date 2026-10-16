/**
 * Centre `el` inside its horizontally scrolling container WITHOUT moving the
 * page. (Element.scrollIntoView also scrolls the window vertically, which made
 * the accommodation page jump on load.)
 */
export function centerInScroller(el, { smooth = true } = {}) {
  if (!el) return;
  let c = el.parentElement;
  while (c && c !== document.body) {
    const { overflowX } = getComputedStyle(c);
    if ((overflowX === 'auto' || overflowX === 'scroll') && c.scrollWidth > c.clientWidth) break;
    c = c.parentElement;
  }
  if (!c || c === document.body) return;
  const er = el.getBoundingClientRect();
  const cr = c.getBoundingClientRect();
  const left = c.scrollLeft + (er.left - cr.left) - (c.clientWidth - er.width) / 2;
  c.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
}
