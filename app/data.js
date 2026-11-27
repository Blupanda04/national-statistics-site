// All figures for IndoStats, each with its source and year. Every number
// here was read from a named source on 27 November 2026 (see
// ../stats-research.json for the full research file); nothing is invented.
// BPS (Badan Pusat Statistik) is the primary source wherever a BPS figure
// exists; where sources disagree, the BPS figure is used.

export const SITE = {
  updated: '27 November 2026',
  popGrowth: '0,82',
};

// The six headline indicators on the home page.
export const INDICATORS = [
  { id: 'penduduk', name: 'Penduduk', value: '284,44', unit: 'juta', note: 'Estimasi pertengahan tahun 2025', source: 'BPS', year: '2025', route: '/penduduk', home: true, search: 'jumlah penduduk jiwa sensus proyeksi' },
  { id: 'pdb', name: 'PDB nominal', value: 'Rp 23.821,1', unit: 'triliun', note: 'Tumbuh 5,11% riil pada 2025', source: 'BPS', year: '2025', route: '/ekonomi', home: true, search: 'produk domestik bruto ekonomi nominal' },
  { id: 'inflasi', name: 'Inflasi tahunan', value: '3,23', unit: '%', note: 'Year-on-year, Oktober 2026', source: 'BPS', year: '2026', route: '/harga', home: true, search: 'harga konsumen IHK inflasi' },
  { id: 'pengangguran', name: 'Pengangguran terbuka', value: '4,75', unit: '%', note: '7,38 juta penganggur, Agustus 2026', source: 'BPS', year: '2026', route: '/tenaga-kerja', home: true, search: 'pengangguran kerja sakernas angkatan' },
  { id: 'kemiskinan', name: 'Kemiskinan', value: '8,07', unit: '%', note: '22,93 juta jiwa, Maret 2026', source: 'BPS', year: '2026', route: '/tenaga-kerja', home: true, search: 'miskin kemiskinan garis penduduk' },
  { id: 'ipm', name: 'Indeks Pembangunan Manusia', value: '75,9', unit: '', note: 'Kategori "tinggi", 2025', source: 'BPS', year: '2025', route: '/tenaga-kerja', home: true, search: 'IPM pembangunan manusia harapan hidup sekolah' },
];

// Population in millions. 2010 and 2020 are census results; 2024 and 2025
// are BPS mid-year estimates.
export const POPULATION_SERIES = [
  { label: '2010', value: 237.64 },
  { label: '2020', value: 270.2 },
  { label: '2024', value: 281.6 },
  { label: '2025', value: 284.44 },
];

// Real GDP growth, percent per year (BPS).
export const GDP_GROWTH = [
  { label: '2019', value: 5.02 },
  { label: '2020', value: -2.07 },
  { label: '2021', value: 3.69 },
  { label: '2022', value: 5.31 },
  { label: '2023', value: 5.05 },
  { label: '2024', value: 5.03 },
  { label: '2025', value: 5.11 },
];

// CPI inflation, December year-on-year (BPS), plus the latest monthly
// reading, October 2026. The two are labelled differently on the site.
export const INFLATION_SERIES = [
  { label: '2021', value: 1.87, year: '2021' },
  { label: '2022', value: 5.51, year: '2022' },
  { label: '2023', value: 2.61, year: '2023' },
  { label: '2024', value: 1.57, year: '2024' },
  { label: '2025', value: 2.92, year: '2025' },
  { label: 'Okt 2026', value: 3.23, year: '2026' },
];

// Value added by broad sector, share of GDP 2024 (World Bank WDI). The
// three shares sum to 95,7%; the rest is net taxes on products.
export const SECTORS = [
  { label: 'Jasa', value: 43.8 },
  { label: 'Industri', value: 39.3 },
  { label: 'Pertanian, kehutanan & perikanan', value: 12.6 },
];

// The largest detailed sectors, share of GDP 2024 (BPS).
export const SECTOR_DETAIL = [
  { label: 'Industri pengolahan', value: 18.98 },
  { label: 'Perdagangan besar & eceran', value: 13.07 },
  { label: 'Konstruksi', value: 9.9 },
];

// Ten largest provinces by population, 2022, single BPS table
// ("Jumlah Penduduk Menurut Provinsi di Indonesia (ribu), 2022").
// Population in millions; island is geography, not a statistic.
export const PROVINCES = [
  { name: 'Jawa Barat', island: 'Jawa', population: 49.41, year: '2022' },
  { name: 'Jawa Timur', island: 'Jawa', population: 41.15, year: '2022' },
  { name: 'Jawa Tengah', island: 'Jawa', population: 37.03, year: '2022' },
  { name: 'Sumatera Utara', island: 'Sumatera', population: 15.12, year: '2022' },
  { name: 'Banten', island: 'Jawa', population: 12.25, year: '2022' },
  { name: 'DKI Jakarta', island: 'Jawa', population: 10.68, year: '2022' },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', population: 9.23, year: '2022' },
  { name: 'Lampung', island: 'Sumatera', population: 9.18, year: '2022' },
  { name: 'Sumatera Selatan', island: 'Sumatera', population: 8.66, year: '2022' },
  { name: 'Riau', island: 'Sumatera', population: 6.61, year: '2022' },
];

export const ECONOMY = {
  year: '2025',
  gdpNominal: 23821.1, // Rp triliun, BPS
  gdpPerCapita: 83.7, // Rp juta, BPS
  gdpPerCapitaUsd: 5083, // US$, BPS
  tradeYear: '2024',
  exports: 264.7, // US$ miliar, barang, BPS/Bank Dunia
  imports: 233.7, // US$ miliar, barang, BPS/Bank Dunia
};

export const LABOUR = {
  unemployment: 4.75,
  unemploymentPeriod: 'Agustus 2026',
  unemploymentYear: '2026',
  labourForce: 155.37, // juta, Sakernas Agu 2026
  youthUnemployment: 16.9, // % usia 15–24, Agu 2025
  poverty: 8.07,
  povertyPeriod: 'Maret 2026',
  povertyYear: '2026',
  poorPeople: 22.93, // juta jiwa
  hdi: 75.9,
  hdiYear: '2025',
  medianAge: 30.1,
  medianAgeSource: 'UN World Population Prospects',
  medianAgeYear: '2024',
  lifeExpectancy: 74.47,
  lifeExpectancyYear: '2025',
  literacy: 97.1,
  literacyYear: '2025',
  internetUsers: 229.42, // juta, APJII 2025
  internetShare: 80.7, // % penduduk, APJII 2025
  internetYear: '2025',
  schooling: 13.3, // harapan lama sekolah, tahun, BPS 2025
  schoolingYear: '2025',
};

export const SOURCES = [
  { topic: 'Penduduk', source: 'BPS — Sensus Penduduk 2010 & 2020, proyeksi penduduk', period: '2010–2025' },
  { topic: 'PDB & pertumbuhan', source: 'BPS — PDB tahunan', period: '2019–2025' },
  { topic: 'Perdagangan luar negeri', source: 'BPS / Bank Dunia — statistik perdagangan', period: '2024' },
  { topic: 'Inflasi', source: 'BPS — Indeks Harga Konsumen, 150 kota', period: '2021–Okt 2026' },
  { topic: 'Tenaga kerja', source: 'BPS — Sakernas (Survei Angkatan Kerja Nasional)', period: 'Agu 2025–Agu 2026' },
  { topic: 'Kemiskinan', source: 'BPS — Susenas', period: 'Mar 2024–Mar 2026' },
  { topic: 'IPM & harapan hidup', source: 'BPS — Indeks Pembangunan Manusia', period: '2020–2025' },
  { topic: 'Internet', source: 'APJII — Survei Penetrasi Internet Indonesia', period: '2024–2025' },
  { topic: 'Melek huruf', source: 'Kementerian Kesehatan — Profil Kesehatan Indonesia', period: '2025' },
];
