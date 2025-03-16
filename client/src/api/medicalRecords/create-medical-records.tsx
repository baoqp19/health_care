import { useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import axios from "../../axios/axios-customize"
import { ROW_PER_PAGE } from "../../config/constants";
import { MedicalRecord } from "../../stores/medical-records/medicalRecordStore";
import { getMedicalrecordsQueryOptions } from "./get-medical-records";


export const createMedicalRecord = async (medicalRecord: MedicalRecord): Promise<MedicalRecord> => {
    const response: AxiosResponse<MedicalRecord> = await axios.post("/medical-records", medicalRecord);
    return response.data;
};


export const useCreateMedicalRecord = (
    options: UseMutationOptions<MedicalRecord, Error, MedicalRecord> = {}
) => {
    const { onSuccess, onError, ...restConfig } = options;

    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: createMedicalRecord,
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

