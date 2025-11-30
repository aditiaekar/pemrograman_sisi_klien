import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/admin/DashboardPage";
import Mahasiswa from "../pages/admin/mahasiswa/Mahasiswa";
import MahasiswaDetail from "../pages/admin/mahasiswa/MahasiswaDetail";
import Dosen from "../pages/admin/dosen/Dosen";
import MataKuliah from "../pages/admin/mata-kuliah/MataKuliah";
import RequireRole from "./guards/RequireRole";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* redirect root ke /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rute publik (pakai AuthLayout) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rute privat (pakai AdminLayout + guard) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="mahasiswa">
            <Route index element={
              <RequireRole allowedPermissions={["mahasiswa.manage"]}>
                <Mahasiswa />
              </RequireRole>
              } />
            <Route path=":nim" element={<MahasiswaDetail />} />
          </Route>
          <Route path="dosen" element={
            <RequireRole allowedPermissions={["dosen.manage"]}>
              <Dosen />
            </RequireRole>
            } />
          <Route path="mata-kuliah" element={
            <RequireRole allowedPermissions={["mk.manage"]}>
              <MataKuliah />
            </RequireRole>
          } />
        </Route>

        {/* fallback 404 */}
        <Route path="*" element={<div className="p-6">404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
