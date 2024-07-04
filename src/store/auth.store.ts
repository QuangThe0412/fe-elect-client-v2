import { create } from 'zustand'
import { AccountResType } from '@/schemaValidations/account.schema'

type User = AccountResType['data']

export type TypeUsers = {
  user: User;
  setUser: (user: User) => void;
}

const useAuthStore = create<TypeUsers>()((set) => ({
  user: {} as User,
  setUser: (user: User) =>{
    set({ user })
  }
}));

export default useAuthStore;