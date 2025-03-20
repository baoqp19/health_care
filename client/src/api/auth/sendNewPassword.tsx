import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"


type sendPassword = {
    email: string,
    otp: string,
}

export const sendNewPassword = ({ email, otp }: sendPassword): Promise<String> => {
    return axios.post(`/otp`, { email, otp });
};

export const useSendNewPassword = (options: UseMutationOptions<String, Error, sendPassword> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;

    return useMutation({
        mutationFn: sendNewPassword,
        onSuccess: (data, ...args) => {
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};