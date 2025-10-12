import React from "react"; // React core
import ReactDOM from "react-dom/client"; // Root API
import AppRoutes from "./app/routes"; // Definisi rute
import AuthProvider from "./app/providers/AuthProvider"; // Provider auth global
import "./styles/index.css"; // Tailwind entry

ReactDOM.createRoot(document.getElementById("root")).render(
  // Mount app
  // Opsional: bungkus dengan <React.StrictMode> untuk dev checks
  <AuthProvider>
    {" "}
    {/* Context auth untuk seluruh app */}
    <AppRoutes /> {/* Pohon rute */}
  </AuthProvider>
);
