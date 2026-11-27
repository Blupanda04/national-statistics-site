// Page templates for IndoStats. Each render function returns the HTML for
// one hash route; app.js drops it into #view and wires the controls. All
// figures come from data.js, so a number is never typed twice.

import { idNum, sourceLine, esc } from './format.js';
import { lineChart, barChart, columnChart } from './charts.js';
import {
  INDICATORS, POPULATION_SERIES, GDP_GROWTH, INFLATION_SERIES,
  SECTORS, SECTOR_DETAIL, PROVINCES, ECONOMY, LABOUR, SOURCES, SITE,
} from './data.js';

function heroCard(ind) {
  return `<a class="card card-link" href="#${ind.route}">
    <h3>${esc(ind.name)}</h3>
    <div class="big">${esc(ind.value)} <span class="unit">${esc(ind.unit)}</span></div>
    <p class="note">${esc(ind.note)}</p>
    <p class="src">${esc(sourceLine(ind.source, ind.year))}</p>
  </a>`;
}

export function renderHome() {
  const top = INDICATORS.filter((i) => i.home).map(heroCard).join('');
  return `
  <div class="hero">
    <h1>Indonesia dalam angka</h1>
    <p class="lede">Penduduk, ekonomi, harga, dan kesejahteraan — ${INDICATORS.length} indikator utama dari sumber resmi, masing-masing dengan sumber dan tahunnya. Tidak ada angka tanpa asal-usul.</p>
    <p class="updated">Terakhir diperbarui <b>${esc(SITE.updated)}</b> · Sumber utama: BPS, Bank Indonesia, APJII</p>
  </div>
  <div class="cards">${top}</div>
  <section>
    <h2>Penduduk terus tumbuh, melambat</h2>
    <p class="sub">Dari ${idNum(POPULATION_SERIES[0].value, 1)} juta (${POPULATION_SERIES[0].label}) menjadi ${idNum(POPULATION_SERIES.at(-1).value, 1)} juta (${POPULATION_SERIES.at(-1).label}). Pertumbuhan tahunan kini di bawah 1%.</p>
    <div class="panel">
      <h3>Jumlah penduduk, ${POPULATION_SERIES[0].label}–${POPULATION_SERIES.at(-1).label}</h3>
      ${lineChart(POPULATION_SERIES, { format: (v) => idNum(v, 1), unit: 'juta', aria: 'Grafik garis jumlah penduduk Indonesia' })}
      <p class="chart-note">${esc(sourceLine('BPS, Sensus Penduduk dan proyeksi penduduk', POPULATION_SERIES.at(-1).label))}. Angka 2024 adalah estimasi pertengahan tahun.</p>
    </div>
  </section>
  <section>
    <h2>Ekonomi tumbuh di atas 5%</h2>
    <p class="sub">Pertumbuhan ekonomi riil ${GDP_GROWTH.at(-1).label} sebesar ${idNum(GDP_GROWTH.at(-1).value, 2)}%, setelah sempat minus pada 2020.</p>
    <div class="panel">
      <h3>Pertumbuhan PDB riil, ${GDP_GROWTH[0].label}–${GDP_GROWTH.at(-1).label} (% per tahun)</h3>
      ${columnChart(GDP_GROWTH, { format: (v) => idNum(v, 2), aria: 'Grafik kolom pertumbuhan PDB' })}
      <p class="chart-note">${esc(sourceLine('BPS, PDB triwulanan dan tahunan', GDP_GROWTH.at(-1).label))}.</p>
    </div>
  </section>
  <section>
    <h2>Di mana orang Indonesia tinggal</h2>
    <p class="sub">Lima provinsi terpadat — empat di antaranya di Pulau Jawa. <a href="#/penduduk">Lihat semua provinsi →</a></p>
    <div class="panel">
      <h3>Lima provinsi berpenduduk terbanyak, ${PROVINCES[0].year}</h3>
      ${barChart(PROVINCES.slice(0, 5).map((p) => ({ label: p.name, value: p.population })), { format: (v) => idNum(v, 1), unit: 'juta', labelWidth: 130, aria: 'Grafik batang lima provinsi terpadat' })}
      <p class="chart-note">${esc(sourceLine('BPS, proyeksi penduduk per provinsi', PROVINCES[0].year))}.</p>
    </div>
  </section>`;
}

let provinceSort = { key: 'population', dir: -1 };
export function renderPopulation() {
  const rows = [...PROVINCES].sort((a, b) => {
    const av = a[provinceSort.key];
    const bv = b[provinceSort.key];
    if (typeof av === 'string') return av.localeCompare(bv) * provinceSort.dir;
    return (av - bv) * provinceSort.dir;
  });
  return `
  <div class="hero">
    <h1>Penduduk</h1>
    <p class="lede">${idNum(POPULATION_SERIES.at(-1).value, 1)} juta jiwa pada ${POPULATION_SERIES.at(-1).label} — negara keempat terpadat di dunia — tersebar di 38 provinsi, dari Jawa yang padat sampai Papua yang luas dan jarang.</p>
  </div>
  <div class="cards">
    <div class="card"><h3>Jumlah penduduk</h3><div class="big">${idNum(POPULATION_SERIES.at(-1).value, 1)} <span class="unit">juta</span></div><p class="note">Estimasi pertengahan tahun ${POPULATION_SERIES.at(-1).label}</p><p class="src">${esc(sourceLine('BPS', POPULATION_SERIES.at(-1).label))}</p></div>
    <div class="card"><h3>Usia median</h3><div class="big">${idNum(LABOUR.medianAge, 1)} <span class="unit">tahun</span></div><p class="note">Separuh penduduk lebih muda dari angka ini</p><p class="src">${esc(sourceLine(LABOUR.medianAgeSource, LABOUR.medianAgeYear))}</p></div>
    <div class="card"><h3>Harapan hidup</h3><div class="big">${idNum(LABOUR.lifeExpectancy, 2)} <span class="unit">tahun</span></div><p class="note">Bayi lahir ${LABOUR.lifeExpectancyYear} diperkirakan hidup selama itu</p><p class="src">${esc(sourceLine('BPS', LABOUR.lifeExpectancyYear))}</p></div>
  </div>
  <section>
    <h2>Pertumbuhan melambat</h2>
    <p class="sub">Laju tumbuh penduduk kini 0,82% per tahun (UN, 2024); angka kelahiran 2,13 anak per perempuan (SUPAS 2025) sudah mendekati tingkat penggantian.</p>
    <div class="panel">
      <h3>Jumlah penduduk, ${POPULATION_SERIES[0].label}–${POPULATION_SERIES.at(-1).label}</h3>
      ${lineChart(POPULATION_SERIES, { format: (v) => idNum(v, 1), unit: 'juta', aria: 'Grafik garis jumlah penduduk' })}
      <p class="chart-note">${esc(sourceLine('BPS, Sensus Penduduk dan proyeksi penduduk', POPULATION_SERIES.at(-1).label))}.</p>
    </div>
  </section>
  <section>
    <h2>Sepuluh provinsi terpadat</h2>
    <p class="sub">Klik judul kolom untuk mengurutkan. Semua angka dari satu tabel BPS yang sama, tahun ${PROVINCES[0].year}.</p>
    <div class="panel">
      <table class="data" id="province-table">
        <caption>${esc(sourceLine('BPS, Jumlah Penduduk Menurut Provinsi', PROVINCES[0].year))}. Penduduk dalam juta jiwa.</caption>
        <thead><tr>
          <th><button type="button" data-sort="population">#</button></th>
          <th><button type="button" data-sort="name">Provinsi</button></th>
          <th><button type="button" data-sort="island">Pulau</button></th>
          <th class="num"><button type="button" data-sort="population">Penduduk (juta)</button></th>
        </tr></thead>
        <tbody>
          ${rows.map((p) => `<tr><td>${PROVINCES.indexOf(p) + 1}</td><td>${esc(p.name)}</td><td>${esc(p.island)}</td><td class="num">${idNum(p.population, 2)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>
  <div class="callout"><p><strong>Jawa mendominasi.</strong> Lima provinsi teratas semuanya berada di Jawa dan Sumatera, dengan Jawa Barat di urutan pertama (49,41 juta jiwa, ${PROVINCES[0].year}) — lebih banyak dari penduduk kebanyakan negara di dunia.</p></div>`;
}

export function renderEconomy() {
  return `
  <div class="hero">
    <h1>Ekonomi</h1>
    <p class="lede">PDB ${idNum(ECONOMY.gdpNominal, 1)} triliun rupiah pada ${ECONOMY.year} — ekonomi terbesar di Asia Tenggara — dengan pertumbuhan riil ${idNum(GDP_GROWTH.at(-1).value, 2)}%.</p>
  </div>
  <div class="cards">
    <div class="card"><h3>PDB nominal</h3><div class="big">Rp ${idNum(ECONOMY.gdpNominal, 1)} <span class="unit">triliun</span></div><p class="note">Tumbuh 5,11% riil pada ${ECONOMY.year}</p><p class="src">${esc(sourceLine('BPS', ECONOMY.year))}</p></div>
    <div class="card"><h3>PDB per kapita</h3><div class="big">Rp ${idNum(ECONOMY.gdpPerCapita, 1)} <span class="unit">juta</span></div><p class="note">≈ US$ ${idNum(ECONOMY.gdpPerCapitaUsd)} per orang per tahun</p><p class="src">${esc(sourceLine('BPS', ECONOMY.year))}</p></div>
    <div class="card"><h3>Ekspor – impor</h3><div class="big">US$ ${idNum(ECONOMY.exports)} <span class="unit">miliar</span></div><p class="note">Ekspor ${ECONOMY.tradeYear}; impor US$ ${idNum(ECONOMY.imports)} miliar — surplus US$ ${idNum(ECONOMY.exports - ECONOMY.imports, 1)} miliar</p><p class="src">${esc(sourceLine('BPS, Statistik Perdagangan Luar Negeri', ECONOMY.tradeYear))}</p></div>
  </div>
  <section>
    <h2>Pertumbuhan riil, ${GDP_GROWTH[0].label}–${GDP_GROWTH.at(-1).label}</h2>
    <p class="sub">Kontraksi 2020 adalah satu-satunya tahun negatif dalam enam tahun terakhir; sejak 2022 pertumbuhan kembali di atas 5%.</p>
    <div class="panel">
      <h3>Pertumbuhan PDB riil (% per tahun)</h3>
      ${columnChart(GDP_GROWTH, { format: (v) => idNum(v, 2), aria: 'Grafik kolom pertumbuhan PDB' })}
      <p class="chart-note">${esc(sourceLine('BPS', GDP_GROWTH.at(-1).label))}.</p>
    </div>
  </section>
  <section>
    <h2>Apa yang menggerakkan ekonomi</h2>
    <p class="sub">Industri pengolahan adalah sektor terbesar, diikuti perdagangan dan pertanian.</p>
    <div class="panel">
      <h3>Pangsa PDB menurut lapangan usaha, ${ECONOMY.year} (%)</h3>
      ${barChart(SECTORS.map((s) => ({ label: s.label, value: s.value })), { format: (v) => idNum(v, 1), unit: '%', labelWidth: 210, aria: 'Grafik batang pangsa sektor PDB' })}
      <p class="chart-note">${esc(sourceLine('Bank Dunia, World Development Indicators', ECONOMY.year))}. Tiga pangsa berjumlah 95,7%; sisanya pajak neto atas produk.</p>
      <h3 style="margin-top:16px">Sektor terbesar secara rinci, 2024 (BPS)</h3>
      <ul class="key-list">
        ${SECTOR_DETAIL.map((s) => `<li><span>${esc(s.label)}</span><b>${idNum(s.value, 2)}% PDB</b></li>`).join('')}
      </ul>
    </div>
  </section>`;
}

export function renderPrices() {
  const latest = INFLATION_SERIES.at(-1);
  return `
  <div class="hero">
    <h1>Harga</h1>
    <p class="lede">Inflasi tahunan ${idNum(latest.value, 2)}% pada ${latest.label} — di dalam sasaran Bank Indonesia 2,5% ±1% — setelah lonjakan 2022 mereda.</p>
  </div>
  <div class="cards">
    <div class="card"><h3>Inflasi tahunan</h3><div class="big">${idNum(latest.value, 2)}<span class="unit">%</span></div><p class="note">${esc(latest.label)}, year-on-year</p><p class="src">${esc(sourceLine('BPS, Indeks Harga Konsumen', latest.year))}</p></div>
    <div class="card"><h3>Inflasi 2022</h3><div class="big">${idNum(INFLATION_SERIES.find((s) => s.label === '2022')?.value ?? 0, 2)}<span class="unit">%</span></div><p class="note">Puncak pasca kenaikan harga BBM bersubsidi</p><p class="src">${esc(sourceLine('BPS', '2022'))}</p></div>
    <div class="card"><h3>Sasaran BI</h3><div class="big">2,5<span class="unit">% ±1%</span></div><p class="note">Sasaran inflasi Bank Indonesia 2024–2026</p><p class="src">${esc(sourceLine('Bank Indonesia', '2024–2026'))}</p></div>
  </div>
  <section>
    <h2>Inflasi tahunan, ${INFLATION_SERIES[0].label}–${INFLATION_SERIES.at(-1).label}</h2>
    <p class="sub">Inflasi diukur dari Indeks Harga Konsumen (IHK) di 150 kota. Angka 2022 melonjak setelah penyesuaian harga BBM; 2023–2024 kembali ke kisaran sasaran.</p>
    <div class="panel">
      <h3>Inflasi year-on-year (%)</h3>
      ${columnChart(INFLATION_SERIES.filter((s) => /^\d{4}$/.test(s.label)), { format: (v) => idNum(v, 2), aria: 'Grafik kolom inflasi tahunan' })}
      <p class="chart-note">${esc(sourceLine('BPS, Indeks Harga Konsumen', INFLATION_SERIES.at(-1).year))}.</p>
    </div>
  </section>
  <div class="callout"><p><strong>Apa artinya ${idNum(latest.value, 2)}%?</strong> Harga rata-rata barang dan jasa yang dibeli rumah tangga naik ${idNum(latest.value, 2)}% dibanding setahun sebelumnya — cukup rendah untuk menjaga daya beli, cukup tinggi untuk menandakan ekonomi yang bergerak.</p></div>`;
}

export function renderLabour() {
  return `
  <div class="hero">
    <h1>Tenaga Kerja &amp; Kesejahteraan</h1>
    <p class="lede">Pengangguran terbuka ${idNum(LABOUR.unemployment, 2)}% (${LABOUR.unemploymentPeriod}), kemiskinan ${idNum(LABOUR.poverty, 2)}% — ${idNum(LABOUR.poorPeople, 2)} juta jiwa — dan IPM ${idNum(LABOUR.hdi, 2)}.</p>
  </div>
  <div class="cards">
    <div class="card"><h3>Pengangguran terbuka</h3><div class="big">${idNum(LABOUR.unemployment, 2)}<span class="unit">%</span></div><p class="note">${esc(LABOUR.unemploymentPeriod)} · dari ${idNum(LABOUR.labourForce, 1)} juta angkatan kerja</p><p class="src">${esc(sourceLine('BPS, Sakernas', LABOUR.unemploymentYear))}</p></div>
    <div class="card"><h3>Kemiskinan</h3><div class="big">${idNum(LABOUR.poverty, 2)}<span class="unit">%</span></div><p class="note">${esc(LABOUR.povertyPeriod)} · ${idNum(LABOUR.poorPeople, 2)} juta jiwa di bawah garis kemiskinan</p><p class="src">${esc(sourceLine('BPS', LABOUR.povertyYear))}</p></div>
    <div class="card"><h3>Indeks Pembangunan Manusia</h3><div class="big">${idNum(LABOUR.hdi, 2)}</div><p class="note">Kategori "tinggi" (70–80) · ${LABOUR.hdiYear}</p><p class="src">${esc(sourceLine('BPS', LABOUR.hdiYear))}</p></div>
  </div>
  <section>
    <h2>Angka-angka kunci kesejahteraan</h2>
    <div class="panel">
      <ul class="key-list">
        <li><span>Angkatan kerja</span><b>${idNum(LABOUR.labourForce, 2)} juta jiwa (${LABOUR.unemploymentYear})</b></li>
        <li><span>Pengangguran muda (15–24 tahun)</span><b>${idNum(LABOUR.youthUnemployment, 1)}% (Agu 2025)</b></li>
        <li><span>Melek huruf (15 tahun ke atas)</span><b>${idNum(LABOUR.literacy, 1)}% (${LABOUR.literacyYear})</b></li>
        <li><span>Pengguna internet</span><b>${idNum(LABOUR.internetUsers, 2)} juta (${idNum(LABOUR.internetShare, 1)}% penduduk, ${LABOUR.internetYear})</b></li>
        <li><span>Harapan lama sekolah</span><b>${idNum(LABOUR.schooling, 1)} tahun (${LABOUR.schoolingYear})</b></li>
      </ul>
      <p class="src-line">Sumber: BPS (Sakernas, Susenas, IPM) dan APJII (survei penetrasi internet). Lihat Metodologi untuk rincian.</p>
    </div>
  </section>`;
}

export function renderMethodology() {
  return `
  <div class="hero">
    <h1>Metodologi &amp; Sumber</h1>
    <p class="lede">Setiap angka di IndoStats bisa dilacak ke sumbernya. Berikut daftar lengkapnya, plus cara mengutip situs ini.</p>
  </div>
  <section>
    <h2>Sumber data</h2>
    <div class="panel">
      <table class="data">
        <thead><tr><th>Topik</th><th>Sumber</th><th>Periode</th></tr></thead>
        <tbody>
          ${SOURCES.map((s) => `<tr><td>${esc(s.topic)}</td><td>${esc(s.source)}</td><td>${esc(s.period)}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </section>
  <section>
    <h2>Cara mengutip</h2>
    <div class="panel">
      <p>Contoh: "Penduduk Indonesia 281,6 juta jiwa pada 2024 (BPS, proyeksi penduduk; dikutip dari IndoStats, diakses 27 November 2026)."</p>
      <p>Selalu sebut sumber aslinya (BPS, Bank Indonesia, APJII) di samping IndoStats, dan periksa angka terbaru di sumber aslinya sebelum dipakai untuk keputusan.</p>
    </div>
  </section>
  <section>
    <h2>Catatan</h2>
    <div class="panel">
      <p>Angka 2024 untuk penduduk adalah estimasi pertengahan tahun BPS, bukan hasil sensus. Sensus penduduk terakhir dilakukan 2020 (270,2 juta jiwa). Pangsa sektor dihitung dari PDB atas dasar harga berlaku. Inflasi diukur dari IHK 90 kota. IndoStats adalah situs independen dan bukan situs resmi BPS.</p>
    </div>
  </section>`;
}

export function renderSearch(query) {
  const q = query.trim().toLowerCase();
  const hits = q ? INDICATORS.filter((i) => (i.name + ' ' + i.note + ' ' + i.search).toLowerCase().includes(q)) : [];
  return `
  <div class="hero">
    <h1>Hasil pencarian: “${esc(query)}”</h1>
    <p class="lede">${hits.length ? `${hits.length} indikator ditemukan.` : 'Tidak ada indikator yang cocok. Coba kata lain, misalnya "penduduk", "inflasi", atau "kemiskinan".'}</p>
  </div>
  <div class="search-results">
    ${hits.map((i) => `<a class="result" href="#${i.route}"><strong>${esc(i.name)} — ${esc(i.value)} ${esc(i.unit)}</strong><span>${esc(i.note)} · ${esc(sourceLine(i.source, i.year))}</span></a>`).join('')}
  </div>
  <p><a href="#/">← Kembali ke beranda</a></p>`;
}

// Exposed so app.js can re-render the province table after a sort click.
export function setProvinceSort(key) {
  if (provinceSort.key === key) {
    provinceSort.dir *= -1;
  } else {
    provinceSort = { key, dir: key === 'name' ? 1 : -1 };
  }
}
