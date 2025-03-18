import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { Appointment } from "../../stores/appointments/appointmentStore";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getAppointmentsQueryOptions } from "./get-appointment";
import { ROW_PER_PAGE } from "../../config/constants";

export const createAppointment = async (appointment: Appointment): Promise<Appointment> => {
    try {
        const response: AxiosResponse<Appointment> = await axios.post("/appointments", appointment);
        console.log("Created Appointment:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating Appointment:", error);
        throw error;
    }
};

export const useCreateAppointment = (
    options: UseMutationOptions<Appointment, Error, Appointment> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: createAppointment,
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
