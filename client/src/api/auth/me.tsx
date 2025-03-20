import { UseMutationOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
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
  // const { setUser, setIsAuthenticated, setIsLoaded } = useAuthStore((state) => state);
  return useQuery({
    queryKey: ['me'],
    queryFn: getAccount,

  });
};