import { Link } from "react-router-dom";

const DATA = [
  { nim: "20211002", nama: "Siti Aminah" },
  { nim: "20211003", nama: "Ahmad Fauzi" },
  { nim: "20211004", nama: "Dewi Lestari" },
  { nim: "20211005", nama: "Rudi Hartono" },
  { nim: "20211001", nama: "Budi Santoso" },
];

export default function MahasiswaList() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Mahasiswa</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Tambah Mahasiswa</button>
      </div>

      <table className="w-full text-sm text-gray-700">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-2 px-4 text-left">NIM</th>
            <th className="py-2 px-4 text-left">Nama</th>
            <th className="py-2 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {DATA.map((m, i) => (
            <tr key={m.nim} className={i % 2 ? "bg-gray-100" : "bg-white"}>
              <td className="py-2 px-4">{m.nim}</td>
              <td className="py-2 px-4">{m.nama}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <Link to={`/admin/mahasiswa/${m.nim}`} className="bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700">
                  Detail
                </Link>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
