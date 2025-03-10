


import axios from "../../axios/axios-customize"
import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { ROW_PER_PAGE } from '../../config/constants';
import { Contact, UpdateContactParams } from "../../stores/emergencyContacts/emergencyContactStore";
import { getEmergencyContactsQueryOptions } from "./get-emergencyContact";



export const updateContact = async ({ emergencyContactID, data }: UpdateContactParams): Promise<Contact> => {
    const response: AxiosResponse<Contact> = await axios.put(`/emergencyContacts/${emergencyContactID}`, data);
    return response.data;
};


// Hook useMutation để cập nhật Contact
export const useUpdateEmergencyContact = (options?: UseMutationOptions<Contact, Error, UpdateContactParams>) => {

    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Contact, Error, UpdateContactParams>({
        mutationFn: updateContact,
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

