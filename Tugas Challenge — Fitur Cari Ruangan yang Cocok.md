# Tugas Challenge — Fitur "Cari Ruangan yang Cocok"

Nov 5, 2026 · @Guru SMK

## Lembar Siswa

**Syarat mulai:** proyekmu sudah lulus `npm run uji` 32/32. **Target:** `npm run uji:tantangan` 10/10, `npm run uji` tetap 32/32, dan fitur berjalan di browser.

### Skenario

Bu Rina ingin mengadakan rapat untuk 30 orang dan membutuhkan AC. Saat ini ia harus membaca semua kartu ruangan satu per satu. Tugasmu: buat fitur pencarian yang langsung menampilkan ruangan yang **muat** dan **punya fasilitas yang dicari**, diurutkan dari kapasitas **terkecil**, agar aula besar tidak dipakai untuk kegiatan kecil.

### Spesifikasi fungsi (ditulis di `helper.js`)

```js
export function cariRuanganCocok(daftar, jumlahOrang, kataFasilitas = '') { ... }
```

| Aturan       | Keterangan                                                                                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Return       | Array **baru** berisi objek ruangan yang cocok                                                                                                                  |
| Muat         | Gunakan `cekKapasitas(jumlahOrang, ruangan.kapasitas)` yang sudah ada                                                                                           |
| Fasilitas    | Cocok jika salah satu fasilitas **mengandung** kata kunci. Huruf besar/kecil dan spasi di awal/akhir diabaikan. Kata kunci kosong berarti semua fasilitas cocok |
| Urutan       | Kapasitas terkecil lebih dulu                                                                                                                                   |
| Fungsi murni | Tidak boleh mengubah urutan array `daftar` aslinya, dan tidak memakai DOM                                                                                       |

Data uji yang dipakai penguji: **A** (36 orang: PC, Proyektor, AC), **B** (150 orang: Sound System, Proyektor), **C** (20 orang: Meja Rapat, Smart TV, AC), **D** (32 orang: Papan Tulis).

| Contoh pemanggilan (data uji)         | Hasil (id) |
| ------------------------------------- | ---------- |
| `cariRuanganCocok(ruangan, 30)`       | D, A, B    |
| `cariRuanganCocok(ruangan, 10, 'ac')` | C, A       |
| `cariRuanganCocok(ruangan, 200)`      | (kosong)   |

### Langkah kerja

1. Salin `uji-tantangan.mjs` dan `package.json` dari `tantangan-siswa.zip` ke folder proyekmu.
2. Jalankan `npm run uji:tantangan` dan tulis fungsi di `helper.js` sampai 10/10.
3. Di `index.html`, tambahkan dua input di bagian Katalog: `#cari-jumlah` (angka) dan `#cari-fasilitas` (teks), serta satu `<p id="info-cari">`.
4. Di `main.js`, ubah `tampilkanKatalog()` agar memakai hasil `cariRuanganCocok()` ketika jumlah peserta diisi, lalu pasang _event_ `input` pada kedua input.
5. Jika tidak ada hasil, tampilkan "Tidak ada ruangan yang cocok." Jika jumlah peserta kosong, tampilkan semua ruangan.

**Petunjuk:** pelajari method array `filter()`, `some()`, `includes()`, dan `sort()`. Hati-hati: `sort()` mengubah array yang dipanggilnya.

### Kriteria selesai

- [ ] `npm run uji:tantangan` = 10/10
- [ ] `npm run uji` tetap 32/32
- [ ] Mengetik 30 dan "ac" hanya menampilkan ruangan yang muat 30 orang dan ber-AC
- [ ] Mengosongkan jumlah peserta menampilkan semua ruangan lagi
- [ ] Console (F12) tanpa error merah

---

### Rubrik (skala 1–4)

| Aspek                            | 4                                                        | 3                                  | 2                    | 1            |
| -------------------------------- | -------------------------------------------------------- | ---------------------------------- | -------------------- | ------------ |
| Logika (`npm run uji:tantangan`) | 10/10                                                    | 8–9                                | 5–7                  | ≤ 4          |
| Integrasi tampilan               | Kelima kriteria selesai terpenuhi                        | 4 kriteria                         | 2–3 kriteria         | ≤ 1 kriteria |
| Penjelasan                       | Mampu menjelaskan alasan memakai `filter` sebelum `sort` | Menjelaskan dengan sedikit bantuan | Menjelaskan sebagian | Belum mampu  |

Nilai = (skor perolehan ÷ 12) × 100. Tugas challenge dapat dipakai sebagai bonus atau pengayaan bagi kelompok yang sudah mencapai 32/32.
