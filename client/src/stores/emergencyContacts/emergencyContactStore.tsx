import { create } from 'zustand';



// Định nghĩa kiểu dữ liệu cho `Contact`

export interface Contact {
    contactID: number;
    userID: number;
    name: string,
    relationship: string,
    phoneNumber: string,
}



export interface ContactUpdateProps {
    userID: number;
    name: string,
    relationship: string,
    phoneNumber: string,
}

// Định nghĩa kiểu dữ liệu cho hàm mutationFn
export interface UpdateContactParams {
    emergencyContactID: number | null;
    data: ContactUpdateProps;
}




// Định nghĩa kiểu dữ liệu cho store Zustand
interface ContactsStore {
    emergencyContact: Contact | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setEmergencyContact: (contact: Contact) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;
}


// Tạo Zustand store với kiểu dữ liệu `ContactsStore`
export const useEmergencyContactStore = create<ContactsStore>((set) => ({

    emergencyContact: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setEmergencyContact: (emergencyContact) => set({ emergencyContact }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));
