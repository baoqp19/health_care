import { AxiosResponse } from "axios";
import { Medication, UpdateMedicationParams } from "../../stores/medications/medicationStore";
import axios from "../../axios/axios-customize"
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getMedicationsQueryOptions } from "./get-medication";
import { ROW_PER_PAGE } from "../../config/constants";

export const updateMedication = async ({ medicationID, data }: UpdateMedicationParams): Promise<Medication> => {
    const response: AxiosResponse<Medication> = await axios.put(`/medications/${medicationID}`, data);
    return response.data;
};



export const useUpdateMedication = (options?: UseMutationOptions<Medication, Error, UpdateMedicationParams>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Medication, Error, UpdateMedicationParams>({
        mutationFn: updateMedication,
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

