import { CartType } from "@/schemaValidations/cart.schema";
import { create } from 'zustand'

export type TypeCartStore = {
    cart: CartType;
    setCart: (cart: CartType) => void;
    loadingCart: boolean;
    setLoadingCart: (loadingCart: boolean) => void;
}

const useCartStore = create<TypeCartStore>((set) => ({
    cart: {} as CartType,
    setCart: (cart) => set({ cart }),
    loadingCart: false,
    setLoadingCart: (loadingCart: boolean) => set({ loadingCart }),
}))

export default useCartStore;