import React from 'react'
import axios from "../../axios/axios-customize"
import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { ROW_PER_PAGE } from '../../config/constants';
import { getAllergiesQueryOptions } from './get-allergy';
import { Allergy, UpdateAllergyProps } from '../../stores/allergies/allergyStore';




export const updateAllergy = async ({ allergyID, data }: UpdateAllergyProps): Promise<Allergy> => {
    const response: AxiosResponse<Allergy> = await axios.put(`/allergies/${allergyID}`, data);
    console.log(response.data)
    return response.data;
};



// Hook useMutation để cập nhật member
export const useUpdateAllergy = (options?: UseMutationOptions<Allergy, Error, UpdateAllergyProps>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Allergy, Error, UpdateAllergyProps>({
        mutationFn: updateAllergy,
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

