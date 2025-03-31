import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { AxiosResponse } from "axios";

export type EmailProps = {
    email: string;
}

export const sendOTP = async ({ email }: { email: string }): Promise<EmailProps> => {
    const response: AxiosResponse<EmailProps> = await axios.post(`/forgot-password`, {
        email
    });
    return response.data
};

export const useSendOTP = (options: UseMutationOptions<EmailProps, Error, EmailProps> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;

    return useMutation({
        mutationFn: sendOTP,
        onSuccess: (data, ...args) => {
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};


