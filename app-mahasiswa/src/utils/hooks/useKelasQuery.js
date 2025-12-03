// src/utils/hooks/useKelasQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getKelasList,
  getKelasById,
  createKelas,
  updateKelas,
  deleteKelas,
} from '../apis/kelasApi'

const kelasKeys = {
  all: ['kelas'],
  list: (filters) => ['kelas', 'list', filters],
  detail: (id) => ['kelas', 'detail', id],
}

export const useKelasList = (filters = {}) => {
  return useQuery({
    queryKey: kelasKeys.list(filters),
    queryFn: () => getKelasList(filters),
  })
}

export const useKelasDetail = (id, enabled = true) => {
  return useQuery({
    queryKey: kelasKeys.detail(id),
    queryFn: () => getKelasById(id),
    enabled: !!id && enabled,
  })
}

export const useCreateKelas = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => createKelas(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kelasKeys.all })
    },
  })
}

export const useUpdateKelas = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }) => updateKelas(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: kelasKeys.all })
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: kelasKeys.detail(variables.id),
        })
      }
    },
  })
}

export const useDeleteKelas = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteKelas(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: kelasKeys.all })
    },
  })
}
