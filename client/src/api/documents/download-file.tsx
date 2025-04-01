import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"

type PathParams = {
    path: string;
}

export type UseDownloadDocumentProps = {
    queryConfig?: object;  
} & PathParams;


export const downloadFile = async ({ path }: PathParams) => {
    const response = await axios.get<Blob>(path, {
        responseType: "blob",
    });
    if (!response) {
        throw new Error("Failed to download file.");
    }
    return response.data;
};


export const getDownloadFileQueryOptions = ({ path }: PathParams) => {
    return queryOptions({
        queryKey: path ? ["downloadFile", { path }] : ["downloadFile"],
        queryFn: () => downloadFile({ path }),
    });
};


export const useDownloadFile = ({ queryConfig = {}, path }: UseDownloadDocumentProps) => {
    return useQuery({
        ...getDownloadFileQueryOptions({ path }),
        ...queryConfig,
    });
};
