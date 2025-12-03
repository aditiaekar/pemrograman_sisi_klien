// src/utils/hooks/useMataKuliahQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMataKuliahList,
  getMataKuliahById,
  createMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from '../apis/mataKuliahApi'

const mkKeys = {
  all: ['mataKuliah'],
  list: (filters) => ['mataKuliah', 'list', filters],
  detail: (id) => ['mataKuliah', 'detail', id],
}

export const useMataKuliahList = (filters = {}) => {
  return useQuery({
    queryKey: mkKeys.list(filters),
    queryFn: () => getMataKuliahList(filters),
  })
}

export const useMataKuliahDetail = (id, enabled = true) => {
  return useQuery({
    queryKey: mkKeys.detail(id),
    queryFn: () => getMataKuliahById(id),
    enabled: !!id && enabled,
  })
}

export const useCreateMataKuliah = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => createMataKuliah(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mkKeys.all })
    },
  })
}

export const useUpdateMataKuliah = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }) => updateMataKuliah(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: mkKeys.all })
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: mkKeys.detail(variables.id),
        })
      }
    },
  })
}

export const useDeleteMataKuliah = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteMataKuliah(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mkKeys.all })
    },
  })
}
