/* =====================================================================
 * BERKAS : helper.js
 * TUGAS  : Kumpulan FUNGSI MURNI (pure function) pembantu.
 *
 * APA ITU FUNGSI MURNI?
 *  1. Input yang sama -> hasil (return) SELALU sama.
 *  2. Tidak mengubah variabel di luar dirinya.
 *  3. Tidak menyentuh DOM (tidak ada document, alert, console.log).
 *  Karena sifat ini, fungsi murni sangat MUDAH DITES.
 *
 * DIPAKAI OLEH : peminjaman.js (cekKapasitas)
 *                main.js       (formatDurasi)
 *                uji-logika.mjs (keduanya dites)
 * ===================================================================== */

/**
 * Mengubah angka jam menjadi teks yang mudah dibaca.
 *
 * Contoh:
 *   formatDurasi(2)   -> '2 jam'
 *   formatDurasi(1.5) -> '1 jam 30 menit'
 *   formatDurasi(0.5) -> '30 menit'
 *   formatDurasi(0)   -> 'Durasi tidak valid'
 *
 * @param {number} jam - lama peminjaman dalam satuan jam
 * @returns {string}
 */
export function formatDurasi(jam) {
  // LANGKAH 1: Tolak nilai yang tidak masuk akal (bukan angka, 0, atau minus).
  // CATATAN: Number.isFinite() menolak NaN, Infinity, dan nilai bukan angka.
  if (!Number.isFinite(jam) || jam <= 0) {
    return 'Durasi tidak valid';
  }

  // LANGKAH 2: Ubah semua ke menit agar mudah dipecah.
  // Contoh: 1.5 jam x 60 = 90 menit
  const totalMenit = Math.round(jam * 60);

  // LANGKAH 3: Pecah menjadi jam penuh dan sisa menit.
  // Contoh: 90 menit -> 1 jam (90 / 60 dibulatkan ke bawah) sisa 30 menit (90 % 60)
  const jamPenuh = Math.floor(totalMenit / 60);
  const sisaMenit = totalMenit % 60;

  // LANGKAH 4: Susun teks sesuai kondisinya.
  if (jamPenuh === 0) {
    return `${sisaMenit} menit`;
  }
  if (sisaMenit === 0) {
    return `${jamPenuh} jam`;
  }
  return `${jamPenuh} jam ${sisaMenit} menit`;
}

/**
 * Mengecek apakah jumlah orang muat di dalam ruangan.
 *
 * Contoh:
 *   cekKapasitas(30, 36) -> true   (muat)
 *   cekKapasitas(40, 36) -> false  (melebihi kapasitas)
 *   cekKapasitas(0, 36)  -> false  (minimal harus 1 orang)
 *
 * @param {number} jumlahOrang    - jumlah orang yang akan memakai ruangan
 * @param {number} kapasitasRuang - kapasitas maksimal ruangan
 * @returns {boolean}
 */
export function cekKapasitas(jumlahOrang, kapasitasRuang) {
  // CATATAN: Operator && berarti "DAN". Hasilnya true hanya jika
  // KEDUA syarat terpenuhi: lebih dari 0 DAN tidak melebihi kapasitas.
  return jumlahOrang > 0 && jumlahOrang <= kapasitasRuang;
}

// TANTANGAN (opsional):
//  Buat fungsi murni baru `formatFasilitas(daftarFasilitas)` yang mengubah
//  ['PC', 'AC', 'Proyektor'] menjadi teks 'PC, AC, dan Proyektor'.
//  Jangan lupa tambahkan tesnya di uji-logika.mjs!

/* =====================================================================
 * TANTANGAN — FITUR "CARI RUANGAN YANG COCOK" (KUNCI JAWABAN)
 * ---------------------------------------------------------------------
 * Mengembalikan ARRAY BARU berisi ruangan yang:
 *   1. muat untuk jumlahOrang (memakai cekKapasitas di atas),
 *   2. memiliki fasilitas yang mengandung kataFasilitas
 *      (tidak peka huruf besar/kecil, spasi di awal/akhir diabaikan;
 *       jika kataFasilitas kosong, semua fasilitas dianggap cocok),
 *   3. diurutkan dari kapasitas TERKECIL, agar ruangan besar tidak
 *      dipakai untuk kegiatan kecil.
 *
 * CATATAN: Tetap fungsi murni. filter() selalu membuat array baru,
 * sehingga sort() tidak mengubah urutan daftarRuangan aslinya.
 *
 * Contoh:
 *   cariRuanganCocok(daftarRuangan, 30)        -> ruangan berkapasitas >= 30
 *   cariRuanganCocok(daftarRuangan, 10, 'ac')  -> yang muat 10 orang DAN ada AC
 * ===================================================================== */
export function cariRuanganCocok(daftar, jumlahOrang, kataFasilitas = '') {
  const kata = kataFasilitas.trim().toLowerCase();

  return daftar
    .filter((ruangan) => cekKapasitas(jumlahOrang, ruangan.kapasitas))
    .filter((ruangan) =>
      kata === '' ||
      ruangan.fasilitas.some((fasilitas) => fasilitas.toLowerCase().includes(kata))
    )
    .sort((a, b) => a.kapasitas - b.kapasitas);
}
