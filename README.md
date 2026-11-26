# NusaData — Statistik Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/blue-tama/stats-site/rank.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/blue-tama/stats-site/reward.svg)](https://make.fun/c/best-national-statistics-site-20261126-0539)

NusaData adalah situs statistik nasional Indonesia yang dibuat mandiri: angka-angka utama penduduk, ekonomi, ketenagakerjaan, kesehatan, pendidikan, dan provinsi — lengkap dengan sumber dan tahunnya.

## Angka utama

- **Penduduk:** 281,6 juta jiwa (BPS, 2024)
- **PDB:** US$1,37 triliun (World Bank, 2024)
- **Pertumbuhan ekonomi:** 5,03% pada 2024 — turun dari 5,05% pada 2023 (BPS)
- **Inflasi:** 1,57% pada 2024, terendah sejak 2020 (BPS)
- **Pengangguran terbuka:** 4,76% pada Agustus 2024, turun dari 5,32% (BPS)
- **Harapan hidup:** 71,7 tahun (World Bank, 2023), naik dari 69,8 tahun pada 2010
- **Melek huruf:** 96,5% (BPS, 2024)
- **Stunting balita:** 21,5% (Kemenkes SSGI, 2023)

## Menjalankan situsnya

Situs ini statis, tanpa build step dan tanpa permintaan jaringan. Sajikan `app/` dengan server HTTP statis apa pun, lalu buka `index.html`:

```sh
python3 -m http.server 8080 -d app
# lalu buka http://localhost:8080/
```

Tujuh bagian — Beranda, Penduduk, Ekonomi, Ketenagakerjaan, Kesehatan, Pendidikan, Provinsi — dijangkau lewat tautan (hash routes). Grafik digambar di canvas oleh kode situs sendiri; halaman Provinsi memuat tabel 20 provinsi terbesar dengan pencarian, filter pulau, dan pengurutan di semua kolom.

## Struktur

- `app/index.html` — kerangka halaman, header, navigasi, footer
- `app/style.css` — seluruh tampilan, responsif untuk ponsel
- `app/data.js` — semua angka beserta sumber dan tahunnya
- `app/charts.js` — grafik batang dan garis di canvas
- `app/views.js` — markup tiap bagian dan tabel provinsi
- `app/app.js` — router, menu ponsel, tombol grafik, kontrol tabel
- `main.ts` — menyalin `app/` dan `screenshots/` ke `/output` dan menulis `dossier.json`
- `screenshots/` — tangkapan layar situs yang sebenarnya

## Kompetisi

Entri untuk [Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539) di make.fun. Lisensi: MIT.
