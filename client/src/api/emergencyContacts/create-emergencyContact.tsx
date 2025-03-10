

import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { Contact } from "../../stores/emergencyContacts/emergencyContactStore";
import { getEmergencyContactsQueryOptions } from "./get-emergencyContact";


export const createEmergencyContact = async (contact: Contact): Promise<Contact> => {
    const response: AxiosResponse<Contact> = await axios.post("/emergencyContacts", contact);
    return response.data;
};


export const useCreateEmergenceContact = (
    options: UseMutationOptions<Contact, Error, Contact> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: createEmergencyContact,
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