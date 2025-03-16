import { queryOptions, useQuery } from "@tanstack/react-query";
import axios from "../../axios/axios-customize"
import { MedicalRecord } from "../../stores/medical-records/medicalRecordStore";



export type GetMedicalrecordsResponse = {
  statusCode: number;
  message: string;
  data: MedicalRecord[];
};

export type GetMedicalrecordsParams = {
  page?: number;
  size?: number;
  keyword?: string;
}


export type UseMedicalrecordsProps = {
  queryConfig?: object; // Có thể dùng Partial<UseQueryOptions>
} & GetMedicalrecordsParams;



export const getMedicalrecords = async ({ page, size, keyword }: GetMedicalrecordsParams): Promise<GetMedicalrecordsResponse> => {
  const response = await axios.get(`/medical-records`, {
    params: {
      page,
      size,
      keyword,
    },
  });
  return response.data
};


export const getMedicalrecordsQueryOptions = ({
  page,
  size,
  keyword,
}: GetMedicalrecordsParams) => {
  return queryOptions({
    queryKey: page ? ["medicalrecords", { page, size, keyword }] : ["medicalrecords"], // cache dữ liệu
    queryFn: () => getMedicalrecords({ page, size, keyword }), // gọi API 
  });

};



export const useMedicalrecords = ({ queryConfig = {}, page, size, keyword }: UseMedicalrecordsProps) => {
  return useQuery({
    ...getMedicalrecordsQueryOptions({ page, size, keyword }),
    ...queryConfig, // nếu không truyền `queryConfig`, nó sẽ là object rỗng {}
  });
};