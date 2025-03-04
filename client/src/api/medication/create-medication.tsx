import { AxiosResponse } from "axios";
import { Medication } from "../../stores/medications/medicationStore";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getMedicationsQueryOptions } from "./get-medication";
import { ROW_PER_PAGE } from "../../config/constants";
import axios from "../../axios/axios-customize"



export const createMedication = async (medication: Medication): Promise<Medication> => {
    try {
        const response: AxiosResponse<Medication> = await axios.post("/medications", medication);
        console.log("Created medication:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating medication:", error);
        throw error;
    }
};


export const useCreateMedication = (
    options: UseMutationOptions<Medication, Error, Medication> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: createMedication,
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