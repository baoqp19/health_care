
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getAppointmentsQueryOptions } from "./get-appointment";


export const deleteAppointment = (id: number): Promise<void> => {
    return axios.delete(`/appointments/${id}`);
};


export const useDeleteAppointment = (options: UseMutationOptions<void, Error, number> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteAppointment,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getAppointmentsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};
