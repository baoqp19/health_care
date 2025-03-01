import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"

export type GetMembersParams = {
  page?: number;
  size?: number;
  keyword?: string;
};

type UseMembersProps = {
  queryConfig?: object; // hoặc Partial<UseQueryOptions> nếu muốn chi tiết hơn
  page: number;
  size: number;
  keyword: string;
};

export const getMembers = async ({ page, size, keyword }: GetMembersParams) => {
  const response = await axios.get(`/members`, {
    params: {
      page,
      size,
      keyword,
    },
  });
  return response.data
};


export const getMembersQueryOptions = ({
  page,
  size,
  keyword,
}: GetMembersParams) => {
  return queryOptions({
    queryKey: page ? ["members", { page, size, keyword }] : ["members"],
    queryFn: () => getMembers({ page, size, keyword }),
  });
};


export const useMembers = ({ queryConfig = {}, page, size, keyword }: UseMembersProps) => {
  return useQuery({
    ...getMembersQueryOptions({ page, size, keyword }),
    ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
  });
};