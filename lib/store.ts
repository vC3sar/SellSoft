"import { create } from 'zustand';\
import { persist } from 'zustand/middleware';\
\
export interface CartItem {\
  productId: string;\
  variantId?: string | null;\
  name: string;\
  variantName?: string;\
  price: number;\
  quantity: number;\
  type: 'LICENSE' | 'SOFTWARE';\
}\
\
interface CartStore {\
  items: CartItem[];\
  addItem: (item: CartItem) => void;\
  removeItem: (productId: string, variantId?: string | null) => void;\
  updateQuantity: (productId: string, variantId: string | null | undefined, quantity: number) => void;\
  clearCart: () => void;\
  total: () => number;\
}\
\
export const useCartStore = create<CartStore>()(\
  persist(\
    (set, get) => ({\
      items: [],\
      addItem: (item) => set((state) => {\
        const existingItem = state.items.find(\
          (i) => i.productId === item.productId && i.variantId === item.variantId\
        );\
        if (existingItem) {\
          // For licenses or digital goods, usually we don't want absurdly high quantities. \
          // We limit to 10 here for safety.\
          const newQuantity = Math.min(existingItem.quantity + item.quantity, 10);\
          return {\
            items: state.items.map((i) =>\
              i.productId === item.productId && i.variantId === item.variantId\
                ? { ...i, quantity: newQuantity }\
                : i\
            ),\
          };\
        }\
        return { items: [...state.items, item] };\
      }),\
      removeItem: (productId, variantId) => set((state) => ({\
        items: state.items.filter(\
          (i) => !(i.productId === productId && i.variantId === variantId)\
        ),\
      })),\
      updateQuantity: (productId, variantId, quantity) => set((state) => ({\
        items: state.items.map((i) =>\
          i.productId === productId && i.variantId === variantId\
            ? { ...i, quantity: Math.max(1, Math.min(quantity, 10)) } // limit\
            : i\
        ),\
      })),\
      clearCart: () => set({ items: [] }),\
      total: () => {\
        const { items }
<truncated 168 bytes>