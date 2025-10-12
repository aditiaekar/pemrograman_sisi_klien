import { Outlet } from "react-router-dom"; // nested routes
import Sidebar from "../design-system/organisms/Sidebar/Sidebar"; // sidebar
import Header from "../design-system/organisms/Header/Header"; // header/topbar
import Footer from "../design-system/organisms/Footer/Footer"; // footer

export default function AdminLayout() {
  // layout admin
  return (
    <div className="h-screen flex">
      {" "}
      {/* full height, row */}
      <Sidebar /> {/* nav kiri */}
      <div className="flex-1 flex flex-col">
        {" "}
        {/* area konten */}
        <Header title="Mahasiswa" /> {/* judul/header */}
        <main className="flex-1 p-6 overflow-x-auto">
          {" "}
          {/* konten utama */}
          <Outlet /> {/* halaman anak */}
        </main>
        <Footer>© 2025 Admin Dashboard. All rights reserved.</Footer> {/* footer */}
      </div>
    </div>
  );
}
