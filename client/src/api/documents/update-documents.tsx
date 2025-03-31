import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { ROW_PER_PAGE } from "../../config/constants";
import { Document, UpdateDocumentParams } from "../../stores/documents/documentStore";
import { getDocumentsQueryOptions } from "./get-documents";


export const updateDocument = async ({ documentID, data, file }: UpdateDocumentParams): Promise<Document> => {

    const formData = new FormData();
    if (file) {
        formData.append("file", file);
    }
    formData.append("request", JSON.stringify(data));

    const response: AxiosResponse<Document> = await axios.put(`/documents/${documentID}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    console.log(response.data)
    return response.data;

};

export const useUpdateDocument = (options?: UseMutationOptions<Document, Error, UpdateDocumentParams>) => {
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<Document, Error, UpdateDocumentParams>({
        mutationFn: updateDocument,
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
