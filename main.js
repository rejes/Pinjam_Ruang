/* =====================================================================
 * BERKAS : main.js
 * TUGAS  : SATU-SATUNYA berkas yang boleh:
 *            1. Mengambil & mengubah elemen HTML (DOM)
 *            2. Memasang Event Listener (klik, submit, dll.)
 *
 * ALUR KERJA (baca dari atas ke bawah):
 *   LANGKAH 1 -> import data & fungsi dari modul lain
 *   LANGKAH 2 -> ambil elemen-elemen HTML
 *   LANGKAH 3 -> buat fungsi-fungsi untuk menampilkan data
 *   LANGKAH 4 -> pasang event listener (submit form & tombol batal)
 *   LANGKAH 5 -> tampilkan data pertama kali saat halaman dibuka
 *
 * HUBUNGAN ANTAR-MODUL:
 *   data.js -------> main.js <------- peminjaman.js <------- helper.js
 *   (data ruangan)   (tampilan)       (state Map)            (fungsi murni)
 *                       ^                                       |
 *                       +--------------- formatDurasi ----------+
 * ===================================================================== */

// =====================================================================
// LANGKAH 1: IMPORT
// CATATAN: Penulisan './' dan '.js' WAJIB lengkap di browser.
//          Menulis './data' (tanpa .js) akan menyebabkan error 404.
// =====================================================================
import { daftarRuangan } from './data.js';
import { formatDurasi, cariRuanganCocok } from './helper.js';
import {
  pinjamRuangan,
  batalkanPinjaman,
  hitungTotalDipinjam,
  sedangDipinjam,
  ambilDaftarPinjaman,
} from './peminjaman.js';

// =====================================================================
// LANGKAH 2: AMBIL ELEMEN HTML
// CATATAN: Nama di dalam querySelector('#...') harus SAMA PERSIS
//          dengan atribut id di index.html.
// =====================================================================
const elemenKatalog = document.querySelector('#katalog-ruangan');
const formPinjam = document.querySelector('#form-pinjam');
const pilihanRuangan = document.querySelector('#pilihan-ruangan');
const inputNama = document.querySelector('#nama-peminjam');
const inputJumlah = document.querySelector('#jumlah-orang');
const inputDurasi = document.querySelector('#durasi-jam');
const elemenPesan = document.querySelector('#pesan');
const isiTabel = document.querySelector('#isi-tabel');
const elemenTotal = document.querySelector('#total-dipinjam');

// TANTANGAN: elemen form pencarian
const inputCariJumlah = document.querySelector('#cari-jumlah');
const inputCariFasilitas = document.querySelector('#cari-fasilitas');
const elemenInfoCari = document.querySelector('#info-cari');

// =====================================================================
// LANGKAH 3: FUNGSI-FUNGSI TAMPILAN
// =====================================================================

/**
 * Menampilkan kartu-kartu ruangan di bagian Katalog.
 */
/**
 * TANTANGAN: Menentukan ruangan mana yang ditampilkan di katalog.
 * - Jumlah peserta kosong -> semua ruangan (urutan asli data.js).
 * - Jumlah peserta diisi  -> hasil cariRuanganCocok() dari helper.js.
 */
function ambilRuanganUntukKatalog() {
  if (inputCariJumlah.value === '') {
    elemenInfoCari.textContent = '';
    return daftarRuangan;
  }

  const hasilCari = cariRuanganCocok(
    daftarRuangan,
    Number(inputCariJumlah.value),
    inputCariFasilitas.value
  );
  elemenInfoCari.textContent = `Ditemukan ${hasilCari.length} ruangan yang cocok, diurutkan dari kapasitas terkecil.`;
  return hasilCari;
}

function tampilkanKatalog() {
  // Kosongkan dulu agar kartu tidak dobel saat ditampilkan ulang.
  elemenKatalog.innerHTML = '';

  const ruanganDitampilkan = ambilRuanganUntukKatalog();
  if (ruanganDitampilkan.length === 0) {
    elemenKatalog.innerHTML = '<p class="kosong">Tidak ada ruangan yang cocok.</p>';
    return;
  }

  ruanganDitampilkan.forEach((ruangan) => {
    const dipinjam = sedangDipinjam(ruangan.id);

    const kartu = document.createElement('article');
    kartu.className = 'kartu-ruangan';

    // CATATAN: innerHTML boleh dipakai di sini karena isinya berasal dari
    // data.js (data milik kita sendiri), BUKAN dari ketikan pengguna.
    kartu.innerHTML = `
      <h3>${ruangan.namaRuangan}</h3>
      <p>Kapasitas: ${ruangan.kapasitas} orang</p>
      <p>Fasilitas: ${ruangan.fasilitas.join(', ')}</p>
      <span class="status ${dipinjam ? 'status-dipinjam' : 'status-tersedia'}">
        ${dipinjam ? 'Dipinjam' : 'Tersedia'}
      </span>
    `;

    elemenKatalog.appendChild(kartu);
  });
}

/**
 * Mengisi pilihan (option) pada dropdown ruangan di form.
 * Ruangan yang sedang dipinjam dibuat tidak bisa dipilih (disabled).
 */
function tampilkanPilihanRuangan() {
  pilihanRuangan.innerHTML = '<option value="">-- Pilih ruangan --</option>';

  daftarRuangan.forEach((ruangan) => {
    const opsi = document.createElement('option');
    opsi.value = ruangan.id;
    opsi.textContent = `${ruangan.namaRuangan} (maks. ${ruangan.kapasitas} orang)`;

    if (sedangDipinjam(ruangan.id)) {
      opsi.disabled = true;
      opsi.textContent += ' - sedang dipinjam';
    }

    pilihanRuangan.appendChild(opsi);
  });
}

/**
 * Membuat satu sel tabel (<td>) berisi teks.
 *
 * CATATAN KEAMANAN: Kita memakai textContent, BUKAN innerHTML,
 * karena isinya (misalnya nama peminjam) berasal dari ketikan pengguna.
 * Jika pengguna mengetik kode HTML/JS, textContent akan menampilkannya
 * sebagai teks biasa sehingga kodenya tidak ikut dijalankan.
 */
function buatSel(isi) {
  const sel = document.createElement('td');
  sel.textContent = isi;
  return sel;
}

/**
 * Menampilkan daftar peminjaman di dalam tabel.
 */
function tampilkanTabelPinjaman() {
  const semuaPinjaman = ambilDaftarPinjaman();
  isiTabel.innerHTML = '';

  // Jika belum ada data, tampilkan satu baris keterangan.
  if (semuaPinjaman.length === 0) {
    isiTabel.innerHTML = `
      <tr>
        <td colspan="6" class="kosong">Belum ada ruangan yang dipinjam.</td>
      </tr>
    `;
    return;
  }

  semuaPinjaman.forEach((pinjaman, indeks) => {
    const baris = document.createElement('tr');

    baris.appendChild(buatSel(indeks + 1));
    baris.appendChild(buatSel(pinjaman.namaRuangan));
    baris.appendChild(buatSel(pinjaman.namaPeminjam));
    baris.appendChild(buatSel(`${pinjaman.jumlahOrang} orang`));
    baris.appendChild(buatSel(formatDurasi(pinjaman.durasiJam))); // <- dari helper.js

    // Tombol Batalkan.
    // CATATAN: dataset.id menyimpan id ruangan di atribut data-id pada tombol,
    // agar saat diklik kita tahu ruangan mana yang harus dibatalkan.
    const selAksi = document.createElement('td');
    const tombolBatal = document.createElement('button');
    tombolBatal.type = 'button';
    tombolBatal.className = 'tombol-batal';
    tombolBatal.textContent = 'Batalkan';
    tombolBatal.dataset.id = pinjaman.idRuangan;
    selAksi.appendChild(tombolBatal);
    baris.appendChild(selAksi);

    isiTabel.appendChild(baris);
  });
}

/**
 * Menampilkan pesan berhasil atau gagal di bawah form.
 * @param {string} teks
 * @param {'sukses'|'gagal'} jenis - menentukan warna pesan (lihat style.css)
 */
function tampilkanPesan(teks, jenis) {
  elemenPesan.textContent = teks;
  elemenPesan.className = `pesan pesan-${jenis}`;
}

/**
 * Memperbarui SELURUH tampilan sekaligus.
 * CATATAN: Setiap kali data berubah (pinjam/batal), cukup panggil fungsi ini.
 */
function perbaruiTampilan() {
  tampilkanKatalog();
  tampilkanPilihanRuangan();
  tampilkanTabelPinjaman();
  elemenTotal.textContent = hitungTotalDipinjam();
}

// =====================================================================
// LANGKAH 4: EVENT LISTENER
// =====================================================================

// 4a. Saat form dikirim (tombol "Pinjam Ruangan" diklik).
formPinjam.addEventListener('submit', (event) => {
  // CATATAN: preventDefault() mencegah halaman ter-refresh saat form dikirim.
  // Tanpa baris ini, semua data akan hilang!
  event.preventDefault();

  // Cari objek ruangan berdasarkan id yang dipilih di dropdown.
  const ruanganTerpilih = daftarRuangan.find(
    (ruangan) => ruangan.id === pilihanRuangan.value
  );

  // CATATAN: Nilai dari <input> SELALU berupa string, walaupun type="number".
  // Karena itu kita ubah menjadi angka dengan Number().
  const hasil = pinjamRuangan(
    ruanganTerpilih,
    inputNama.value,
    Number(inputJumlah.value),
    Number(inputDurasi.value)
  );

  if (hasil.berhasil) {
    tampilkanPesan(hasil.pesan, 'sukses');
    formPinjam.reset(); // kosongkan isi form
    perbaruiTampilan();
  } else {
    tampilkanPesan(hasil.pesan, 'gagal');
  }
});

// 4b. Saat tombol "Batalkan" di tabel diklik.
// CATATAN (Event Delegation): Kita TIDAK memasang listener di setiap tombol,
// tetapi cukup SATU listener di <tbody>. Ini karena tombol dibuat ulang
// setiap kali tabel diperbarui, sedangkan <tbody> selalu ada.
isiTabel.addEventListener('click', (event) => {
  // closest() mencari elemen terdekat yang punya class .tombol-batal.
  const tombol = event.target.closest('.tombol-batal');
  if (!tombol) return; // yang diklik bukan tombol batal -> abaikan

  const idRuangan = tombol.dataset.id;

  if (!confirm('Yakin ingin membatalkan peminjaman ini?')) return;

  if (batalkanPinjaman(idRuangan)) {
    tampilkanPesan('Peminjaman berhasil dibatalkan.', 'sukses');
    perbaruiTampilan();
  }
});

// 4c. TANTANGAN: Katalog diperbarui setiap kali isi form pencarian berubah.
// CATATAN: Event 'input' terjadi di setiap ketikan, jadi hasilnya langsung terlihat.
inputCariJumlah.addEventListener('input', tampilkanKatalog);
inputCariFasilitas.addEventListener('input', tampilkanKatalog);

// =====================================================================
// LANGKAH 5: TAMPILAN AWAL
// Dipanggil sekali saat halaman pertama kali dibuka.
// =====================================================================
perbaruiTampilan();

// TANTANGAN (opsional):
//  1. Tambahkan tombol "Pinjam" di setiap kartu katalog. Saat diklik,
//     dropdown di form otomatis memilih ruangan tersebut.
//  2. Tambahkan input "Keperluan" (misal: Praktikum, Rapat). Bagian mana saja
//     yang perlu diubah? (Petunjuk: index.html, peminjaman.js, main.js, dan tesnya)
