import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getMembersQueryOptions } from "../members/get-members";

export const deleteHealthStat = (id: number): Promise<void> => {
  return axios.delete(`/health-stats/${id}`);
};


export const useDeleteHealthStat = (options: UseMutationOptions<void, Error, number> = {}) => {
  const { onSuccess, onError, ...restConfig } = options;
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: deleteHealthStat,
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