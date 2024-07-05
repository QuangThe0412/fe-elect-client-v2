import { TypeDataAccountRes } from '@/schemaValidations/account.schema';
import { create } from 'zustand'

export type TypeUsers = {
  user: TypeDataAccountRes;
  setUser: (user: TypeDataAccountRes) => void;
}

const useAuthStore = create<TypeUsers>()((set) => ({
  user: {} as TypeDataAccountRes,
  setUser: (user: TypeDataAccountRes) => {
    set({ user })
  }
}));

export default useAuthStore;