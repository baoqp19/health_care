import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize";
import { Medication } from "../../stores/medications/medicationStore";



export type GetMedicationsResponse = {
    statusCode: number;
    message: string;
    data: Medication[];
};

export type GetMedicationsParams = {
    page: number;
    size: number;
    keyword?: string;
}

export type UseMedicationProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetMedicationsParams;


export const getMedications = async ({ page, size, keyword }: GetMedicationsParams): Promise<GetMedicationsResponse> => {
    const response = await axios.get("/medications", {
        params: {
            page,
            size,
            keyword,
        }
    })
    return response.data;
}



export const getMedicationsQueryOptions = ({
    page,
    size,
    keyword,
}: GetMedicationsParams) => {
    return queryOptions({
        queryKey: page ? ["members", { page, size, keyword }] : ["members"], // cache dữ liệu
        queryFn: () => getMedications({ page, size, keyword }), // gọi API 
    });
}


export const useMedications = ({ queryConfig = {}, page, size, keyword }: UseMedicationProps) => {
    return useQuery({
        ...getMedicationsQueryOptions({ page, size, keyword }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};




