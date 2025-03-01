import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { useAuthStore } from "../../stores/auth/authStore";
import { AxiosResponse } from "axios";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

type ApiResponse = {
  user: User;
};



export const getAccount = async (): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await axios.get(`/auth/account`);
  console.log(response.data)
  return response.data;
};


export const useAccount = (
  options: UseMutationOptions<ApiResponse, Error> = {}
) => {
  const { onSuccess, onError, ...restConfig } = options;
  const { setUser, setIsAuthenticated, setIsLoaded } = useAuthStore((state) => state);

  return useMutation<ApiResponse, Error>({
    mutationFn: getAccount,
    onSuccess: (data, ...args) => {
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoaded(true);
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
      setIsLoaded(true);
      setIsAuthenticated(false);
    },
    ...restConfig,
  });
};