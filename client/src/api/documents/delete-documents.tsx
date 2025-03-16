
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { getDocumentsQueryOptions } from "./get-documents";

export const deleteDocument = (id: number): Promise<void> => {
    return axios.delete(`/documents/${id}`);
};


export const useDeleteDocument = (options: UseMutationOptions<void, Error, number> = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: deleteDocument,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getDocumentsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },
        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};
