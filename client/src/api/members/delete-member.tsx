import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { getMembersQueryOptions } from "./get-members";
import { ROW_PER_PAGE } from "../../config/constants";

export const deleteMember = (id: number): Promise<void> => {
  return axios.delete(`/members/${id}`);
};


export const useDeleteMember = (options: UseMutationOptions<void, Error, number> = {}) => { 
  const { onSuccess, onError, ...restConfig } = options;
  const queryClient = useQueryClient();

  
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getMembersQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};