import { useMutation, } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { useAuthStore } from "../../stores/auth/authStore";





export const login = async ({ email, password }: any) => {
    const response = await axios.post("/auth/login", {
        email,
        password,
    });

    const result = response.data
    console.log(result)
    return result; // Lấy dữ liệu từ response
};

interface LoginResponse {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
    };
    access_token: string;
};


interface UseLoginOptions {
    onSuccess?: (data: LoginResponse, ...args: any[]) => void;
    onError?: (error: unknown, ...args: any[]) => void;
}

export const useLogin = (options: UseLoginOptions = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
    const { setUser, setIsAuthenticated } = useAuthStore((state) => state);

    return useMutation<LoginResponse, unknown, Parameters<typeof login>[0]>({
        mutationFn: login,
        onSuccess: (data, ...args) => {
            const result = data;
            setUser(result.user);
            localStorage.setItem("access_token", result.access_token)
            setIsAuthenticated(true);
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
            setIsAuthenticated(false);
            localStorage.removeItem("access_token")
        },
        ...restConfig,
    });
};