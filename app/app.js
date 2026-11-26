// app.js — the router and the controls: hash routes, the phone menu,
// chart bar/line toggles, and the provinces table (search, island filter,
// column sorting). It wires the markup views.js builds to the data.

import { VIEWS, CHARTS, drawAllCharts, provinceRows } from "./views.js";
import { PROVINCES } from "./data.js";
import { drawChart } from "./charts.js";

const ROUTES = {
  beranda: "beranda",
  penduduk: "penduduk",
  ekonomi: "ekonomi",
  ketenagakerjaan: "ketenagakerjaan",
  kesehatan: "kesehatan",
  pendidikan: "pendidikan",
  provinsi: "provinsi",
};

const TITLES = {
  beranda: "NusaData — Statistik Indonesia",
  penduduk: "Penduduk — NusaData",
  ekonomi: "Ekonomi — NusaData",
  ketenagakerjaan: "Ketenagakerjaan — NusaData",
  kesehatan: "Kesehatan — NusaData",
  pendidikan: "Pendidikan — NusaData",
  provinsi: "Provinsi — NusaData",
};

// The chart kind the visitor last picked per canvas; defaults from markup.
const chartKind = {};
// Province table state: search text, island filter, sort key and direction.
const provState = { query: "", island: "Semua", sortKey: "population", sortDir: "desc" };

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return ROUTES[hash] || "beranda";
}

function renderProvTable() {
  const body = document.getElementById("prov-body");
  const count = document.getElementById("prov-count");
  if (!body) return;
  const rows = provinceRows(provState.query, provState.island, provState.sortKey, provState.sortDir);
  body.innerHTML = rows
    .map(
      (p) =>
        `<tr><td>${p.name}</td><td>${p.island}</td>` +
        `<td class="num">${p.population.toLocaleString("id-ID", { minimumFractionDigits: 2 })}</td>` +
        `<td class="num">${p.density.toLocaleString("id-ID")}</td></tr>`
    )
    .join("");
  if (count) {
    count.textContent =
      rows.length === PROVINCES.length
        ? `Menampilkan ${rows.length} provinsi`
        : `Menampilkan ${rows.length} dari ${PROVINCES.length} provinsi`;
  }
  document.querySelectorAll("#prov-table th[data-key]").forEach((th) => {
    const key = th.getAttribute("data-key");
    th.classList.toggle("sorted", key === provState.sortKey);
    th.textContent = th.textContent.replace(/ [▲▼]$/, "");
    if (key === provState.sortKey) th.textContent += provState.sortDir === "desc" ? " ▼" : " ▲";
  });
}

function wireProvControls() {
  const search = document.getElementById("prov-search");
  const island = document.getElementById("prov-island");
  if (search) {
    search.value = provState.query;
    search.addEventListener("input", () => {
      provState.query = search.value;
      renderProvTable();
    });
  }
  if (island) {
    island.value = provState.island;
    island.addEventListener("change", () => {
      provState.island = island.value;
      renderProvTable();
    });
  }
  document.querySelectorAll("#prov-table th[data-key]").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.getAttribute("data-key");
      if (provState.sortKey === key) {
        provState.sortDir = provState.sortDir === "desc" ? "asc" : "desc";
      } else {
        provState.sortKey = key;
        provState.sortDir = key === "name" || key === "island" ? "asc" : "desc";
      }
      renderProvTable();
    });
  });
  renderProvTable();
}

function wireChartToggles() {
  document.querySelectorAll(".chart-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-chart");
      const kind = btn.getAttribute("data-kind");
      chartKind[id] = kind;
      btn.parentElement.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b === btn));
      const canvas = document.getElementById(id);
      const spec = CHARTS[id];
      if (canvas && spec) drawChart(canvas, spec.series, kind, spec);
    });
  });
}

function render() {
  const route = currentRoute();
  const main = document.getElementById("main");
  main.innerHTML = VIEWS[route]();
  document.title = TITLES[route];
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + route);
    if (a.classList.contains("active")) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  // Remember each chart's default kind from its toggle markup.
  document.querySelectorAll(".chart-toggle button.active").forEach((b) => {
    chartKind[b.getAttribute("data-chart")] = b.getAttribute("data-kind");
  });
  drawAllCharts(chartKind);
  wireChartToggles();
  if (route === "provinsi") wireProvControls();
  document.getElementById("nav").classList.remove("open");
  window.scrollTo(0, 0);
}

function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("resize", () => drawAllCharts(chartKind));
document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  render();
});
