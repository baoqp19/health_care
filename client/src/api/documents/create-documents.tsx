
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { CreateDocumentProps, Document } from "../../stores/documents/documentStore";
import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { getDocumentsQueryOptions } from "./get-documents";
import { ROW_PER_PAGE } from "../../config/constants";


export const createDocument = async ({ recordID, fileName, fileType, uploadDate, file }: CreateDocumentProps) => {
    const formData = new FormData();
    formData.append("request", JSON.stringify({ recordID, fileName, fileType, uploadDate }));
    formData.append("file", file);
    try {
        const response: AxiosResponse<CreateDocumentProps> = await axios.post("/documents", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("Created document:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};


export const useCreateDocument = (
    options: UseMutationOptions<CreateDocumentProps, Error, CreateDocumentProps> = {}
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

