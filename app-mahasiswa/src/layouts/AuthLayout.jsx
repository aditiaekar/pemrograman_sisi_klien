import { Outlet } from "react-router-dom"; // slot untuk nested route
export default function AuthLayout() {
  // layout auth sederhana
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {" "}
      {/* pusatkan konten */}
      <Outlet /> {/* render halaman anak (login, dsb.) */}
    </div>
  );
}
