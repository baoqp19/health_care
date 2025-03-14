import { create } from 'zustand';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  isAuthenticated: boolean;
  isLoaded: boolean;
  user: User | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("access_token"), // double NOT ép kiểu về true false
  isLoaded: false,
  user: null,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setUser: (user) => set({ user }),
  clearUser: () => {
    localStorage.removeItem("access_token"); // Xóa token
    set({ user: null, isAuthenticated: false, isLoaded: true });
  }
}));