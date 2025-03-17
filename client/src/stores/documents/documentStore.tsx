import { create } from 'zustand';

export interface Document {
    documentID: number
    recordID: number
    fileName: string
    fileType: string
    fileContent: string
    uploadDate: string
}

export interface Document1 {

    documentID: number
    recordID: number
    fileName: string
    fileType: string
    uploadFile: string
    fileContent: string
    uploadDate: string
}


export interface DocumentUpdateProps {
    recordID: number
    fileName: string
    fileType: string
    fileContent: string
    uploadDate: string
}

export interface UpdateDocumentParams {
    documentID: number | null;
    data: DocumentUpdateProps;
}


interface DocumentsStore {

    document: Document | null;
    isLoading: boolean;
    error: string | null;
    openCreateModal: boolean;
    openUpdateModal: boolean;
    openDeleteModal: boolean;

    setDocument: (document: Document) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    setOpenCreateModal: (open: boolean) => void;
    setOpenUpdateModal: (open: boolean) => void;
    setOpenDeleteModal: (open: boolean) => void;

}


export const useDocumentsStore = create<DocumentsStore>((set) => ({

    document: null,
    isLoading: false,
    error: null,
    openCreateModal: false,
    openUpdateModal: false,
    openDeleteModal: false,


    setDocument: (document) => set({ document }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    setOpenCreateModal: (openCreateModal) => set({ openCreateModal }),
    setOpenUpdateModal: (openUpdateModal) => set({ openUpdateModal }),
    setOpenDeleteModal: (openDeleteModal) => set({ openDeleteModal }),


}));
