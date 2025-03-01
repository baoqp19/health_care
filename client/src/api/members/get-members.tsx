import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"

export type Member = {
  memberID: number;
  userID: number;
  fullName: string;
  dateOfBirth: string; // hoặc có thể dùng `Date` nếu muốn convert
  gender: "MALE" | "FEMALE" | string;
  relationship: string;
  bloodType: string;
  height: number;
  weight: number;
};

export type GetMembersResponse = {
  statusCode: number;
  message: string;
  data: Member[];
};

export type GetMembersParams = {
  page: number;
  size: number;
  keyword?: string;
}


export type UseMembersProps = {
  queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetMembersParams;

export const getMembers = async ({ page, size, keyword }: GetMembersParams): Promise<GetMembersResponse> => {
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