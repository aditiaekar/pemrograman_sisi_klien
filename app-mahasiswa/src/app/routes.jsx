import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // routing
import { useAuth } from "./providers/AuthProvider"; // akses auth
import AuthLayout from "../layouts/AuthLayout"; // layout auth
import AdminLayout from "../layouts/AdminLayout"; // layout admin
import LoginPage from "../pages/auth/LoginPage"; // halaman login
import DashboardPage from "../pages/admin/DashboardPage"; // dashboard admin

function ProtectedRoute({ children }) {
  // guard route
  const { isAuthenticated } = useAuth(); // cek login
  return isAuthenticated ? children : <Navigate to="/login" replace />; // redirect jika belum login
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      {" "}
      {/* wrapper router */}
      <Routes>
        {" "}
        {/* daftar rute */}
        <Route element={<AuthLayout />}>
          {" "}
          {/* grup rute auth */}
          <Route path="/login" element={<LoginPage />} /> {/* rute login */}
        </Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {" "}
              {/* lindungi rute admin */}
              <AdminLayout /> {/* layout admin terproteksi */}
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} /> {/* /admin -> dashboard */}
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} /> {/* fallback */}
      </Routes>
    </BrowserRouter>
  );
}
