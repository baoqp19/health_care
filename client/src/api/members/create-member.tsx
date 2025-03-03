import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { getMembersQueryOptions } from "./get-members";
import { ROW_PER_PAGE } from "../../config/constants";
import { Member } from "../../stores/members/memberStore";


export const createMember = async (member: Member): Promise<Member> => {
  const response: AxiosResponse<Member> = await axios.post("/members", member);
  return response.data;
};


export const useCreateMember = (
  options: UseMutationOptions<Member, Error, Member> = {}
) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: createMember,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getMembersQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};