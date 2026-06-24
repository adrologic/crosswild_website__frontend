// Convert CMS rich-text / HTML into clean plain text for previews, card snippets
// and meta descriptions. Strips HTML tags AND decodes common HTML entities
// (e.g. &nbsp;, &amp;, &#39;) so raw markup never leaks into the UI.
//
// Use this anywhere an HTML field (product.description, blog excerpt, category
// description, etc.) is shown as plain text. For full rich formatting, keep
// using dangerouslySetInnerHTML with the `.rich-text` class instead.

const NAMED_ENTITIES: Record<string, string> = {
  nbsp: ' ',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  rsquo: '’',
  lsquo: '‘',
  rdquo: '”',
  ldquo: '“',
  mdash: '—',
  ndash: '–',
  hellip: '…',
  copy: '©',
  reg: '®',
  trade: '™',
  deg: '°',
};

export function toPlainText(input?: string | null): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, ' ') // strip HTML tags
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16))) // hex entities
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec))) // numeric entities
    .replace(/&([a-zA-Z][a-zA-Z0-9]*);/g, (whole, name) => {
      const key = String(name).toLowerCase();
      return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, key) ? NAMED_ENTITIES[key] : ' ';
    }) // named entities (unknown -> space, collapsed below)
    .replace(/\s+/g, ' ')
    .trim();
}
