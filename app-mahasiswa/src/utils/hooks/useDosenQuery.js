// src/utils/hooks/useDosenQuery.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDosenList,
  getDosenById,
  createDosen,
  updateDosen,
  deleteDosen,
} from '../apis/dosenApi'

const dosenKeys = {
  all: ['dosen'],
  list: (filters) => ['dosen', 'list', filters],
  detail: (id) => ['dosen', 'detail', id],
}

export const useDosenList = (filters = {}) => {
  return useQuery({
    queryKey: dosenKeys.list(filters),
    queryFn: () => getDosenList(filters),
  })
}

export const useDosenDetail = (id, enabled = true) => {
  return useQuery({
    queryKey: dosenKeys.detail(id),
    queryFn: () => getDosenById(id),
    enabled: !!id && enabled,
  })
}

export const useCreateDosen = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => createDosen(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dosenKeys.all })
    },
  })
}

export const useUpdateDosen = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }) => updateDosen(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: dosenKeys.all })
      if (variables?.id) {
        queryClient.invalidateQueries({
          queryKey: dosenKeys.detail(variables.id),
        })
      }
    },
  })
}

export const useDeleteDosen = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteDosen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dosenKeys.all })
    },
  })
}
