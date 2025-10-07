// Data Awal
const mataKuliahList = {
  mataKuliah: [
    { kode: "MK001", nama: "Algoritma", sks: 3 },
    { kode: "MK002", nama: "Basis Data", sks: 3 },
    { kode: "MK003", nama: "Pemrograman Web", sks: 4 },
  ],
};

const mahasiswaList = {
  mahasiswa: [
    {
      nim: "22001",
      nama: "Budi Santoso",
      status: true,
      matkul: [
        { matkulId: "MK001", tugas: 85, uts: 80, uas: 90 },
        { matkulId: "MK002", tugas: 75, uts: 70, uas: 80 },
      ],
    },
    {
      nim: "22002",
      nama: "Siti Aminah",
      status: true,
      matkul: [
        { matkulId: "MK001", tugas: 90, uts: 88, uas: 85 },
        { matkulId: "MK003", tugas: 80, uts: 82, uas: 78 },
      ],
    },
  ],
};

// ✅ Menampilkan semua data mahasiswa
const show = () => {
  if (mahasiswaList.mahasiswa.length === 0) return console.log("❌ Tidak ada data mahasiswa.");
  mahasiswaList.mahasiswa.forEach((mhs) => {
    console.log(`\nNIM: ${mhs.nim}, Nama: ${mhs.nama}, Status: ${mhs.status ? "Aktif" : "Tidak Aktif"}`);
    console.log("Mata Kuliah:");
    mhs.matkul.forEach((mk) => {
      const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
      console.log(`- ${matkul.nama}: Tugas ${mk.tugas}, UTS ${mk.uts}, UAS ${mk.uas}`);
    });
  });
};

// ✅ Menambah mahasiswa baru
const add = (mahasiswa) => {
  const exist = mahasiswaList.mahasiswa.some((m) => m.nim === mahasiswa.nim);
  if (exist) return console.log("❌ NIM sudah terdaftar!");
  mahasiswaList.mahasiswa.push(mahasiswa);
  console.log(`✅ Mahasiswa ${mahasiswa.nama} berhasil ditambahkan.`);
};

// ✅ Mengupdate data mahasiswa berdasarkan NIM
const update = (nim, dataBaru) => {
  const index = mahasiswaList.mahasiswa.findIndex((m) => m.nim === nim);
  if (index === -1) return console.log("❌ Mahasiswa tidak ditemukan!");
  mahasiswaList.mahasiswa[index] = { ...mahasiswaList.mahasiswa[index], ...dataBaru };
  console.log(`✅ Data mahasiswa ${nim} berhasil diperbarui.`);
};

// ✅ Menghapus mahasiswa berdasarkan NIM
const deleteById = (nim) => {
  const awal = mahasiswaList.mahasiswa.length;
  mahasiswaList.mahasiswa = mahasiswaList.mahasiswa.filter((m) => m.nim !== nim);
  if (awal === mahasiswaList.mahasiswa.length) console.log("❌ Mahasiswa tidak ditemukan!");
  else console.log(`✅ Mahasiswa ${nim} berhasil dihapus.`);
};

// ✅ Menghitung total nilai tiap matkul dengan bobot 30/30/40
const totalNilai = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
  if (!mahasiswa) return "Mahasiswa tidak ditemukan";

  return mahasiswa.matkul.map((mk) => {
    const total = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
    return { matkulId: mk.matkulId, total: total.toFixed(2) };
  });
};

// ✅ Kategori nilai berdasarkan angka
const kategoriNilai = (nilai) => {
  if (nilai >= 85) return "A";
  if (nilai >= 75) return "B";
  if (nilai >= 65) return "C";
  if (nilai >= 50) return "D";
  return "E";
};

// ✅ Menghitung IPS mahasiswa
const IPS = (nim) => {
  const mahasiswa = mahasiswaList.mahasiswa.find((m) => m.nim === nim);
  if (!mahasiswa) return "Mahasiswa tidak ditemukan";

  const totalSks = mahasiswa.matkul.reduce((sum, mk) => {
    const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
    return sum + matkul.sks;
  }, 0);

  const totalNilaiBobot = mahasiswa.matkul.reduce((sum, mk) => {
    const matkul = mataKuliahList.mataKuliah.find((m) => m.kode === mk.matkulId);
    const nilai = mk.tugas * 0.3 + mk.uts * 0.3 + mk.uas * 0.4;
    return sum + nilai * matkul.sks;
  }, 0);

  const ips = totalNilaiBobot / totalSks;
  return ips.toFixed(2);
};

// ✅ Menghapus semua data mahasiswa
const clear = () => {
  mahasiswaList.mahasiswa = [];
  console.log("✅ Semua data mahasiswa telah dihapus.");
};

// 📊 Fungsi pada Array of Object

// ✅ Menghitung jumlah mahasiswa
const jumlahMahasiswa = () => mahasiswaList.mahasiswa.length;

// ✅ Mengurutkan berdasarkan NIM
const sortByNIM = () => {
  mahasiswaList.mahasiswa.sort((a, b) => a.nim.localeCompare(b.nim));
  console.log("✅ Data diurutkan berdasarkan NIM.");
};

// ✅ Mengurutkan berdasarkan status aktif/tidak
const sortByStatus = () => {
  mahasiswaList.mahasiswa.sort((a, b) => b.status - a.status);
  console.log("✅ Data diurutkan berdasarkan status (aktif → tidak aktif).");
};

// ✅ Menghitung jumlah mahasiswa aktif dan tidak aktif
const jumlahAktifTidak = () => {
  return {
    aktif: mahasiswaList.mahasiswa.filter((m) => m.status).length,
    tidakAktif: mahasiswaList.mahasiswa.filter((m) => !m.status).length,
  };
};

// ✅ Menghapus semua data mahasiswa dari array
const clearArray = () => {
  mahasiswaList.mahasiswa.length = 0;
  console.log("✅ Semua data mahasiswa dihapus dari array.");
};

// show();
add({
  nim: "22003",
  nama: "Andi Setiawan",
  status: true,
  matkul: [{ matkulId: "MK003", tugas: 88, uts: 85, uas: 90 }],
});
update("22001", { status: false });
deleteById("22002");

console.log("Total Nilai 22001:", totalNilai("22001"));
console.log("IPS Mahasiswa 22001:", IPS("22001"));
console.log("Jumlah Mahasiswa:", jumlahMahasiswa());
console.log("Jumlah Aktif/Tidak:", jumlahAktifTidak());
sortByNIM();
sortByStatus();
show();