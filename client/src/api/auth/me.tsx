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



export const getAccount = async (): Promise<User> => {
  const response: AxiosResponse<User> = await axios.get(`/auth/account`);
  console.log(response.data)
  return response.data;
};


export const useAccount = (
  options: UseMutationOptions<User, Error> = {}
) => {
  const { onSuccess, onError, ...restConfig } = options;
  const { setUser, setIsAuthenticated, setIsLoaded } = useAuthStore((state) => state);

  return useMutation<User, Error>({
    mutationFn: getAccount,
    onSuccess: (data, ...args) => {
      setIsLoaded(true)
      setUser(data);
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