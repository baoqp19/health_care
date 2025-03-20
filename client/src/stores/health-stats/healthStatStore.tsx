import { create } from "zustand";

export interface HealthStat {
    statID: number,
    statType: string,
    statValue: string
    date: string
    memberID: number
}


export interface HealthStatUpdateProps {
    statType: string,
    statValue: string,
    date: string,
    memberID: number
}

export interface UpdateHealthStatParams {
    statID: number | null;
    data: HealthStatUpdateProps;
}

interface HealthStatsStore {
    healthStat: HealthStat | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setHealthStat: (healthStat: HealthStat) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
}


export const useHealthStatsStore = create<HealthStatsStore>((set) => ({
    healthStat: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setHealthStat: (healthStat) => set({ healthStat }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),

}));
