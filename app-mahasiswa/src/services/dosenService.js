import api from "../lib/axios";

export async function list(params = {}) {
  const { data } = await api.get("/dosen", { params });
  return data;
}
export async function create(body) {
  const { data } = await api.post("/dosen", body);
  return data;
}
export async function update(id, body) {
  const { data } = await api.put(`/dosen/${id}`, body);
  return data;
}
export async function remove(id) {
  const { data } = await api.delete(`/dosen/${id}`);
  return data;
}
