import { TypeDataAccountRes } from '@/schemaValidations/account.schema';
import { create } from 'zustand'

export type TypeUsers = {
  user: TypeDataAccountRes | undefined;
  setUser: (user: TypeDataAccountRes) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<TypeUsers>()((set) => ({
  user: undefined,
  setUser: (user: TypeDataAccountRes) => {
    set({ user })
  },
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {
    set({ isAuthenticated })
  },
}));

export default useAuthStore;