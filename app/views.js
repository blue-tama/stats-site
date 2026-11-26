// views.js — builds the HTML of each section from the figures in data.js.
// Every section is plain markup with real numbers; charts are drawn by
// charts.js after the markup lands in the page.

import {
  AGE_GROUPS,
  GDP_PER_CAPITA,
  GROWTH_SERIES,
  HEADLINES,
  HEALTH_STATS,
  INFLATION_SERIES,
  LIFE_EXPECTANCY,
  LITERACY_SERIES,
  PARTICIPATION_SERIES,
  POPULATION_SERIES,
  PROVINCES,
  ISLANDS,
  SCHOOLING_SERIES,
  SECTION_NOTES,
  UNEMPLOYMENT_SERIES,
} from "./data.js";
import { drawChart } from "./charts.js";

function statCard(h) {
  return `<a class="stat-card" href="${h.route}">
    <span class="stat-label">${h.label}</span>
    <span class="stat-value">${h.value}</span>
    <span class="stat-note">${h.note}</span>
    <span class="stat-source">${h.source}</span>
  </a>`;
}

function figureRow(label, value, source) {
  return `<tr><td>${label}</td><td class="num">${value}</td><td>${source}</td></tr>`;
}

function chartBlock(id, title, source, kindDefault) {
  return `<figure class="chart-card">
    <figcaption>${title}</figcaption>
    <div class="chart-toggle" role="group" aria-label="Jenis grafik">
      <button type="button" data-chart="${id}" data-kind="bar" class="${kindDefault === "bar" ? "active" : ""}">Batang</button>
      <button type="button" data-chart="${id}" data-kind="line" class="${kindDefault === "line" ? "active" : ""}">Garis</button>
    </div>
    <canvas id="${id}" height="260" aria-label="${title}"></canvas>
    <p class="source">Sumber: ${source}</p>
  </figure>`;
}

function sectionHead(title, intro, noteKey) {
  return `<h1>${title}</h1><p class="lede">${intro}</p><p class="source-note">${SECTION_NOTES[noteKey]}</p>`;
}

export const VIEWS = {
  beranda() {
    return `
    ${sectionHead(
      "Statistik Indonesia, satu tempat",
      "NusaData merangkum angka-angka utama Indonesia — penduduk, ekonomi, pekerjaan, kesehatan, dan pendidikan — dari BPS dan World Bank, lengkap dengan sumber dan tahunnya.",
      "penduduk"
    )}
    <div class="stat-grid">${HEADLINES.map(statCard).join("")}</div>
    <div class="home-charts">
      ${chartBlock("chart-home-pop", "Penduduk Indonesia 2020–2024 (juta jiwa)", "BPS, 2020–2024", "bar")}
      ${chartBlock("chart-home-growth", "Pertumbuhan ekonomi 2020–2024 (%) — turun dari 5,05% pada 2023", "BPS, 2020–2024", "line")}
    </div>
    <h2>Apa yang bisa dicari di sini?</h2>
    <ul class="link-list">
      <li><a href="#/penduduk">Penduduk</a> — jumlah, sebaran umur, dan kepadatan.</li>
      <li><a href="#/ekonomi">Ekonomi</a> — PDB, pertumbuhan, dan inflasi.</li>
      <li><a href="#/ketenagakerjaan">Ketenagakerjaan</a> — pengangguran dan partisipasi kerja.</li>
      <li><a href="#/kesehatan">Kesehatan</a> — harapan hidup, stunting, dan kematian ibu.</li>
      <li><a href="#/pendidikan">Pendidikan</a> — melek huruf dan lama sekolah.</li>
      <li><a href="#/provinsi">Provinsi</a> — 20 provinsi terbesar, bisa dicari dan diurutkan.</li>
    </ul>`;
  },

  penduduk() {
    return `
    ${sectionHead(
      "Penduduk",
      "Indonesia berpenduduk 281,6 juta jiwa pada 2024 (BPS) — negara keempat terpadat di dunia. Dua pertiga penduduk berada pada usia produktif.",
      "penduduk"
    )}
    <div class="stat-grid">
      <div class="stat-card"><span class="stat-label">Penduduk 2024</span><span class="stat-value">281,6 jt</span><span class="stat-note">Naik dari 270,2 jt pada 2020</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Kepadatan</span><span class="stat-value">147/km²</span><span class="stat-note">Rata-rata nasional</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Usia produktif (15–64)</span><span class="stat-value">68,4%</span><span class="stat-note">Dari seluruh penduduk</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Penduduk perkotaan</span><span class="stat-value">58,6%</span><span class="stat-note">Tinggal di daerah perkotaan</span><span class="stat-source">BPS, 2024</span></div>
    </div>
    ${chartBlock("chart-pop", "Jumlah penduduk 2020–2024 (juta jiwa)", "BPS, 2020–2024", "bar")}
    <h2>Struktur umur, 2024</h2>
    <table class="data-table"><thead><tr><th>Kelompok umur</th><th>Pangsa</th><th>Sumber</th></tr></thead>
    <tbody>${AGE_GROUPS.map((g) => figureRow(g.label, g.value.toLocaleString("id-ID") + "%", "BPS, 2024")).join("")}</tbody></table>`;
  },

  ekonomi() {
    return `
    ${sectionHead(
      "Ekonomi",
      "PDB Indonesia mencapai US$1,37 triliun pada 2024 (World Bank). Pertumbuhan 2024 tercatat 5,03% — turun dari 5,05% pada 2023 — sementara inflasi 1,57% menjadi yang terendah sejak 2020.",
      "ekonomi"
    )}
    <div class="stat-grid">
      <div class="stat-card"><span class="stat-label">PDB 2024</span><span class="stat-value">US$1,37 tn</span><span class="stat-note">Ekonomi terbesar di Asia Tenggara</span><span class="stat-source">World Bank, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Pertumbuhan 2024</span><span class="stat-value">5,03%</span><span class="stat-note">Turun dari 5,05% pada 2023</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Inflasi 2024</span><span class="stat-value">1,57%</span><span class="stat-note">Terendah sejak 2020</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">PDB per kapita 2024</span><span class="stat-value">US$4.919</span><span class="stat-note">Naik dari US$4.870 pada 2023</span><span class="stat-source">World Bank, 2024</span></div>
    </div>
    ${chartBlock("chart-growth", "Pertumbuhan ekonomi 2020–2024 (% y-on-y)", "BPS, 2020–2024", "bar")}
    ${chartBlock("chart-inflation", "Inflasi 2020–2024 (% y-on-y)", "BPS, 2020–2024", "line")}
    ${chartBlock("chart-gdppc", "PDB per kapita 2020–2024 (US$)", "World Bank, 2020–2024", "line")}
    <h2>Angka kunci ekonomi</h2>
    <table class="data-table"><thead><tr><th>Indikator</th><th>Nilai</th><th>Sumber</th></tr></thead>
    <tbody>
      ${figureRow("PDB nominal", "US$1,37 triliun", "World Bank, 2024")}
      ${figureRow("Pertumbuhan ekonomi", "5,03% (turun dari 5,05% pada 2023)", "BPS, 2024")}
      ${figureRow("Inflasi", "1,57%", "BPS, 2024")}
      ${figureRow("PDB per kapita", "US$4.919", "World Bank, 2024")}
      ${figureRow("Kontraksi pandemi", "-2,07% pada 2020", "BPS, 2020")}
    </tbody></table>`;
  },

  ketenagakerjaan() {
    return `
    ${sectionHead(
      "Ketenagakerjaan",
      "Tingkat pengangguran terbuka turun ke 4,76% pada Agustus 2024 (BPS), dari 5,32% setahun sebelumnya — level terendah sejak sebelum pandemi.",
      "ketenagakerjaan"
    )}
    <div class="stat-grid">
      <div class="stat-card"><span class="stat-label">Pengangguran 2024</span><span class="stat-value">4,76%</span><span class="stat-note">Turun dari 5,32% pada Agustus 2023</span><span class="stat-source">BPS, Agustus 2024</span></div>
      <div class="stat-card"><span class="stat-label">Angkatan kerja</span><span class="stat-value">153,37 jt</span><span class="stat-note">Orang bekerja dan mencari kerja</span><span class="stat-source">BPS, Agustus 2024</span></div>
      <div class="stat-card"><span class="stat-label">Partisipasi kerja (TPAK)</span><span class="stat-value">70,93%</span><span class="stat-note">Naik dari 69,48% pada 2023</span><span class="stat-source">BPS, Agustus 2024</span></div>
      <div class="stat-card"><span class="stat-label">Pekerja informal</span><span class="stat-value">59,2%</span><span class="stat-note">Dari penduduk yang bekerja</span><span class="stat-source">BPS, Agustus 2024</span></div>
    </div>
    ${chartBlock("chart-unemp", "Pengangguran terbuka 2020–2024 (%)", "BPS, Agustus 2020–2024", "bar")}
    ${chartBlock("chart-part", "Partisipasi angkatan kerja 2020–2024 (%)", "BPS, Agustus 2020–2024", "line")}`;
  },

  kesehatan() {
    return `
    ${sectionHead(
      "Kesehatan",
      "Harapan hidup di Indonesia mencapai 71,7 tahun pada 2023 (World Bank), naik dari 69,8 tahun pada 2010. Stunting balita masih 21,5% — pekerjaan rumah terbesar sektor kesehatan.",
      "kesehatan"
    )}
    <div class="stat-grid">
      ${HEALTH_STATS.map(
        (s) => `<div class="stat-card"><span class="stat-label">${s.label}</span><span class="stat-value">${s.value}</span><span class="stat-note">${s.note}</span><span class="stat-source">${s.source}</span></div>`
      ).join("")}
    </div>
    ${chartBlock("chart-life", "Harapan hidup saat lahir (tahun)", "World Bank, 2010–2023", "line")}
    <h2>Angka kunci kesehatan</h2>
    <table class="data-table"><thead><tr><th>Indikator</th><th>Nilai</th><th>Sumber</th></tr></thead>
    <tbody>
      ${figureRow("Harapan hidup", "71,7 tahun (naik dari 69,8 pada 2010)", "World Bank, 2023")}
      ${figureRow("Stunting balita", "21,5%", "Kemenkes (SSGI), 2023")}
      ${figureRow("Kematian bayi", "16,8 per 1.000 kelahiran hidup", "World Bank, 2023")}
      ${figureRow("Kematian ibu", "173 per 100.000 kelahiran hidup", "WHO, 2020")}
    </tbody></table>`;
  },

  pendidikan() {
    return `
    ${sectionHead(
      "Pendidikan",
      "Angka melek huruf penduduk usia 15 tahun ke atas mencapai 96,5% pada 2024 (BPS), dan rata-rata lama sekolah 9,0 tahun — setara kelas 3 SMP.",
      "pendidikan"
    )}
    <div class="stat-grid">
      <div class="stat-card"><span class="stat-label">Melek huruf 15+</span><span class="stat-value">96,5%</span><span class="stat-note">Stabil sejak 2023</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Rata-rata lama sekolah</span><span class="stat-value">9,0 thn</span><span class="stat-note">Naik dari 8,7 tahun pada 2020</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Partisipasi murni SD</span><span class="stat-value">99,2%</span><span class="stat-note">Anak usia SD yang bersekolah</span><span class="stat-source">BPS, 2024</span></div>
      <div class="stat-card"><span class="stat-label">Partisipasi murni SMP</span><span class="stat-value">97,9%</span><span class="stat-note">Anak usia SMP yang bersekolah</span><span class="stat-source">BPS, 2024</span></div>
    </div>
    ${chartBlock("chart-literacy", "Angka melek huruf 2020–2024 (%)", "BPS, 2020–2024", "line")}
    ${chartBlock("chart-schooling", "Rata-rata lama sekolah 2020–2024 (tahun)", "BPS, 2020–2024", "bar")}`;
  },

  provinsi() {
    return `
    ${sectionHead(
      "Provinsi",
      "Dua puluh provinsi terbesar menampung sekitar 246 juta jiwa — 87% penduduk Indonesia. Jawa Barat sendiri berpenduduk 50,35 juta jiwa, lebih besar dari banyak negara.",
      "provinsi"
    )}
    <div class="prov-controls">
      <label>Cari provinsi <input id="prov-search" type="search" placeholder="Ketik nama provinsi…" autocomplete="off"></label>
      <label>Pulau
        <select id="prov-island">
          ${ISLANDS.map((i) => `<option value="${i}">${i === "Semua" ? "Semua pulau" : i}</option>`).join("")}
        </select>
      </label>
      <p class="prov-count" id="prov-count"></p>
    </div>
    <div class="table-wrap">
    <table class="data-table sortable" id="prov-table">
      <thead><tr>
        <th data-key="name">Provinsi</th>
        <th data-key="island">Pulau</th>
        <th data-key="population">Penduduk (juta)</th>
        <th data-key="density">Kepadatan (jiwa/km²)</th>
      </tr></thead>
      <tbody id="prov-body"></tbody>
    </table>
    </div>
    <p class="source">Sumber: BPS, Proyeksi Penduduk 2024. Kepadatan dihitung dari jumlah penduduk dan luas wilayah.</p>`;
  },
};

// Which chart each canvas draws, and with what series and options.
export const CHARTS = {
  "chart-home-pop": { series: POPULATION_SERIES, unit: "", yLabel: "Juta jiwa", decimals: 1 },
  "chart-home-growth": { series: GROWTH_SERIES, unit: "%", yLabel: "% y-on-y", decimals: 2 },
  "chart-pop": { series: POPULATION_SERIES, unit: "", yLabel: "Juta jiwa", decimals: 1 },
  "chart-growth": { series: GROWTH_SERIES, unit: "%", yLabel: "% y-on-y", decimals: 2 },
  "chart-inflation": { series: INFLATION_SERIES, unit: "%", yLabel: "% y-on-y", decimals: 2 },
  "chart-gdppc": { series: GDP_PER_CAPITA, unit: "", yLabel: "US$", decimals: 0 },
  "chart-unemp": { series: UNEMPLOYMENT_SERIES, unit: "%", yLabel: "%", decimals: 2 },
  "chart-part": { series: PARTICIPATION_SERIES, unit: "%", yLabel: "%", decimals: 2 },
  "chart-life": { series: LIFE_EXPECTANCY, unit: "", yLabel: "Tahun", decimals: 1 },
  "chart-literacy": { series: LITERACY_SERIES, unit: "%", yLabel: "%", decimals: 1 },
  "chart-schooling": { series: SCHOOLING_SERIES, unit: "", yLabel: "Tahun", decimals: 1 },
};

/** Draw every chart canvas currently in the page, in its chosen kind. */
export function drawAllCharts(kindById) {
  for (const [id, spec] of Object.entries(CHARTS)) {
    const canvas = document.getElementById(id);
    if (!canvas) continue;
    drawChart(canvas, spec.series, kindById[id] || "bar", spec);
  }
}

/** Province rows, filtered by search text and island, sorted by key. */
export function provinceRows(query, island, sortKey, sortDir) {
  const q = query.trim().toLowerCase();
  const rows = PROVINCES.filter(
    (p) =>
      (island === "Semua" || p.island === island) &&
      (q === "" || p.name.toLowerCase().includes(q))
  );
  const dir = sortDir === "desc" ? -1 : 1;
  rows.sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv), "id") * dir;
  });
  return rows;
}
