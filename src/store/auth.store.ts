import { TypeDataAccountRes } from '@/schemaValidations/account.schema';
import { create } from 'zustand'

export type TypeUsers = {
  user: TypeDataAccountRes | undefined;
  setUser: (user: TypeDataAccountRes) => void;
  isShowLoginDialog: boolean;
  setIsShowLoginDialog: (isShowLoginDialog: boolean) => void;
}

const useAuthStore = create<TypeUsers>()((set) => ({
  user: undefined,
  setUser: (user: TypeDataAccountRes) => {
    set({ user })
  },
  isShowLoginDialog: false,
  setIsShowLoginDialog: (isShowLoginDialog: boolean) => {
    set({ isShowLoginDialog })
  }
}));

export default useAuthStore;