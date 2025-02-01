import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'rating',
    sortProperty: 'rating',
  },
  order: 'desc',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setOrder(state) {
      state.order = state.order === 'desc' ? 'asc' : 'desc';
    },
  },
});

export const { setCategoryId, setSort, setOrder } = filterSlice.actions;

export default filterSlice.reducer;
