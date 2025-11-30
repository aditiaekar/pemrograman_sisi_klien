// src/utils/hooks/useMahasiswaQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as mahasiswaApi from "../../services/mahasiswaService";

export function useMahasiswaQuery() {
  const queryClient = useQueryClient();

  // GET /mahasiswa
  const listQuery = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: mahasiswaApi.list,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // POST /mahasiswa
  const createMutation = useMutation({
    mutationFn: mahasiswaApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  // PUT /mahasiswa/:id
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mahasiswaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  // DELETE /mahasiswa/:id
  const deleteMutation = useMutation({
    mutationFn: (id) => mahasiswaApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mahasiswa"] });
    },
  });

  return {
    // data list
    ...listQuery, // { data, isLoading, isError, error, refetch, ... }

    // aksi CRUD
    createMahasiswa: createMutation.mutateAsync,
    updateMahasiswa: updateMutation.mutateAsync,
    deleteMahasiswa: deleteMutation.mutateAsync,
  };
}
