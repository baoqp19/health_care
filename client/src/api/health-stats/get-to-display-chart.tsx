import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"


export interface GetHealthStatsParams {
    selectedMemberId?: number;
    selectedStatType?: string;
    date?: string;
}

export const getToDisplayChart = async (params: GetHealthStatsParams) => {
    const response = await axios.get('/health-stats/displayChart', { params });
    return response.data;
};

export const getToDisplayChartQueryOptions = ({ selectedMemberId, selectedStatType, date }: GetHealthStatsParams) => {
    return queryOptions({
        queryKey: selectedMemberId ? ["dataChart", { selectedMemberId, selectedStatType, date }] : ["dataChart"],
        queryFn: () => getToDisplayChart({ selectedMemberId, selectedStatType, date }),
    });
};

export const useToDisplayChart = ({ selectedMemberId, selectedStatType, date }: GetHealthStatsParams) => {
    return useQuery({
        ...getToDisplayChartQueryOptions({ selectedMemberId, selectedStatType, date }),
        enabled: !!selectedMemberId, // Chỉ gọi API nếu có selectedMemberId
    });
};