import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { HealthStat } from "../../stores/health-stats/healthStatStore";
import { getVaccinationsQueryOptions } from "../vaccinations/get-vaccination";


export const CreateHealthStat  = async (healthStat: HealthStat): Promise<HealthStat> => {
  const response: AxiosResponse<HealthStat> = await axios.post("/health-stats", healthStat);
  return response.data;
};


export const useCreateHealthStat  = (
  options: UseMutationOptions<HealthStat, Error, HealthStat> = {}
) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: CreateHealthStat ,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getVaccinationsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};
