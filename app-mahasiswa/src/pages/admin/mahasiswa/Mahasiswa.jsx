import { useState } from "react";
import Card from "../../../design-system/molecules/Card/Card";
import Button from "../../../design-system/atoms/Button/Button";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";

const INITIAL = [
  { nim: "20211002", nama: "Siti Aminah",  status: true  },
  { nim: "20211003", nama: "Ahmad Fauzi",  status: true  },
  { nim: "20211004", nama: "Dewi Lestari", status: false },
  { nim: "20211005", nama: "Rudi Hartono", status: true  },
  { nim: "20211001", nama: "Budi Santoso", status: false },
];

export default function Mahasiswa() {
  // state utama
  const [mahasiswa, setMahasiswa] = useState(INITIAL);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // null = tambah
  const [isModalOpen, setModalOpen] = useState(false);

  // CRUD helpers
  const storeMahasiswa = (payload) => {
    // validasi unik NIM saat tambah
    const duplicated = mahasiswa.some(m => m.nim === payload.nim);
    if (duplicated) {
      alert("NIM sudah terdaftar");
      return false;
    }
    setMahasiswa(list => [...list, payload]);
    return true;
  };

  const updateMahasiswa = (prevNim, payload) => {
    // jika NIM diganti, pastikan unik
    if (prevNim !== payload.nim && mahasiswa.some(m => m.nim === payload.nim)) {
      alert("NIM sudah terdaftar");
      return false;
    }
    setMahasiswa(list => list.map(m => (m.nim === prevNim ? payload : m)));
    return true;
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa(list => list.filter(m => m.nim !== nim));
  };

  // UI handlers
  const openAddModal   = () => { setSelectedMahasiswa(null); setModalOpen(true); };
  const openEditModal  = (nim) => {
    const row = mahasiswa.find(m => m.nim === nim);
    if (!row) return;
    setSelectedMahasiswa(row);
    setModalOpen(true);
  };

  const handleSubmit = (form) => {
    // jika ada selected → update, jika tidak → tambah
    if (selectedMahasiswa) {
      if (!confirm("Simpan perubahan data mahasiswa?")) return;
      const ok = updateMahasiswa(selectedMahasiswa.nim, form);
      if (ok) { setModalOpen(false); setSelectedMahasiswa(null); }
    } else {
      const ok = storeMahasiswa(form);
      if (ok) setModalOpen(false);
    }
  };

  const handleDelete = (nim) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    deleteMahasiswa(nim);
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={openAddModal}>
          + Tambah Mahasiswa
        </Button>
      </div>

      <MahasiswaTable
        mahasiswa={mahasiswa}
        openEditModal={openEditModal}
        onDelete={handleDelete}
      />

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => { setModalOpen(false); setSelectedMahasiswa(null); }}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </Card>
  );
}
