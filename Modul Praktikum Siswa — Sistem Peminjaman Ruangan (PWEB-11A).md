# Modul Praktikum Siswa — Sistem Peminjaman Ruangan (PWEB-11A)

Oct 28, 2026 · @Guru SMK

## Pendahuluan

Di praktikum ini kamu melengkapi aplikasi **Sistem Peminjaman Ruangan** sampai semua tes `npm run uji` bertanda ✅ dan aplikasinya berjalan di browser.

Aplikasi ini mencatat siapa yang meminjam ruangan (Lab Komputer, Aula, Ruang Rapat, Ruang Kelas), untuk berapa orang, dan berapa lama. Semuanya berjalan di browser tanpa server dan tanpa internet.

**Setelah praktikum ini kamu bisa:**

- memecah program menjadi beberapa modul dengan `import` dan `export`;
- menulis fungsi murni dan menyimpan data dengan `Map`;
- memisahkan logika (tanpa DOM) dari tampilan (`main.js`);
- membaca hasil tes otomatis, lalu memperbaiki kode sampai lulus.

**Hasil akhir yang dikumpulkan:** satu folder proyek yang semua tesnya ✅ dan lolos Daftar Periksa Tampilan di bagian akhir modul ini.

## Persiapan

Siapkan tiga alat berikut sebelum mulai. Semuanya gratis dan bisa dipakai offline setelah terpasang.

| Alat | Fungsi | Cara mengecek |
| --- | --- | --- |
| VS Code | Menulis kode | Bisa membuka folder proyek |
| Ekstensi Live Server | Menjalankan `index.html` lewat alamat `http://` | Ada tombol **Go Live** di pojok kanan bawah VS Code |
| Node.js versi 18 atau lebih baru | Menjalankan `npm run uji` | Ketik `node -v` di terminal, muncul `v18` atau angka lebih besar |

**Langkah membuka proyek:**

1. Ekstrak berkas zip dari guru sesuai levelmu, misalnya `level-2-sedang.zip`.
2. Di VS Code pilih **File → Open Folder**, lalu pilih folder hasil ekstrak.
3. Buka terminal lewat **Terminal → New Terminal**.
4. Ketik `npm run uji`, tekan Enter. Kamu akan melihat skor awal, misalnya `SKOR AKHIR: 7/32`.

> Jangan membuka `index.html` dengan klik dua kali. Alamatnya menjadi `file://` dan browser memblokir ES Modules. Selalu gunakan Live Server.

Berkas yang **tidak boleh diubah**: `uji-logika.mjs`, `index.html`, `style.css`, dan `package.json`.

## Level Pengerjaan

Guru menentukan levelmu. Ketiga level menghasilkan aplikasi yang sama dan diuji dengan 32 tes yang sama, yang berbeda hanya seberapa banyak kode yang sudah disediakan.

|  | Level 1 — Mudah | Level 2 — Sedang | Level 3 — Sulit |
| --- | --- | --- | --- |
| Bentuk tugas | Mengganti setiap `___` dengan jawaban yang tepat | Menulis isi fungsi mengikuti LANGKAH di komentar | Menulis semua kode dari spesifikasi |
| Yang sudah disediakan | Hampir semua kode + petunjuk jawaban | Nama fungsi, parameter, langkah, sebagian `main.js` | Nama, parameter, aturan, dan contoh input-output |
| TODO `data.js` | 1.1 | 1.1 | 1.1 |
| TODO `helper.js` | 2.1 – 2.5 | 2.1 – 2.2 | 2.1 – 2.2 |
| TODO `peminjaman.js` | 3.1 – 3.7 | 3.1 – 3.6 | 3.1 – 3.7 |
| TODO `main.js` | 4.1 – 4.6 | 4.1 – 4.5 | 4.1 – 4.7 |
| Skor awal `npm run uji` | 8/32 | 7/32 | 3/32 |

Sudah selesai lebih cepat? Minta izin guru untuk mencoba level berikutnya.

**Isi folder setiap level:**

| Berkas | Peran | Kamu ubah? |
| --- | --- | --- |
| `data.js` | Data daftar ruangan | Ya (Tugas 1) |
| `helper.js` | Fungsi murni pembantu | Ya (Tugas 2) |
| `peminjaman.js` | State peminjaman dengan `Map` | Ya (Tugas 3) |
| `main.js` | Satu-satunya berkas yang memakai DOM | Ya (Tugas 4) |
| `index.html`, `style.css` | Kerangka dan tampilan halaman | Tidak |
| `uji-logika.mjs`, `package.json` | Penguji otomatis | Tidak |

&#91;embedded content: hubungan antar-modul · 6 berkas\]

Panah menunjukkan arah `import`: `main.js` mengambil data dan fungsi dari tiga modul logika, lalu menampilkannya di halaman. Karena tiga modul logika tidak memakai DOM, ketiganya bisa dites di terminal.

## Cara Bekerja dengan Tes

Kerjakan sedikit demi sedikit: perbaiki satu ❌ paling atas, simpan, uji lagi, ulangi sampai skor 32/32.

&#91;embedded content: siklus kerja · tulis, simpan, uji, perbaiki\]

Contoh potongan hasil `npm run uji` dan cara membacanya:

```
🧰 TUGAS 2 — helper.js
  ✅ formatDurasi(2) -> '2 jam'
  ❌ formatDurasi(1.5) -> '1 jam 30 menit'
     ↳ diharapkan: '1 jam 30 menit', didapat: '1 jam 0 menit'
     ↳ petunjuk: 1.5 jam = 90 menit = 1 jam (90 / 60 dibulatkan ke bawah) sisa 30 menit (90 % 60).
     Skor bagian ini: 8/9
```

| Tanda | Artinya | Yang kamu lakukan |
| --- | --- | --- |
| ✅ | Bagian ini sudah benar | Lanjut ke ❌ berikutnya |
| ❌ | Belum benar | Baca baris ↳ di bawahnya |
| ↳ diharapkan / didapat | Hasil yang benar dibanding hasil kodemu | Cari bagian kode yang membuat hasilnya berbeda |
| ↳ error | Kodemu berhenti karena error | Baca pesannya; sering berarti fungsi belum dibuat atau ada `___` tersisa |
| ↳ petunjuk | Saran perbaikan | Ikuti, lalu uji lagi |
| ⚠️ GAGAL DIMUAT | Ada salah ketik di berkas itu | Periksa kurung, koma, kutip, dan kurawal |

**Kebiasaan yang membantu:**

- Simpan dulu (Ctrl+S) sebelum menjalankan `npm run uji`.
- Tekan panah atas di terminal untuk mengulang perintah terakhir.
- Jangan menulis banyak kode sekaligus. Satu TODO, satu kali uji.

## Tugas 1 — data.js

**Target:** bagian TUGAS 1 di `npm run uji` menunjukkan **5/5**. TODO yang dikerjakan: 1.1 (semua level).

**Poin penulisan:**

1. Awali dengan `export const daftarRuangan = [` dan tutup dengan `];`.
2. Satu ruangan ditulis sebagai satu objek `{ ... }`. Antar-objek dipisahkan koma.
3. Ada empat properti wajib dengan ejaan persis: `id`, `namaRuangan`, `kapasitas`, `fasilitas`.
4. `kapasitas` ditulis sebagai angka tanpa tanda kutip. `fasilitas` ditulis sebagai array teks di dalam `[ ]`.
5. Setiap `id` harus berbeda, dan jumlah ruangan minimal 4.
6. Berkas ini hanya berisi data, tanpa fungsi dan tanpa kode DOM.

```js
// BENAR
{ id: 'R05', namaRuangan: 'Perpustakaan', kapasitas: 40, fasilitas: ['AC', 'Rak Buku'] },

// SALAH: namaruangan salah ejaan, kapasitas berupa teks, fasilitas bukan array
{ id: 'R05', namaruangan: 'Perpustakaan', kapasitas: '40', fasilitas: 'AC' },
```

**Cek pemahaman:** buka Console browser (F12), lalu ketik `'9' <= '40'` dan `9 <= 40`. Mengapa hasilnya berbeda, dan mengapa `kapasitas` wajib berupa angka?

## Tugas 2 — helper.js

**Target:** bagian TUGAS 2 menunjukkan **9/9**. TODO: Mudah 2.1 – 2.5 · Sedang 2.1 – 2.2 · Sulit 2.1 – 2.2.

Hitung dengan tangan dulu sebelum menulis `formatDurasi`. Isi baris terakhir sendiri.

| jam | totalMenit (jam × 60) | jamPenuh (dibagi 60, bulat ke bawah) | sisaMenit (sisa bagi 60) | Hasil |
| --- | --- | --- | --- | --- |
| 2 | 120 | 2 | 0 | `'2 jam'` |
| 1.5 | 90 | 1 | 30 | `'1 jam 30 menit'` |
| 0.5 | 30 | 0 | 30 | `'30 menit'` |
| 2.25 | … | … | … | … |

**Poin penulisan `formatDurasi(jam)`:**

1. Tolak input yang tidak valid di baris paling awal, lalu langsung `return` (return dini).
2. Ubah ke menit dengan `jam * 60`, lalu bulatkan dengan `Math.round`.
3. `jamPenuh` memakai `Math.floor(totalMenit / 60)`. `sisaMenit` memakai operator `%`.
4. Ada tiga kemungkinan teks: hanya menit, hanya jam, serta jam dan menit. Susun dengan template literal `` `${...}` ``.

**Poin penulisan `cekKapasitas(jumlahOrang, kapasitasRuang)`:**

1. Gabungkan dua syarat dengan `&&`: lebih dari 0, dan tidak melebihi kapasitas (`<=`).
2. Hasil perbandingan sudah berupa `true`/`false`, jadi cukup satu baris `return` tanpa `if`.

**Aturan fungsi murni:** hanya `return`. Jangan ada `console.log`, `alert`, atau `document` di berkas ini.

## Tugas 3 — peminjaman.js

**Target:** bagian TUGAS 3 menunjukkan **18/18**. TODO: Mudah 3.1 – 3.7 · Sedang 3.1 – 3.6 · Sulit 3.1 – 3.7.

`Map` menyimpan pasangan **kunci → nilai**. Kuncinya id ruangan, jadi satu ruangan otomatis tidak bisa tercatat dua kali.

| Method / properti `Map` | Kegunaan | Hasil |
| --- | --- | --- |
| `.set(kunci, nilai)` | Menyimpan data | Map itu sendiri |
| `.has(kunci)` | Mengecek apakah kunci ada | `true` / `false` |
| `.delete(kunci)` | Menghapus data | `true` jika ada yang terhapus |
| `.size` | Jumlah data (tanpa tanda kurung) | angka |
| `.values()` | Semua nilai | diubah ke array dengan `Array.from(...)` |
| `.clear()` | Menghapus semua data | tidak ada |

Urutan validasi di `pinjamRuangan` (berhenti di validasi pertama yang gagal):

| No | Gagal jika | Contoh pesan |
| --- | --- | --- |
| 1 | ruangan tidak ada | Ruangan belum dipilih atau tidak ditemukan. |
| 2 | ruangan sedang dipinjam | Aula sedang dipinjam. |
| 3 | nama kosong atau hanya spasi | Nama peminjam wajib diisi. |
| 4 | jumlah orang tidak muat | Jumlah orang harus 1 sampai 20. |
| 5 | durasi bukan angka atau ≤ 0 | Durasi harus lebih dari 0 jam. |

**Poin penulisan:**

1. Import `cekKapasitas` dari `'./helper.js'`, lengkap dengan `./` dan `.js`.
2. `daftarPinjaman` dibuat dengan `new Map()` dan tidak di-export (state privat).
3. Setiap validasi yang gagal langsung `return { berhasil: false, pesan: '...' }`.
4. Cek `!ruangan` paling awal, sebelum memakai `ruangan.id`.
5. Panggil `.set()` hanya setelah semua validasi lolos. Simpan nama dengan `.trim()`.
6. Fungsi lainnya cukup satu baris memakai method pada tabel di atas.
7. Jangan memakai `alert`. Kembalikan objek hasil, biar `main.js` yang menampilkannya.

## Tugas 4 — main.js

**Kerjakan setelah skor 32/32.** Target: semua butir Daftar Periksa Tampilan tercentang. TODO: Mudah 4.1 – 4.6 · Sedang 4.1 – 4.5 · Sulit 4.1 – 4.7.

`main.js` tidak dites di terminal karena memakai DOM. Jalankan `index.html` dengan Live Server dan buka Console (F12) setiap kali menyimpan.

**Poin penulisan:**

1. Import dengan `./` di depan dan `.js` di belakang nama berkas.
2. Ambil elemen dengan `document.querySelector('#id')`. Id-nya harus sama persis dengan `index.html`.
3. Pola setiap fungsi tampilan: kosongkan wadah → `forEach` data → `createElement` → isi → `appendChild`.
4. Teks dari ketikan pengguna (nama peminjam) ditampilkan dengan `textContent`, bukan `innerHTML`.
5. Fungsi `perbaruiTampilan()` memanggil semua fungsi tampilan. Panggil fungsi itu setiap kali data berubah, dan sekali di akhir berkas.
6. Di event `submit`, `event.preventDefault()` ditulis paling awal. Nilai input diubah ke angka dengan `Number()`.
7. Tombol Batalkan memakai satu listener di `#isi-tabel` (event delegation). Id ruangan dibaca dari `tombol.dataset.id`.

**Membaca error di Console:** pesan merah selalu menyebut nama berkas dan nomor baris di sebelah kanan, misalnya `main.js:42`. Klik tulisan itu untuk melompat ke baris yang salah.

## Daftar Periksa Tampilan

Coba setiap butir di browser (Live Server), lalu centang yang berhasil. Setiap butir bernilai 3 poin.

- [ ] 1\. Katalog menampilkan semua ruangan dari `data.js`: nama, kapasitas, dan fasilitas.
- [ ] 2\. Setiap kartu menampilkan status **Tersedia** berwarna hijau.
- [ ] 3\. Dropdown berisi semua ruangan beserta kapasitas maksimalnya.
- [ ] 4\. Meminjam dengan data benar memunculkan pesan hijau, dan form kembali kosong.
- [ ] 5\. Baris baru muncul di tabel dengan durasi berformat, misalnya "1 jam 30 menit".
- [ ] 6\. Total ruangan dipinjam bertambah sesuai jumlah baris tabel.
- [ ] 7\. Kartu ruangan yang dipinjam berubah menjadi **Dipinjam** (merah), dan ruangan itu tidak bisa dipilih lagi di dropdown.
- [ ] 8\. Jumlah orang melebihi kapasitas memunculkan pesan merah, dan tidak ada baris baru.
- [ ] 9\. Tombol Batalkan menghapus barisnya, total berkurang, dan status kembali Tersedia.
- [ ] 10\. Nama `<b>Tes</b>` tampil apa adanya (tidak menjadi tebal), dan Console (F12) tanpa error merah.

## Perolehan Poin

Nilai maksimal 100, dihitung dari tiga komponen yang sama untuk semua level.

| Komponen | Cara menghitung | Poin maks |
| --- | --- | --- |
| A. Tes otomatis | (jumlah tes lulus ÷ 32) × 60. Tugas 1 = 5 tes, Tugas 2 = 9 tes, Tugas 3 = 18 tes | 60 |
| B. Daftar Periksa Tampilan | 3 poin untuk setiap butir yang berhasil | 30 |
| C. Kerapian dan pemahaman | Nama variabel jelas dan ada komentarmu sendiri (5), mampu menjelaskan alur kode kepada guru (5) | 10 |
| Bonus | Mengerjakan TANTANGAN di akhir berkas, 5 poin per tantangan | +10 |

```latex
\text{Nilai} = \frac{\text{tes lulus}}{32} \times 60 + 3 \times \text{butir tercentang} + C
```

Contoh: 28 tes lulus, 9 butir tercentang, dan C = 8 menghasilkan 52,5 + 27 + 8 = 87,5, dibulatkan menjadi 88. Bonus hanya menambah sampai nilai 100.

Skor A bisa kamu lihat sendiri di baris `SKOR AKHIR` setiap kali menjalankan `npm run uji`.

## Kesalahan Umum dan Cara Mengatasinya

Cocokkan pesan yang kamu lihat dengan kolom pertama, lalu ikuti solusinya.

| Pesan atau gejala | Penyebab | Solusi |
| --- | --- | --- |
| `___ is not defined` | Masih ada `___` yang belum diganti (Level 1) | Cari `___` dengan Ctrl+F di berkas yang disebut |
| `fungsi ... belum dibuat atau belum di-export` | Lupa kata `export`, atau nama fungsi salah ketik | Tulis `export function namaFungsi(...)` dengan ejaan persis |
| `⚠️ ... GAGAL DIMUAT` | Salah ketik: kurung, koma, kutip, atau kurawal | Lihat garis merah di VS Code pada berkas itu |
| `Cannot read properties of undefined (reading 'id')` | Memakai `ruangan.id` padahal ruangan kosong | Taruh `if (!ruangan)` paling awal |
| `didapat: undefined` | Fungsi tidak punya `return` | Tambahkan `return` di depan hasilnya |
| `npm` tidak dikenali | Node.js belum terpasang | Pasang Node.js, lalu buka ulang VS Code |
| `Missing script: "uji"` | Terminal tidak berada di folder proyek | Buka folder yang berisi `package.json` lewat File → Open Folder |
| Halaman kosong, Console: *CORS policy* | `index.html` dibuka dengan klik dua kali | Jalankan dengan Live Server |
| Console: *404 ... /data* | Import ditulis tanpa `.js` | Tulis `'./data.js'`, bukan `'./data'` |
| Data hilang setelah klik Pinjam | Lupa `event.preventDefault()` | Tulis di baris pertama event submit |
| Pesan selalu "Durasi harus lebih dari 0 jam." | Nilai input durasi masih berupa teks, dan Number.isFinite menolak teks | Ubah dengan `Number(inputDurasi.value)` |

## Refleksi

Jawab pertanyaan berikut di buku catatan atau di bagian bawah `README.md` proyekmu.

1. Mengapa hanya `main.js` yang boleh memakai DOM? Apa untungnya bagi pengujian otomatis?
2. Mengapa `Map` dengan kunci id ruangan cocok untuk mencegah satu ruangan dipinjam dua kali?
3. Tes mana yang paling lama kamu perbaiki? Apa penyebab kesalahannya?
4. Jika aplikasi perlu input baru "Keperluan" (misalnya Praktikum atau Rapat), berkas mana saja yang harus diubah?
5. Untuk pertemuan berikutnya, apakah kamu siap mencoba level yang lebih tinggi? Apa alasannya?
