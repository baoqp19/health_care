import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getEmergencyContactsQueryOptions } from "./get-emergencyContact";

export const deleteContact = (id: number): Promise<void> => {
    return axios.delete(`/emergencyContacts/${id}`);
};


export const useDeleteEmergencyContact = (options: UseMutationOptions<void, Error, number> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteContact,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getEmergencyContactsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};