// src/utils/hooks/useDosenQuery.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as dosenApi from "../../services/dosenService";

export function useDosenQuery() {
  const queryClient = useQueryClient();

  const listQuery = useQuery({
    queryKey: ["dosen"],
    queryFn: dosenApi.list,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const createMutation = useMutation({
    mutationFn: dosenApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => dosenApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => dosenApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
    },
  });

  return {
    ...listQuery,
    createDosen: createMutation.mutateAsync,
    updateDosen: updateMutation.mutateAsync,
    deleteDosen: deleteMutation.mutateAsync,
  };
}
