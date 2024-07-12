import { CartType } from "@/schemaValidations/cart.schema";
import { create } from 'zustand'

export type TypeCartStore = {
    cart: CartType;
    setCart: (cart: CartType) => void;
}

const useCartStore = create<TypeCartStore>((set) => ({
    cart: {} as CartType,
    setCart: (cart) => set({ cart }),
}))

export default useCartStore;