import { Appointment } from "../../stores/appointments/appointmentStore";
import axios from "../../axios/axios-customize"
import { queryOptions, useQuery } from "@tanstack/react-query";


export type GetAppointmentsResponse = {
    statusCode: number;
    message: string;
    data: Appointment[];
};

export type GetAppointmentsParams = {
    page: number;
    size: number;
    keyword?: string;
}

export type UseAppointmentProps = {
    queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetAppointmentsParams;

export const getAppointments = async ({ page, size, keyword }: GetAppointmentsParams): Promise<GetAppointmentsResponse> => {
    const response = await axios.get("/appointments", {
        params: {
            page,
            size,
            keyword,
        }
    })
    return response.data
}


export const getAppointmentsQueryOptions = ({
    page,
    size,
    keyword,
}: GetAppointmentsParams) => {
    return queryOptions({
        queryKey: page ? ["Appointments", { page, size, keyword }] : ["Appointments"], // cache dữ liệu
        queryFn: () => getAppointments({ page, size, keyword }), // gọi API 
    });
}


export const useAppointments = ({ queryConfig = {}, page, size, keyword }: UseAppointmentProps) => {
    return useQuery({
        ...getAppointmentsQueryOptions({ page, size, keyword }),
        ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
    });
};