import axios from "../../axios/axios-customize"
import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { ROW_PER_PAGE } from '../../config/constants';
import { HealthStat, UpdateHealthStatParams } from "../../stores/health-stats/healthStatStore";
import { getMembersQueryOptions } from "../members/get-members";


export const updateHealthStat = async ({ statID, data }: UpdateHealthStatParams): Promise<HealthStat> => {
  const response: AxiosResponse<HealthStat> = await axios.put(`/health-stats/${statID}`, data);
  return response.data;
};

export const useUpdateHealthStat  = (options?: UseMutationOptions<HealthStat, Error, UpdateHealthStatParams>) => {
  const { onSuccess, onError, ...restConfig } = options || {};
  const queryClient = useQueryClient();

  return useMutation<HealthStat, Error, UpdateHealthStatParams>({
    mutationFn: updateHealthStat,
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



