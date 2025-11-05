import React from "react"; // React core
import ReactDOM from "react-dom/client"; // Root API
import AppRoutes from "./app/routes"; // Definisi rute
import AuthProvider from "./app/providers/AuthProvider"; // Provider auth global
import "./styles/index.css"; // Tailwind entry
import { Toaster } from "react-hot-toast";
// (opsional) CSS Swal2 biar modal punya styling default
import "sweetalert2/dist/sweetalert2.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Toaster global */}
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: { fontSize: "14px" },
      }}
    />
    <AppRoutes />
  </React.StrictMode>
);
