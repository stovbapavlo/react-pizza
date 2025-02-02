import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setOrder, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
