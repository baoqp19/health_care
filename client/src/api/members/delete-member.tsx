import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"

export const deleteMember = (id: number): Promise<void> => {
  return axios.delete(`/members/${id}`);
};


export const useDeleteMember = (options: UseMutationOptions<void, Error, number> = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};