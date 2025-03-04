import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getAllergiesQueryOptions } from "./get-allergy";

export const deleteAllergy = (id: number): Promise<void> => {
    return axios.delete(`/allergies/${id}`);
};


export const useDeleteAllergy = (options: UseMutationOptions<void, Error, number> = {}) => { // trả về, error, kiểu nhận vào 
    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteAllergy,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getAllergiesQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};