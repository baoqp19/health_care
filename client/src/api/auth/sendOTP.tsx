import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"

export const sendOTP = (email: string): Promise<String> => {
    return axios.post(`/auth/forgot-password`, {
        email
    });
};

export const useSendOTP = (options: UseMutationOptions<String, Error, String> = {}) => {
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