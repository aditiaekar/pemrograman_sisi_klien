// src/utils/hooks/useMataKuliahQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as mkApi from "../../services/mataKuliahService";

export function useMataKuliahQuery() {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["mata_kuliah"],
    queryFn: mkApi.list,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: mkApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata_kuliah"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => mkApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata_kuliah"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => mkApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mata_kuliah"] });
    },
  });

  return {
    ...listQuery,
    createMK: createMutation.mutateAsync,
    updateMK: updateMutation.mutateAsync,
    deleteMK: deleteMutation.mutateAsync,
  };
}
