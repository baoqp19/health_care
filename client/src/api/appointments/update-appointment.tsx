import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ROW_PER_PAGE } from "../../config/constants";
import { getAppointmentsQueryOptions } from "./get-appointment";
import { Appointment, UpdateAppointmentParams } from "../../stores/appointments/appointmentStore";

export const updateApppointment = async ({ appointmentID, data }: UpdateAppointmentParams): Promise<Appointment> => {
    const response: AxiosResponse<Appointment> = await axios.put(`/appointments/${appointmentID}`, data);
    console.log(response.data)
    return response.data;

};

export const useUpdateAppointment = (options?: UseMutationOptions<Appointment, Error, UpdateAppointmentParams>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Appointment, Error, UpdateAppointmentParams>({
        mutationFn: updateApppointment,
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

