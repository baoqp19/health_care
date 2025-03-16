import axios from "../../axios/axios-customize"
import { AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import { ROW_PER_PAGE } from '../../config/constants';
import { MedicalRecord, UpdateMedicalRecordParams } from "../../stores/medical-records/medicalRecordStore";
import { getMedicalrecordsQueryOptions } from "./get-medical-records";


export const updateMedicalRecord = async ({ recordID, data }: UpdateMedicalRecordParams): Promise<MedicalRecord> => {
    const response: AxiosResponse<MedicalRecord> = await axios.put(`/medical-records/${recordID}`, data);
    return response.data;
};


// Hook useMutation để cập nhật MedicalRecord
export const useUpdateMedicalRecord = (options?: UseMutationOptions<MedicalRecord, Error, UpdateMedicalRecordParams>) => {
    
    const { onSuccess, onError, ...restConfig } = options || {};
    const queryClient = useQueryClient();

    return useMutation<MedicalRecord, Error, UpdateMedicalRecordParams>({
        mutationFn: updateMedicalRecord,
        onSuccess: (data, ...args) => {
            queryClient.invalidateQueries({
                queryKey: getMedicalrecordsQueryOptions({ page: 1, size: ROW_PER_PAGE, keyword: "" }).queryKey,  // là hàm nên truyền đối số
            });
            onSuccess?.(data, ...args);
        },

        onError: (error, ...args) => {
            onError?.(error, ...args);
        },
        ...restConfig,
    });
};

