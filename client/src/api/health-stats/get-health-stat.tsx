import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { HealthStat } from "../../stores/health-stats/healthStatStore";


interface GetHealthStatsParams {
    selectedMemberId?: number;
    selectedStatType?: string;
    date?: string;
}

export const getHealthStats = async (params: GetHealthStatsParams): Promise<HealthStat[]> => {
    const response = await axios.get<HealthStat[]>('/health-stats', { params });
    return response.data;
};


export const getHealthStatsQueryOptions = ({ selectedMemberId, selectedStatType, date }: GetHealthStatsParams) => {
    return queryOptions({
        queryKey: selectedMemberId ? ["healthStats", { selectedMemberId, selectedStatType, date }] : ["healthStats"],
        queryFn: () => getHealthStats({ selectedMemberId, selectedStatType, date }),
    });
};

export const useHealthStats = ({ selectedMemberId, selectedStatType, date }: GetHealthStatsParams) => {
    return useQuery({
        ...getHealthStatsQueryOptions({ selectedMemberId, selectedStatType, date }),
        enabled: !!selectedMemberId, // Chỉ gọi API nếu có selectedMemberId
    });
};