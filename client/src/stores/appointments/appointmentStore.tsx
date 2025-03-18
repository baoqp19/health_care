import { create } from 'zustand';
import { Member } from '../members/memberStore';

export interface Appointment {
    appointmentID: number
    memberID: number;
    time: string
    doctor: string
    location: string
    member: Member
}
export interface AppointmentUpdateProps {
    memberID: number
    time: string
    doctor: string
    location: string
}

// Định nghĩa kiểu dữ liệu cho hàm mutationFn
export interface UpdateAppointmentParams {
    appointmentID: number | null;
    data: AppointmentUpdateProps;
}

// Định nghĩa kiểu dữ liệu cho store Zustand
interface AppointmentsStore {
    appointment: Appointment | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setAppointment: (appointment: Appointment) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
}


export const useAppointmentsStore = create<AppointmentsStore>((set) => ({
    appointment: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,

    setAppointment: (appointment) => set({ appointment }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),

}));
