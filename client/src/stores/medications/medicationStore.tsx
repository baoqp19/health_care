import { create } from 'zustand';



// Định nghĩa kiểu dữ liệu cho `Medication`

export interface Medication {
    medicationID: number
    name: string,
    frequency: string,
    startDate: string,
    endDate: string,
    note: string,
}



export interface MedicationUpdateProps {
    name: string,
    frequency: string,
    startDate: string,
    endDate: string,
    note: string,
    symptoms: string,
}


// Định nghĩa kiểu dữ liệu cho hàm mutationFn
export interface UpdateMedicationParams {
    medicationID: number | null;
    data: MedicationUpdateProps;
}




// Định nghĩa kiểu dữ liệu cho store Zustand
interface MembersStore {
    medication: Medication | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setMedication: (member: Medication) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
}


// Tạo Zustand store với kiểu dữ liệu `MembersStore`
export const useMedicationsStore = create<MembersStore>((set) => ({
    medication: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setMedication: (medication) => set({ medication }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));
