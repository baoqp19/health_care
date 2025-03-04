import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ROW_PER_PAGE } from "../../config/constants";
import { Allergy } from "../../stores/allergies/allergyStore";
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { getAllergiesQueryOptions } from "./get-allergy";


export const createAllergy = async (allergy: Allergy): Promise<Allergy> => {
    const response: AxiosResponse<Allergy> = await axios.post("/allergies", allergy)
    return response.data
}


export const useCreateAllergy = (options: UseMutationOptions<Allergy, Error, Allergy> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAllergy,
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