import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getVaccinationsQueryOptions } from "./get-vaccination";
import { Vaccination } from "../../stores/vaccinations/VaccinationStore";


export const createVaccination = async (vaccinatioin: Vaccination): Promise<Vaccination> => {
    const response: AxiosResponse<Vaccination> = await axios.post("/vaccinations", vaccinatioin);
    return response.data;
};


export const useCreateVaccination = (
    options: UseMutationOptions<Vaccination, Error, Vaccination> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: createVaccination,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getVaccinationsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};