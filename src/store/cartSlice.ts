import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../.types/prdoduct";

interface CartItem {
  product: IProduct;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          product: action.payload,
          quantity: 1
        });
      }
    },
    increase: (state, action: PayloadAction<IProduct>) => {
      const item = state.items.find(item => item.product.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decrease: (state, action: PayloadAction<IProduct>) => {
      const itemIndex = state.items.findIndex(item => item.product.id === action.payload.id);
      
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity <= 1) {
          state.items.splice(itemIndex, 1); // Remove item if quantity becomes 0
        } else {
          item.quantity -= 1;
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id.toString() !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increase, decrease, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;