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
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
});

export const { setCategoryId, setSort, setOrder, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
