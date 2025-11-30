// src/utils/hooks/useKelasQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as kelasApi from "../../services/kelasService";

export function useKelasQuery() {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["kelas"],
    queryFn: kelasApi.list,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: kelasApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => kelasApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => kelasApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["kelas"] });
    },
  });

  return {
    ...listQuery,
    createKelas: createMutation.mutateAsync,
    updateKelas: updateMutation.mutateAsync,
    deleteKelas: deleteMutation.mutateAsync,
  };
}
