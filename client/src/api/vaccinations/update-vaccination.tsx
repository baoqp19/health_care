import axios from "../../axios/axios-customize"
import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { ROW_PER_PAGE } from '../../config/constants';
import { getVaccinationsQueryOptions } from "./get-vaccination";
import { UpdateVaccinationParams, Vaccination } from "../../stores/vaccinations/VaccinationStore";




export const updateVaccination = async ({ vaccinationID, data }: UpdateVaccinationParams): Promise<Vaccination> => {
    const response: AxiosResponse<Vaccination> = await axios.put(`/vaccinations/${vaccinationID}`, data);
    return response.data;
};

export const useUpdateVaccination = (options?: UseMutationOptions<Vaccination, Error, UpdateVaccinationParams>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Vaccination, Error, UpdateVaccinationParams>({
        mutationFn: updateVaccination,
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

