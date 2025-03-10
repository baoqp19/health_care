import { Contact } from "../../stores/emergencyContacts/emergencyContactStore";
import axios from "../../axios/axios-customize"
import { queryOptions, useQuery } from "@tanstack/react-query";


export type GetContactsResponse = {
    statusCode: number;
    message: string;
    data: Contact[];
};

export type GetContactsParams = {
    page?: number;
    size?: number;
    keyword?: string;
}


export type UseContactsProps = {
    queryConfig?: object;
} & GetContactsParams;


export const getEmergencyContacts = async ({ page, size, keyword }: GetContactsParams): Promise<GetContactsResponse> => {
    const response = await axios.get<GetContactsResponse>(`/emergencyContacts`, {
        params: { page, size, keyword },
    });
    return response.data; // Bây giờ TypeScript sẽ hiểu response.data có kiểu GetContactsResponse
};

export const getEmergencyContactsQueryOptions = ({
    page,
    size,
    keyword,
}: GetContactsParams) => {
    return queryOptions({
        queryKey: page ? ["emergencyContacts", { page, size, keyword }] : ["emergencyContacts"], // cache dữ liệu
        queryFn: () => getEmergencyContacts({ page, size, keyword }), // gọi API 
    });

};



export const useEmergencyContacts = ({ queryConfig = {}, page, size, keyword }: UseContactsProps) => {
    return useQuery({
        ...getEmergencyContactsQueryOptions({ page, size, keyword }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};