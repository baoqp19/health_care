import { useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"

export const getMembersSelect = async () => {
    const response = await axios.get(`/health-stats/membersSelect`);
    return response.data;
};

export const useMembersSelect = () => {
    return useQuery({
        queryKey: ['membersSelect'],
        queryFn: getMembersSelect,
        // staleTime: 1000 * 60 * 5, // Optional: cache for 5 minutes
        // retry: 1, // retry once in case of failure
    });
};