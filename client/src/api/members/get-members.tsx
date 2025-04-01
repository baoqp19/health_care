import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { Member } from "../../stores/members/memberStore";



export type GetMembersResponse = {
  statusCode: number;
  message: string;
  data: Member[];
};

export type GetMembersParams = {
  page?: number;
  size?: number;
  keyword?: string;
}


export type UseMembersProps = {
  queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetMembersParams;



export const getMembers = async ({ page, size, keyword }: GetMembersParams): Promise<GetMembersResponse> => {
  console.log("🔍 API request params:", { page, size, keyword });

  try {
    const response = await axios.get(`/members`, {
      params: { page, size, keyword },
    });

    console.log("✅ API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi gọi API:", error);
    throw new Error("Không thể lấy danh sách thành viên.");
  }
};

export const getMembersQueryOptions = ({
  page,
  size,
  keyword,
}: GetMembersParams) => {
  return queryOptions({
    queryKey: ["members", { page, size, keyword }], // cache dữ liệu
    queryFn: () => getMembers({ page, size, keyword }), // gọi API 
  });

};

export const useMembers = ({ queryConfig = {}, page, size, keyword }: UseMembersProps) => {
  return useQuery({
    ...getMembersQueryOptions({ page, size, keyword }),
    ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
  });
};