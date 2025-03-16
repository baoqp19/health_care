import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { Document } from "../../stores/documents/documentStore";


export type GetDocumentsResponse = {
    statusCode: number;
    message: string;
    data: Document[];
};

export type GetDocumentsParams = {
    page: number;
    size: number;
    keyword?: string;
}

export type UseDocumentProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetDocumentsParams;


export const getDocuments = async ({ page, size, keyword }: GetDocumentsParams): Promise<GetDocumentsResponse> => {
    const response = await axios.get("/documents", {
        params: {
            page,
            size,
            keyword,
        }
    })
    return response.data
}


export const getDocumentsQueryOptions = ({
    page,
    size,
    keyword,
}: GetDocumentsParams) => {
    return queryOptions({
        queryKey: page ? ["documents", { page, size, keyword }] : ["documents"], // cache dữ liệu
        queryFn: () => getDocuments({ page, size, keyword }), // gọi API 
    });
}


export const useDocuments = ({ queryConfig = {}, page, size, keyword }: UseDocumentProps) => {
    return useQuery({
        ...getDocumentsQueryOptions({ page, size, keyword }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};