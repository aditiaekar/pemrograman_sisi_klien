// object mahasiswa
const mahasiswa = {
  nim: "A11.2023.14997",
  nama: "Aditia Eka Ramadhan",
  umur: 21,
  status: true,
  matKul: [
    {
      matkulId: 4704,
      matkulNama: "pemsik",
      tugas: 85,
      uts: 100,
      uas: 50,
    },
    {
      matkulId: 4705,
      matkulNama: "daspro",
      tugas: 90,
      uts: 100,
      uas: 100,
    },
  ],
};

// array (banyak data, tetapi hanya menggunakan satu data)
const listMahasiswa = ["Aditia", "Eka"];

// array dengan 2 objek
const listMahasiswa2 = {
  nim: "A11.2023.14097",
  nama: "Heru",
  umur: 21,
  status: true,
  matKul: [
    {
      matkulId: 4704,
      matkulNama: "pemsik",
      tugas: 85,
      uts: 100,
      uas: 50,
    },
    {
      matkulId: 4705,
      matkulNama: "daspro",
      tugas: 90,
      uts: 100,
      uas: 100,
    },
  ],
};

console.log(mahasiswa);
console.log(listMahasiswa);
console.log(mahasiswa["nim"]);

// destruct object
const { nama, nim } = mahasiswa;
console.log(nama);

// destruct array dari list mata kuliah milik variable mahasiswa

const [matkul1, matkul2] = mahasiswa.matKul;
console.log(matkul1);

// es6 - spread operator

const mhs2 = {
  nim: "A11.2023.14097",
  nama: "Heru",
  umur: 21,
  status: true,
  matKul: [
    {
      matkulId: 4744,
      matkulNama: "alpro",
      tugas: 85,
      uts: 100,
      uas: 50,
    },
  ],
};

const listMhs = { ...mahasiswa, mhs2 };
console.log(listMhs);

// template literal
console.log(`nama saya ${nama}`);

// function
const jumlah = (a, b) => a + b;

console.log(`jumlah 10 + 8 = ${jumlah(10, 8)}`);
// Output: jumlah 10 + 8 = 18


// methode map, filter, dan reduce
