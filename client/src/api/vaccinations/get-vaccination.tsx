import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { Vaccination } from "../../stores/vaccinations/VaccinationStore";



export type GetVaccinationResponse = {
    statusCode: number;
    message: string;
    data: Vaccination[];
};

export type GetVaccinationParams = {
    page: number;
    size: number;
    keyword?: string;
}


export type UseVaccinationProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetVaccinationParams;



export const getVaccinations = async ({ page, size, keyword }: GetVaccinationParams): Promise<GetVaccinationResponse> => {
    const response = await axios.get(`/vaccinations`, {
        params: {
            page,
            size,
            keyword,
        },
    });
    return response.data
};


export const getVaccinationsQueryOptions = ({
    page,
    size,
    keyword,
}: GetVaccinationParams) => {
    return queryOptions({
        queryKey: page ? ["vaccinations", { page, size, keyword }] : ["vaccinations"], // cache dữ liệu
        queryFn: () => getVaccinations({ page, size, keyword }), // gọi API 
    });

};



export const useVaccinations = ({ queryConfig = {}, page, size, keyword }: UseVaccinationProps) => {
    return useQuery({
        ...getVaccinationsQueryOptions({ page, size, keyword }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};