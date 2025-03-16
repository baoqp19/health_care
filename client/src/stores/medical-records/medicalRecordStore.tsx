import { create } from 'zustand';




export interface MedicalRecord {
    recordID: number
    memberID: number
    date: string
    doctor: string
    symptoms: string
    diagnosis: string
    treatment: string
    facilityName: string
}


export interface MedicalRecordUpdateProps {
    memberID: number
    date: string
    doctor: string
    symptoms: string
    diagnosis: string
    treatment: string
    facilityName: string
}

export interface UpdateMedicalRecordParams {
    recordID: number | null;
    data: MedicalRecordUpdateProps;
}

interface MedicalRecordsStore {
    medicalRecord: MedicalRecord | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setMedicalRecord: (medicalRecord: MedicalRecord) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
}


export const useMedicalRecordsStore = create<MedicalRecordsStore>((set) => ({
    medicalRecord: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setMedicalRecord: (medicalRecord) => set({ medicalRecord }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));
