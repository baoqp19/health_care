import React from 'react'
import axios from "../../axios/axios-customize"
import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { getMembersQueryOptions } from './get-members';
import { ROW_PER_PAGE } from '../../config/constants';
import { Member, UpdateMemberParams } from '../../stores/members/memberStore';




export const updateMember = async ({ memberID, data }: UpdateMemberParams): Promise<Member> => {
    const response: AxiosResponse<Member> = await axios.put(`/members/${memberID}`, data);
    return response.data;
};



// Hook useMutation để cập nhật member
export const useUpdateMember = (options?: UseMutationOptions<Member, Error, UpdateMemberParams>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Member, Error, UpdateMemberParams>({
        mutationFn: updateMember,
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

