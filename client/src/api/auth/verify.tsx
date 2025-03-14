import { useMutation } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"


export const verify = (username: string) => {
  return axios.get(`/auth/login`, {
    params: { username },
  });
};

export const useVerify = (options = {}) => {
  return useMutation({
    mutationFn: (username: string) => verify(username),
    ...options,
  });
};