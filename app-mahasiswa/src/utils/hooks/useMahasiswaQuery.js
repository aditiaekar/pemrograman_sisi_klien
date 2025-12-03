// src/utils/hooks/useMahasiswaQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMahasiswaList,
  getMahasiswaById,
  createMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from '../apis/mahasiswaApi'

// helper untuk key biar konsisten
const mahasiswaKeys = {
  all: ['mahasiswa'],
  list: (filters) => ['mahasiswa', 'list', filters],
  detail: (id) => ['mahasiswa', 'detail', id],
}

export const useMahasiswaList = (filters = {}) => {
  return useQuery({
    queryKey: mahasiswaKeys.list(filters),
    queryFn: () => getMahasiswaList(filters),
  })
}

export const useMahasiswaDetail = (id, enabled = true) => {
  return useQuery({
    queryKey: mahasiswaKeys.detail(id),
    queryFn: () => getMahasiswaById(id),
    enabled: !!id && enabled,
  })
}

export const useCreateMahasiswa = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload) => createMahasiswa(payload),
    onSuccess: () => {
      // refresh list
      queryClient.invalidateQueries({ queryKey: mahasiswaKeys.all })
    },
  })
}

export const useUpdateMahasiswa = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }) => updateMahasiswa(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: mahasiswaKeys.all })
      // optional: invalidasi detail spesifik
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: mahasiswaKeys.detail(variables.id),
        })
      }
    },
  })
}

export const useDeleteMahasiswa = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deleteMahasiswa(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mahasiswaKeys.all })
    },
  })
}
