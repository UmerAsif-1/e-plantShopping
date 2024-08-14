import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,  // Add this to track the total quantity
  },
  reducers: {
    
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      state.totalQuantity++; // Increment the total quantity
    },
    removeItem: (state, action) => {
      const itemToRemove = state.items.find(item => item.name === action.payload);
      if (itemToRemove) {
        state.totalQuantity -= itemToRemove.quantity; // Decrease by the quantity of the removed item
        state.items = state.items.filter(item => item.name !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        state.totalQuantity += quantity - itemToUpdate.quantity; // Adjust the total quantity
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
