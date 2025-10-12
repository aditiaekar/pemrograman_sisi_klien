import { useState } from "react"; // state
import Card from "../../design-system/molecules/Card/Card"; // UI
import Button from "../../design-system/atoms/Button/Button"; // UI
import Modal from "../../design-system/organisms/Modal/Modal"; // UI

export default function DashboardPage() {
  // page daftar mahasiswa
  const [open, setOpen] = useState(false); // modal tambah
  const [rows, setRows] = useState([
    // data mock
    { nim: "20211002", nama: "Siti Aminah" },
    { nim: "20211003", nama: "Ahmad Fauzi" },
    { nim: "20211004", nama: "Dewi Lestari" },
    { nim: "20211005", nama: "Rudi Hartono" },
    { nim: "20211001", nama: "Budi Santoso" },
  ]);
  const [form, setForm] = useState({ nim: "", nama: "" }); // form state

  const submitForm = (e) => {
    e.preventDefault(); // cegah reload
    setRows((r) => [...r, form]); // tambah baris
    setForm({ nim: "", nama: "" }); // reset form
    setOpen(false); // tutup modal
  };

  const onDelete = (nim) => {
    if (confirm("Apakah Anda yakin ingin menghapus mahasiswa ini?")) {
      // konfirmasi browser
      setRows((r) => r.filter((x) => x.nim !== nim)); // hapus baris
    }
  };

  const onEdit = (nim) => {
    alert(`Edit mahasiswa ${nim}`); // placeholder edit
  };

  return (
    <Card>
      {" "}
      {/* kontainer kartu */}
      <div className="flex justify-between items-center mb-4">
        {" "}
        {/* header tabel */}
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setOpen(true)}>
          + Tambah Mahasiswa
        </Button>
      </div>
      <table className="w-full text-sm text-gray-700">
        {" "}
        {/* tabel data */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m, i) => (
            <tr key={m.nim} className={i % 2 ? "bg-gray-100" : "bg-white"}>
              {" "}
              {/* zebra rows */}
              <td className="py-2 px-4">{m.nim}</td>
              <td className="py-2 px-4">{m.nama}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Button className="bg-yellow-500 text-white px-2 py-1 hover:bg-yellow-600" onClick={() => onEdit(m.nim)}>
                  Edit
                </Button>{" "}
                {/* aksi edit */}
                <Button className="bg-red-500 text-white px-2 py-1 hover:bg-red-600" onClick={() => onDelete(m.nim)}>
                  Hapus
                </Button>{" "}
                {/* aksi hapus */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={open} onClose={() => setOpen(false)} title="Tambah Mahasiswa">
        {" "}
        {/* modal tambah */}
        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label className="block text-sm font-medium">NIM</label>
            <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={form.nim} onChange={(e) => setForm((f) => ({ ...f, nim: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium">Nama</label>
            <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300" value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} required />
          </div>
          <div className="flex justify-end space-x-2">
            {" "}
            {/* tombol modal */}
            <Button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-400 text-white hover:bg-gray-500">
              Batal
            </Button>
            <Button type="submit" className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </Card>
  );
}
