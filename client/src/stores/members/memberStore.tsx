import { create } from 'zustand';



// Định nghĩa kiểu dữ liệu cho `Member`

export interface Member {
  memberID: number
  fullName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
  bloodType: string;
  height: number;
  weight: number;
}


export interface MemberUpdateProps {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  relationship: string;
  bloodType: string;
  height: number;
  weight: number;
}

// Định nghĩa kiểu dữ liệu cho hàm mutationFn
export interface UpdateMemberParams {
  memberID: number | null;
  data: MemberUpdateProps;
}




// Định nghĩa kiểu dữ liệu cho store Zustand
interface MembersStore {
  member: Member | null;
  isLoading: boolean;
  error: string | null;
  openCreateModal: boolean;
  openUpdateModal: boolean;
  openDeleteModal: boolean;

  setMembers: (member: Member) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setOpenCreateModal: (open: boolean) => void;
  setOpenUpdateModal: (open: boolean) => void;
  setOpenDeleteModal: (open: boolean) => void;
}

// Tạo Zustand store với kiểu dữ liệu `MembersStore`
export const useMembersStore = create<MembersStore>((set) => ({
  member: null,
  isLoading: false,
  error: null,
  openCreateModal: false,
  openUpdateModal: false,
  openDeleteModal: false,

  setMembers: (member) => set({ member }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
  setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
  setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));
