import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getMedicalrecordsQueryOptions } from "./get-medical-records";

export const deleteMedicalRecord = (id: number): Promise<void> => {
    return axios.delete(`/medical-records/${id}`);
};


export const useDeleteMedicalRecord = (options: UseMutationOptions<void, Error, number> = {}) => {
    
    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteMedicalRecord,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getMedicalrecordsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};