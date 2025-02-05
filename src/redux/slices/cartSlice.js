import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

const updateTotalPrice = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });

      updateTotalPrice(state);
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;

        if (findItem.count === 0) {
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }
      }
      updateTotalPrice(state);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      updateTotalPrice(state);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
