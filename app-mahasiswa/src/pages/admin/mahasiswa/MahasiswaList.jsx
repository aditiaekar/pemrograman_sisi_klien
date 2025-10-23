// src/pages/admin/mahasiswa/MahasiswaList.jsx
import { useState } from "react";

// UI (perhatikan path: file ini ada di /pages/admin/mahasiswa, jadi naik 3x)
import Card from "../../../design-system/molecules/Card/Card";
import Modal from "../../../design-system/organisms/Modal/Modal";
import Button from "../../../design-system/atoms/Button/Button";
import Label from "../../../design-system/atoms/Label/Label";
import Input from "../../../design-system/atoms/Input/Input";

const INITIAL = [
  { nim: "20211002", nama: "Siti Aminah", status: true },
  { nim: "20211003", nama: "Ahmad Fauzi", status: true },
  { nim: "20211004", nama: "Dewi Lestari", status: false },
  { nim: "20211005", nama: "Rudi Hartono", status: true },
  { nim: "20211001", nama: "Budi Santoso", status: false },
];

export default function MahasiswaList() {
  // --- STATE WAJIB (sesuai tugas) ---
  const [mahasiswa, setMahasiswa] = useState(INITIAL); // data tabel
  const [isModalOpen, setModalOpen] = useState(false); // kontrol modal
  // tambahan untuk reuse modal tambah/edit:
  const [editingNim, setEditingNim] = useState(null); // null = tambah, string = edit
  const [form, setForm] = useState({ nim: "", nama: "", status: true });
  const [errors, setErrors] = useState({}); // pesan error form

  // ---------- EVENT HANDLERS ----------
  // handleChange: tangkap perubahan input -> state form
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    // bersihkan error field yang baru diubah
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  // validasi form (wajib isi + NIM unik)
  const validate = () => {
    const err = {};
    const nim = form.nim.trim();
    const nama = form.nama.trim();

    if (!nim) err.nim = "NIM wajib diisi";
    else if (!/^\d+$/.test(nim)) err.nim = "NIM harus berupa angka";
    else {
      const duplicated = mahasiswa.some((m) => m.nim === nim && m.nim !== editingNim);
      if (duplicated) err.nim = "NIM sudah terdaftar";
    }

    if (!nama) err.nama = "Nama wajib diisi";
    return err;
  };

  // handleSubmit: tambah atau update ke state + konfirmasi
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    // normalisasi nilai
    const payload = {
      nim: form.nim.trim(),
      nama: form.nama.trim(),
      status: Boolean(form.status),
    };

    if (editingNim) {
      if (!confirm("Simpan perubahan data mahasiswa?")) return; // konfirmasi update
      setMahasiswa((list) => list.map((m) => (m.nim === editingNim ? payload : m)));
    } else {
      setMahasiswa((list) => [...list, payload]);
    }

    // reset modal
    closeModal();
  };

  // ---------- ACTIONS ----------
  const openAdd = () => {
    setEditingNim(null);
    setForm({ nim: "", nama: "", status: true });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (nim) => {
    const m = mahasiswa.find((x) => x.nim === nim);
    if (!m) return;
    setEditingNim(nim);
    setForm({ nim: m.nim, nama: m.nama, status: m.status });
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingNim(null);
    setForm({ nim: "", nama: "", status: true });
    setErrors({});
  };

  const handleDelete = (nim) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return; // konfirmasi delete
    setMahasiswa((list) => list.filter((m) => m.nim !== nim));
  };

  // ---------- RENDER ----------
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={openAdd}>
          + Tambah Mahasiswa
        </Button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((m, i) => (
            <tr key={m.nim} className={i % 2 ? "bg-gray-100" : "bg-white"}>
              <td className="py-2 px-4">{m.nim}</td>
              <td className="py-2 px-4">{m.nama}</td>
              <td className="py-2 px-4">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${m.status ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>{m.status ? "Aktif" : "Nonaktif"}</span>
              </td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" onClick={() => openEdit(m.nim)}>
                  Edit
                </Button>
                <Button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(m.nim)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
          {mahasiswa.length === 0 && (
            <tr>
              <td className="py-4 px-4 text-center text-gray-500" colSpan={4}>
                Belum ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Tambah/Edit (memakai komponen yang sama) */}
      <Modal open={isModalOpen} onClose={closeModal} title={editingNim ? "Edit Mahasiswa" : "Tambah Mahasiswa"}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="nim">NIM</Label>
            <Input id="nim" name="nim" value={form.nim} onChange={handleChange} placeholder="Masukkan NIM" required className={errors.nim ? "border-red-500" : ""} />
            {errors.nim && <p className="text-sm text-red-600 mt-1">{errors.nim}</p>}
          </div>

          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input id="nama" name="nama" value={form.nama} onChange={handleChange} placeholder="Masukkan nama" required className={errors.nama ? "border-red-500" : ""} />
            {errors.nama && <p className="text-sm text-red-600 mt-1">{errors.nama}</p>}
          </div>

          <div className="flex items-center gap-2">
            <input id="status" name="status" type="checkbox" checked={form.status} onChange={handleChange} />
            <Label htmlFor="status" className="!mb-0">
              Aktif
            </Label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
              Batal
            </Button>
            <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {editingNim ? "Simpan Perubahan" : "Simpan"}
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
