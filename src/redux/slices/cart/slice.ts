import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLocalStorage } from '../../../utils/getCartFromLocalStorage';
import { updateTotalPrice } from '../../../utils/updateTotalPrice';
import { CartSliceState, TCartItem } from './types';

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = updateTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) findItem.count--;

      state.totalPrice = updateTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrice = updateTotalPrice(state.items);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
