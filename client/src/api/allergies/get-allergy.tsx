import { Allergy } from "../../stores/allergies/allergyStore";
import axios from "../../axios/axios-customize"
import { queryOptions, useQuery } from "@tanstack/react-query";


export type GetAllergiesResponse = {
    statusCode: number;
    message: string;
    data: Allergy[];
}

export type GetAllergiesParams = {
    page: number;
    size: number;
    keyword?: string;
}

export type UseMembersProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetAllergiesParams;

export const getAllergies = async ({ page, size, keyword }: GetAllergiesParams): Promise<GetAllergiesResponse> => {
    const response = await axios.get(`/allergies`, {
        params: {
            page,
            size,
            keyword,
        },
    });
    return response.data
};

export const getAllergiesQueryOptions = ({
    page,
    size,
    keyword,
}: GetAllergiesParams) => {
    return queryOptions({
        queryKey: page ? ["allergies", { page, size, keyword }] : ["allergies"], // cache dữ liệu
        queryFn: () => getAllergies({ page, size, keyword }), // gọi API 
    });

};



export const useAllergies = ({ queryConfig = {}, page, size, keyword }: UseMembersProps) => {
    return useQuery({
        ...getAllergiesQueryOptions({ page, size, keyword }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};