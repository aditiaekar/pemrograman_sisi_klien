// src/pages/admin/mahasiswa/Mahasiswa.jsx

import { useState } from "react";
import Card from "../../../design-system/molecules/Card/Card";
import Button from "../../../design-system/atoms/Button/Button";
import MahasiswaModal from "./MahasiswaModal";
import MahasiswaTable from "./MahasiswaTable";

import {
  confirmBeforeSave,
  confirmDeleteMahasiswa,
} from "../../../utils/swal";
import { toastSuccess, toastError } from "../../../utils/toast";

import {
  useMahasiswaList,
  useCreateMahasiswa,
  useUpdateMahasiswa,
  useDeleteMahasiswa,
} from "../../../utils/hooks/useMahasiswaQuery";

export default function Mahasiswa() {
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // query list mahasiswa dari API
  const {
    data,
    isLoading,
    isError,
    error,
  } = useMahasiswaList();

  // normalisasi data (kalau API-mu pakai { data: [...] } atau langsung [])
  const mahasiswa = Array.isArray(data) ? data : data?.data ?? [];

  // mutation hooks
  const createMahasiswa = useCreateMahasiswa();
  const updateMahasiswa = useUpdateMahasiswa();
  const deleteMahasiswa = useDeleteMahasiswa();

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setModalOpen(true);
  };

  const openEditModal = (nim) => {
    const row = mahasiswa.find((m) => m.nim === nim);
    if (!row) {
      toastError("Data tidak ditemukan");
      return;
    }
    setSelectedMahasiswa(row);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    // validasi NIM duplikat di front-end (opsional, backend tetap sebaiknya cek juga)
    const nimSudahAda = mahasiswa.some(
      (m) =>
        m.nim === form.nim &&
        (!selectedMahasiswa || m.id !== selectedMahasiswa.id)
    );
    if (nimSudahAda) {
      toastError("NIM sudah terdaftar");
      return;
    }

    if (selectedMahasiswa) {
      const ok = await confirmBeforeSave();
      if (!ok) return;

      updateMahasiswa.mutate(
        {
          id: selectedMahasiswa.id, // asumsi data punya field id dari API
          payload: form,
        },
        {
          onSuccess: () => {
            toastSuccess("Perubahan disimpan");
            setModalOpen(false);
            setSelectedMahasiswa(null);
          },
          onError: () => {
            toastError("Gagal menyimpan perubahan");
          },
        }
      );
    } else {
      createMahasiswa.mutate(form, {
        onSuccess: () => {
          toastSuccess("Data mahasiswa ditambahkan");
          setModalOpen(false);
        },
        onError: () => {
          toastError("Gagal menambahkan mahasiswa");
        },
      });
    }
  };

  const handleDelete = async (nim) => {
    const ok = await confirmDeleteMahasiswa(nim);
    if (!ok) return;

    const row = mahasiswa.find((m) => m.nim === nim);
    if (!row) {
      toastError("Data tidak ditemukan");
      return;
    }

    deleteMahasiswa.mutate(row.id, {
      onSuccess: () => {
        toastSuccess("Data mahasiswa dihapus");
      },
      onError: () => {
        toastError("Gagal menghapus data mahasiswa");
      },
    });
  };

  if (isLoading) {
    return (
      <Card>
        <div>Memuat data mahasiswa...</div>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <div className="text-red-600">
          Terjadi kesalahan memuat data: {error?.message || "Unknown error"}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={openAddModal}
        >
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
