import { create } from 'zustand';



// Định nghĩa kiểu dữ liệu cho `Member`
interface Member {
  id: number;
  email: string;
  firstname: string;
  lastname: string
}

// Định nghĩa kiểu dữ liệu cho store Zustand
interface MembersStore {
  members: Member[];
  isLoading: boolean;
  error: string | null;
  openCreateModal: boolean;
  openUpdateModal: boolean;
  openDeleteModal: boolean;

  setMembers: (members: Member[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenUpdateModal: (open: boolean) => void;
  setOpenDeleteModal: (open: boolean) => void;
}

// Tạo Zustand store với kiểu dữ liệu `MembersStore`
export const useMembersStore = create<MembersStore>((set) => ({
  members: [],
  isLoading: false,
  error: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,

  setMembers: (members) => set({ members }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),
}));
