import api from "../lib/axios";

export async function register(payload) {
  const { data } = await api.post("/users", payload);
  return data;
}

export async function login({ email, password }) {
  // Cari user by email; validasi password di client (karena JSON Server tidak autentikasi)
  const { data } = await api.get("/users", { params: { email } });
  const user = Array.isArray(data) ? data[0] : null;
  if (!user || user.password !== password) {
    throw new Error("Email atau password salah");
  }
  return user;
}
