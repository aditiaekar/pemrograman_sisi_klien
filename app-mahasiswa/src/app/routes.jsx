import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout"; // layout auth
import AdminLayout from "../layouts/AdminLayout"; // layout admin

import LoginPage from "../pages/auth/LoginPage"; // halaman login
import DashboardPage from "../pages/admin/DashboardPage"; // dashboard admin
import MahasiswaList from "../pages/admin/mahasiswa/MahasiswaList";
import MahasiswaDetail from "../pages/admin/mahasiswa/MahasiswaDetail";

// ProtectedRoute: cek localStorage "auth"
function ProtectedRoute() {
  const raw = localStorage.getItem("auth");
  const isAuthed = !!raw; // bisa tambah validasi expiry dsb.
  return isAuthed ? <Outlet /> : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LAYOUT AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* LAYOUT ADMIN + PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            {/* Nested routes di dalam Admin */}
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="mahasiswa">
              <Route index element={<MahasiswaList />} />
              <Route path=":nim" element={<MahasiswaDetail />} />
            </Route>
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
