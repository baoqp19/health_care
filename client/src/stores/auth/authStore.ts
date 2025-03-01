import { create } from 'zustand';


interface AuthState {
  isAuthenticated: boolean;
  isLoaded: boolean;
  user: any | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoaded: (isLoaded: boolean) => void;
  setUser: (user: any | null) => void;
  clearUser: () => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoaded: false,
  user: null,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, isAuthenticated: false, isLoaded: true }),
}));