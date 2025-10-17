import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../../data/users.json";

import Card from "../../design-system/molecules/Card/Card"; // UI
import Form from "../../design-system/molecules/Form/Form"; // UI
import Label from "../../design-system/atoms/Label/Label"; // UI
import Input from "../../design-system/atoms/Input/Input"; // UI
import Button from "../../design-system/atoms/Button/Button"; // UI

export default function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "", remember: false });

  const onSubmit = (e) => {
    e.preventDefault();
    const found = users.find((u) => u.email === values.email && u.password === values.password);
    if (!found) {
      alert("Email atau password salah");
      return;
    }
    // simpan session ke localStorage (boleh disesuaikan)
    const session = { email: found.email, name: found.name, ts: Date.now() };
    localStorage.setItem("auth", JSON.stringify(session));
    if (!values.remember) {
      // opsional: kalau ingin auto-clear saat tab ditutup, kamu bisa juga pakai sessionStorage
    }
    navigate("/admin"); // masuk ke area admin
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" required className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          />
        </div>
        <label className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center">
            <input type="checkbox" className="mr-2" checked={values.remember} onChange={(e) => setValues((v) => ({ ...v, remember: e.target.checked }))} />
            Ingat saya
          </span>
          <a href="#" className="text-blue-500 hover:underline">
            Lupa password?
          </a>
        </label>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Daftar
        </a>
      </p>
    </div>
  );
}
