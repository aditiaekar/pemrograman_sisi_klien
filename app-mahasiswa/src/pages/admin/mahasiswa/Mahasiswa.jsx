import { useState } from "react";
import Card from "../../../design-system/molecules/Card/Card";
import Button from "../../../design-system/atoms/Button/Button";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";

import { confirmBeforeSave, confirmDeleteMahasiswa } from "../../../utils/swal";
import { toastSuccess, toastError } from "../../../utils/toast";

const INITIAL = [
  { nim: "20211002", nama: "Siti Aminah", status: true },
  { nim: "20211003", nama: "Ahmad Fauzi", status: true },
  { nim: "20211004", nama: "Dewi Lestari", status: false },
  { nim: "20211005", nama: "Rudi Hartono", status: true },
  { nim: "20211001", nama: "Budi Santoso", status: false },
];

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState(INITIAL);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const storeMahasiswa = (payload) => {
    if (mahasiswa.some((m) => m.nim === payload.nim)) {
      toastError("NIM sudah terdaftar");
      return false;
    }
    setMahasiswa((list) => [...list, payload]);
    toastSuccess("Data mahasiswa ditambahkan");
    return true;
  };

  const updateMahasiswa = (prevNim, payload) => {
    if (prevNim !== payload.nim && mahasiswa.some((m) => m.nim === payload.nim)) {
      toastError("NIM sudah terdaftar");
      return false;
    }
    setMahasiswa((list) => list.map((m) => (m.nim === prevNim ? payload : m)));
    toastSuccess("Perubahan disimpan");
    return true;
  };

  const deleteMahasiswa = (nim) => {
    setMahasiswa((list) => list.filter((m) => m.nim !== nim));
    toastSuccess("Data mahasiswa dihapus");
  };

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };
  const openEditModal = (nim) => {
    const row = mahasiswa.find((m) => m.nim === nim);
    if (!row) return toastError("Data tidak ditemukan");
    setSelectedMahasiswa(row);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (selectedMahasiswa) {
      const ok = await confirmBeforeSave();
      if (!ok) return; // batal simpan
      const saved = updateMahasiswa(selectedMahasiswa.nim, form);
      if (saved) {
        setModalOpen(false);
        setSelectedMahasiswa(null);
      }
    } else {
      const saved = storeMahasiswa(form);
      if (saved) setModalOpen(false);
    }
  };

  const handleDelete = async (nim) => {
    const ok = await confirmDeleteMahasiswa(nim);
    if (!ok) return;
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

      <MahasiswaTable mahasiswa={mahasiswa} openEditModal={openEditModal} onDelete={handleDelete} />

      <MahasiswaModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedMahasiswa(null);
        }}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </Card>
  );
}
