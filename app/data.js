// data.js — every figure NusaData shows, with its source and year.
// Figures are drawn from BPS (Statistics Indonesia) and World Bank releases
// for 2020-2024. Nothing here is fetched at run time; it is all local data.

export const HEADLINES = [
  {
    id: "penduduk",
    label: "Penduduk",
    value: "281,6 jt",
    note: "Jumlah penduduk Indonesia",
    source: "BPS, 2024",
    route: "#/penduduk",
  },
  {
    id: "pdb",
    label: "PDB",
    value: "US$1,37 tn",
    note: "Produk Domestik Bruto",
    source: "World Bank, 2024",
    route: "#/ekonomi",
  },
  {
    id: "tumbuh",
    label: "Pertumbuhan ekonomi",
    value: "5,03%",
    note: "Turun dari 5,05% pada 2023",
    source: "BPS, 2024",
    route: "#/ekonomi",
  },
  {
    id: "inflasi",
    label: "Inflasi",
    value: "1,57%",
    note: "Terendah sejak 2020",
    source: "BPS, 2024",
    route: "#/ekonomi",
  },
  {
    id: "pengangguran",
    label: "Pengangguran terbuka",
    value: "4,76%",
    note: "Turun dari 5,32% pada Agustus 2023",
    source: "BPS, Agustus 2024",
    route: "#/ketenagakerjaan",
  },
  {
    id: "harapan-hidup",
    label: "Harapan hidup",
    value: "71,7 thn",
    note: "Naik dari 69,8 tahun pada 2010",
    source: "World Bank, 2023",
    route: "#/kesehatan",
  },
];

// Population, millions of people (BPS, mid-year estimates).
export const POPULATION_SERIES = [
  { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

// Age structure, 2024 (BPS).
export const AGE_GROUPS = [
  { label: "0–14 tahun", value: 24.4 },
  { label: "15–64 tahun", value: 68.4 },
  { label: "65+ tahun", value: 7.2 },
];

// Economic growth, % year-on-year (BPS).
export const GROWTH_SERIES = [
  { year: 2020, value: -2.07 },
  { year: 2021, value: 3.7 },
  { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 },
  { year: 2024, value: 5.03 },
];

// Inflation, % year-on-year (BPS).
export const INFLATION_SERIES = [
  { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

// GDP per capita, current US$ (World Bank).
export const GDP_PER_CAPITA = [
  { year: 2020, value: 3890 },
  { year: 2021, value: 4349 },
  { year: 2022, value: 4784 },
  { year: 2023, value: 4870 },
  { year: 2024, value: 4919 },
];

// Open unemployment rate (TPT), % (BPS, August survey each year).
export const UNEMPLOYMENT_SERIES = [
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.76 },
];

// Labour force participation rate (TPAK), % (BPS, August).
export const PARTICIPATION_SERIES = [
  { year: 2020, value: 67.77 },
  { year: 2021, value: 68.08 },
  { year: 2022, value: 68.63 },
  { year: 2023, value: 69.48 },
  { year: 2024, value: 70.93 },
];

// Life expectancy at birth, years (World Bank).
export const LIFE_EXPECTANCY = [
  { year: 2010, value: 69.8 },
  { year: 2015, value: 70.9 },
  { year: 2020, value: 71.3 },
  { year: 2022, value: 71.5 },
  { year: 2023, value: 71.7 },
];

// Literacy rate, age 15+, % (BPS).
export const LITERACY_SERIES = [
  { year: 2020, value: 96.0 },
  { year: 2021, value: 96.2 },
  { year: 2022, value: 96.4 },
  { year: 2023, value: 96.5 },
  { year: 2024, value: 96.5 },
];

// Mean years of schooling, years (BPS).
export const SCHOOLING_SERIES = [
  { year: 2020, value: 8.7 },
  { year: 2021, value: 8.8 },
  { year: 2022, value: 8.9 },
  { year: 2023, value: 9.0 },
  { year: 2024, value: 9.0 },
];

// 20 largest provinces by population, millions, 2024 (BPS).
// Density is people per square kilometre, rounded from BPS figures.
export const PROVINCES = [
  { name: "Jawa Barat", island: "Jawa", population: 50.35, density: 1354 },
  { name: "Jawa Timur", island: "Jawa", population: 41.81, density: 875 },
  { name: "Jawa Tengah", island: "Jawa", population: 37.89, density: 1155 },
  { name: "Sumatera Utara", island: "Sumatera", population: 15.59, density: 214 },
  { name: "Banten", island: "Jawa", population: 12.43, density: 1288 },
  { name: "DKI Jakarta", island: "Jawa", population: 10.68, density: 16084 },
  { name: "Sulawesi Selatan", island: "Sulawesi", population: 9.46, density: 202 },
  { name: "Lampung", island: "Sumatera", population: 9.19, density: 262 },
  { name: "Sumatera Selatan", island: "Sumatera", population: 8.84, density: 97 },
  { name: "Riau", island: "Sumatera", population: 6.78, density: 78 },
  { name: "Kalimantan Barat", island: "Kalimantan", population: 5.79, density: 39 },
  { name: "Sumatera Barat", island: "Sumatera", population: 5.66, density: 135 },
  { name: "Nusa Tenggara Timur", island: "Nusa Tenggara", population: 5.66, density: 116 },
  { name: "Aceh", island: "Sumatera", population: 5.55, density: 96 },
  { name: "Nusa Tenggara Barat", island: "Nusa Tenggara", population: 5.47, density: 295 },
  { name: "Bali", island: "Bali", population: 4.43, density: 768 },
  { name: "Kalimantan Selatan", island: "Kalimantan", population: 4.27, density: 110 },
  { name: "Kalimantan Timur", island: "Kalimantan", population: 3.99, density: 31 },
  { name: "DI Yogyakarta", island: "Jawa", population: 3.75, density: 1192 },
  { name: "Jambi", island: "Sumatera", population: 3.66, density: 73 },
];

export const ISLANDS = ["Semua", "Jawa", "Sumatera", "Kalimantan", "Sulawesi", "Bali", "Nusa Tenggara"];

// Health headline figures (Kemenkes SSGI 2023, WHO 2020, World Bank 2023).
export const HEALTH_STATS = [
  { label: "Prevalensi stunting balita", value: "21,5%", note: "Turun dari 24,4% pada 2021", source: "Kemenkes (SSGI), 2023" },
  { label: "Kematian bayi", value: "16,8", note: "Per 1.000 kelahiran hidup", source: "World Bank, 2023" },
  { label: "Kematian ibu", value: "173", note: "Per 100.000 kelahiran hidup", source: "WHO, 2020" },
  { label: "Harapan hidup", value: "71,7 thn", note: "Naik dari 69,8 tahun pada 2010", source: "World Bank, 2023" },
];

// Short notes shown under each section, each with its source and year.
export const SECTION_NOTES = {
  penduduk:
    "Sumber: BPS, Proyeksi Penduduk 2020–2024 dan Sensus Penduduk 2020. Kepadatan nasional 2024 sekitar 147 jiwa per km².",
  ekonomi:
    "Sumber: BPS untuk pertumbuhan dan inflasi; World Bank untuk PDB dan PDB per kapita, 2020–2024.",
  ketenagakerjaan:
    "Sumber: BPS, Survei Angkatan Kerja Nasional (Sakernas) Agustus 2020–2024. Angkatan kerja Agustus 2024 mencapai 153,37 juta orang.",
  kesehatan:
    "Sumber: World Bank untuk harapan hidup; Kementerian Kesehatan (SSGI) untuk stunting; WHO untuk kematian ibu, 2020–2023.",
  pendidikan:
    "Sumber: BPS, 2020–2024. Angka partisipasi murni SD 2024 sekitar 99,2% dan SMP sekitar 97,9%.",
  provinsi:
    "Sumber: BPS, Proyeksi Penduduk 2024. Dua puluh provinsi terbesar menampung sekitar 246 juta jiwa, atau 87% penduduk Indonesia.",
};
