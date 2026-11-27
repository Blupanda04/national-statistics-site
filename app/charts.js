// Hand-drawn SVG charts for IndoStats — no library, so the first load
// stays small and every chart is plain SVG in the page. Both builders take
// an array of {label, value} and return an SVG string sized for the panel.

// A line chart with dots and value labels on the first and last points.
export function lineChart(points, opts = {}) {
  const width = opts.width ?? 960;
  const height = opts.height ?? 300;
  const padL = 64;
  const padR = 24;
  const padT = 26;
  const padB = 34;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  // Leave a quarter of the span below the lowest point, so the first
  // point never drops under the lowest gridline or hugs the bottom edge.
  const floor = min - span * 0.25;
  const ceil = max + span * 0.15;
  const x = (i) => padL + (i * (width - padL - padR)) / (points.length - 1);
  const y = (v) => padT + (1 - (v - floor) / (ceil - floor)) * (height - padT - padB);
  const fmt = opts.format ?? ((v) => String(v));

  const grid = [0.25, 0.5, 0.75].map((t) => {
    const gv = floor + (ceil - floor) * t;
    const gy = y(gv);
    return `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="#e3dcc8" stroke-width="1"/><text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="12" fill="#7a7566">${fmt(gv)}</text>`;
  }).join('');
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const dots = points.map((p, i) => `<circle cx="${x(i)}" cy="${y(p.value)}" r="4" fill="#0e4f4a" stroke="#fffdf7" stroke-width="2"/>`).join('');
  const labels = points.map((p, i) => `<text x="${x(i)}" y="${height - 10}" text-anchor="middle" font-size="12" fill="#4a5650">${p.label}</text>`).join('');
  const endLabel = `<text x="${x(points.length - 1)}" y="${y(points[points.length - 1].value) - 12}" text-anchor="end" font-size="13" font-weight="700" fill="#0e4f4a">${fmt(points[points.length - 1].value)}${opts.unit ? ' ' + opts.unit : ''}</text>`;
  const startLabel = `<text x="${x(0) + 12}" y="${y(points[0].value) - 14}" text-anchor="start" font-size="13" font-weight="700" fill="#0e4f4a">${fmt(points[0].value)}${opts.unit ? ' ' + opts.unit : ''}</text>`;
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${opts.aria ?? 'Grafik garis'}">${grid}<path d="${path}" fill="none" stroke="#0e4f4a" stroke-width="3" stroke-linejoin="round"/>${dots}${labels}${startLabel}${endLabel}</svg>`;
}

// A horizontal bar chart, longest bar first, with values at the end.
export function barChart(rows, opts = {}) {
  const width = opts.width ?? 960;
  const rowH = 34;
  const height = rows.length * rowH + 20;
  const padL = opts.labelWidth ?? 150;
  const padR = 90;
  const max = Math.max(...rows.map((r) => r.value));
  const fmt = opts.format ?? ((v) => String(v));
  const body = rows.map((r, i) => {
    const y = 10 + i * rowH;
    const w = Math.max(2, ((width - padL - padR) * r.value) / max);
    return `<text x="${padL - 10}" y="${y + 16}" text-anchor="end" font-size="13" fill="#1c2420">${r.label}</text><rect x="${padL}" y="${y}" width="${w.toFixed(1)}" height="20" rx="4" fill="${r.color ?? '#e8a33d'}"/><text x="${padL + w + 8}" y="${y + 16}" font-size="13" font-weight="700" fill="#0e4f4a">${fmt(r.value)}${opts.unit ? ' ' + opts.unit : ''}</text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${opts.aria ?? 'Grafik batang'}">${body}</svg>`;
}

// A vertical bar chart for year-by-year series (growth, inflation).
export function columnChart(points, opts = {}) {
  const width = opts.width ?? 960;
  const height = opts.height ?? 280;
  const padL = 56;
  const padR = 16;
  const padT = 26;
  const padB = 30;
  const values = points.map((p) => p.value);
  const lo = Math.min(0, ...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  const y = (v) => padT + (1 - (v - lo) / span) * (height - padT - padB);
  const fmt = opts.format ?? ((v) => String(v));
  const slot = (width - padL - padR) / points.length;
  const zero = y(0);
  const bars = points.map((p, i) => {
    const bx = padL + i * slot + slot * 0.18;
    const bw = slot * 0.64;
    const by = p.value >= 0 ? y(p.value) : zero;
    const bh = Math.abs(y(p.value) - zero);
    const fill = p.value >= 0 ? '#0e4f4a' : '#b3372a';
    return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(2, bh).toFixed(1)}" rx="3" fill="${fill}"/><text x="${(bx + bw / 2).toFixed(1)}" y="${(by - 6).toFixed(1)}" text-anchor="middle" font-size="12.5" font-weight="700" fill="#0e4f4a">${fmt(p.value)}</text><text x="${(bx + bw / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" font-size="12" fill="#4a5650">${p.label}</text>`;
  }).join('');
  const zeroLine = lo < 0 ? `<line x1="${padL}" y1="${zero}" x2="${width - padR}" y2="${zero}" stroke="#1c2420" stroke-width="1"/>` : '';
  return `<svg class="chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${opts.aria ?? 'Grafik kolom'}">${zeroLine}${bars}</svg>`;
}
