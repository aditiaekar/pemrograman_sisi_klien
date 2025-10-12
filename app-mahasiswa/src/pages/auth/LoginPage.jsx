import { useState } from "react"; // state
import { useAuth } from "../../app/providers/AuthProvider"; // auth ctx
import { useNavigate } from "react-router-dom";
import Card from "../../design-system/molecules/Card/Card"; // UI
import Form from "../../design-system/molecules/Form/Form"; // UI
import Label from "../../design-system/atoms/Label/Label"; // UI
import Input from "../../design-system/atoms/Input/Input"; // UI
import Button from "../../design-system/atoms/Button/Button"; // UI

export default function LoginPage() {
  // page login
  const { login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "", remember: false });

  const onSubmit = (e) => {
    e.preventDefault();
    const ok = login(values);          // ubah state auth
    if (ok) navigate("/admin");        // pindah halaman
    else alert("Email & Password Salah!");
  };

  return (
    <Card title="Login" className="w-full max-w-md">
      {" "}
      {/* wrapper */}
      <Form onSubmit={onSubmit}>
        {" "}
        {/* form */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Masukkan email" // field email
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Masukkan password" // field password
            value={values.password}
            onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          {" "}
          {/* opsi */}
          <label className="flex items-center text-sm text-gray-600">
            <input type="checkbox" className="mr-2" checked={values.remember} onChange={(e) => setValues((v) => ({ ...v, remember: e.target.checked }))} />
            Ingat saya
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Lupa password?
          </a>
        </div>
        <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Login
        </Button>{" "}
        {/* submit */}
      </Form>
      <p className="text-sm text-center text-gray-600 mt-4">
        {" "}
        {/* footer link */}
        Belum punya akun?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Daftar
        </a>
      </p>
    </Card>
  );
}
