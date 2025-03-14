import { useMutation } from "@tanstack/react-query";
import axios from "../../axios/axios-customize";


 export type RegisterProps = {
    firstname: string,
    lastname: string,
    email: string,
    password: string;
}

type User = {
    firstname: string;
    lastname: string;
    email: string;
};

type AuthenticationResponse = {
    statusCode: number;
    message: string;
    data: {
        user: User;
    };
};

export const register = ({ firstname, lastname, email, password }: RegisterProps): Promise<AuthenticationResponse> => {
    return axios.post(`/auth/register`, {
        firstname,
        lastname,
        email,
        password,
    });
};


interface UseRegisterOptions {
    onSuccess?: (data: AuthenticationResponse, ...args: any[]) => void;
    onError?: (error: unknown, ...args: any[]) => void;
}


export const useRegister = (options: UseRegisterOptions = {}) => {
    const { onSuccess, onError, ...restConfig } = options;

    return useMutation<AuthenticationResponse, unknown, RegisterProps>({
        mutationFn: register,
        onSuccess: (data, ...args) => {
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};


