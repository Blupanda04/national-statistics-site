// Number and source formatting for IndoStats. Every figure on the site is
// shown with its source and year, so the helpers here keep that formatting
// in one place.

// Indonesian-style grouping: 281.603.800 for 281603800, 22.139 for 22139.
export function idNum(value, decimals = 0) {
  const fixed = Number(value).toFixed(decimals);
  const [whole, frac] = fixed.split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return frac === undefined ? grouped : `${grouped},${frac}`;
}

// Short form for chart labels: 281,6 jt / 22,1 rb triliun.
export function shortNum(value, unit) {
  if (unit === 'juta') return `${idNum(value / 1, 1)} jt`;
  if (unit === 'triliun') return `${idNum(value, 1)} rb T`;
  return idNum(value);
}

// One line under a figure: "Sumber: BPS, 2024" — the site's rule is that
// no figure appears without its source and year.
export function sourceLine(source, year) {
  return `Sumber: ${source}, ${year}`;
}

export function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
