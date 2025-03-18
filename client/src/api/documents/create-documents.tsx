
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { Document } from "../../stores/documents/documentStore";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getDocumentsQueryOptions } from "./get-documents";
import { ROW_PER_PAGE } from "../../config/constants";


export const createDocument = async (document: Document): Promise<Document> => {
    try {
        const response: AxiosResponse<Document> = await axios.post("/documents", document);
        console.log("Created document:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};


export const useCreateDocument = (
    options: UseMutationOptions<Document, Error, Document> = {}
) => {

    const { onSuccess, onError, ...restConfig } = options;
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDocument,
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

