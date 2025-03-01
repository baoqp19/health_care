import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"

export interface Member {
  gender: string;
  weight: number;
  fullName: string;
  dateOfBirth: string;
  bloodType: string;
  relationship: string;
  height: number;
}

export const createMember = async (member: Member): Promise<Member> => {
  const response: AxiosResponse<Member> = await axios.post("/members", member);
  return response.data;
};


export const useCreateMember = (
  options: UseMutationOptions<Member, Error, Member> = {}
) => {
  const { onSuccess, onError, ...restConfig } = options;
  return useMutation({
    mutationFn: createMember,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};