import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes";
import AuthProvider from "./app/providers/AuthProvider";
import "./styles/index.css";
import { Toaster } from "react-hot-toast";
import "sweetalert2/dist/sweetalert2.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 2500, style: { fontSize: "14px" } }}
      />
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
