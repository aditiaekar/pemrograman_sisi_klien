import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./app/routes";
import AuthProvider from "./app/providers/AuthProvider";
import "./styles/index.css";
import { Toaster } from "react-hot-toast";
import "sweetalert2/dist/sweetalert2.min.css";

// === React Query ===
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// bikin instance query client (cukup sekali di sini)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 30, // 30 detik
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* AuthProvider di luar, jadi di dalam hooks kamu tetap bisa pakai context auth */}
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 2500, style: { fontSize: "14px" } }}
        />

        <AppRoutes />

        {/* Devtools optional, tapi enak buat debug */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
