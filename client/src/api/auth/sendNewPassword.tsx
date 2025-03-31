import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { EmailProps } from "./sendOTP";


type sendPassword = {
    email: EmailProps,
    otp: string,
}

export const sendNewPassword = ({ email, otp }: sendPassword): Promise<sendPassword> => {
    return axios.post(`/otp`, { email, otp });
};

export const useSendNewPassword = (options: UseMutationOptions<sendPassword, Error, sendPassword> = {}) => {
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