import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getMedicationsQueryOptions } from "./get-medication";

export const deleteMedication = (id: number): Promise<void> => {
    return axios.delete(`/medications/${id}`);
};


export const useDeleteMedication = (options: UseMutationOptions<void, Error, number> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteMedication,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getMedicationsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};

