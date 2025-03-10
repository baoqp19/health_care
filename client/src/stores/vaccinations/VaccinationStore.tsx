import { create } from 'zustand';
import { Member } from '../members/memberStore';




export interface Vaccination {
    vaccinationID: number
    memberID: number;
    member: Member;
    vaccineName: string
    dateAdministered: string
}


export interface VaccinationUpdateProps {
    memberID: number
    vaccineName: string
    dateAdministered: string
}

// Định nghĩa kiểu dữ liệu cho hàm mutationFn
export interface UpdateVaccinationParams {
    vaccinationID: number | null;
    data: VaccinationUpdateProps;
}




// Định nghĩa kiểu dữ liệu cho store Zustand
interface VaccinationStore {
    vaccination: Vaccination | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setVaccination: (vaccination: Vaccination) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
}


export const useVaccinationsStore = create<VaccinationStore>((set) => ({
    vaccination: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setVaccination: (vaccination) => set({ vaccination }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));
