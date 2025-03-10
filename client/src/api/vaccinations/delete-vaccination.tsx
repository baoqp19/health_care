import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getVaccinationsQueryOptions } from "./get-vaccination";

export const deleteVaccination = (id: number): Promise<void> => {
    return axios.delete(`/vaccinations/${id}`);
};


export const useDeleteVaccination = (options: UseMutationOptions<void, Error, number> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteVaccination,
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