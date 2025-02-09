import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum Order {
  DESC = 'desc',
  ASC = 'asc',
}

export enum SortKey {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type TSort = {
  name: string;
  sortProperty: SortKey;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: TSort;
  order: Order.DESC | Order.ASC;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: SortKey.RATING,
    sortProperty: SortKey.RATING,
  },
  order: Order.DESC,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<TSort>) {
      state.sort = action.payload;
    },
    setOrder(state) {
      state.order = state.order === Order.DESC ? Order.ASC : Order.DESC;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.order = action.payload.order;
    },
  },
});

export const selectSort = (state: RootState) => state.filter;

export const selectSortOrder = (state: RootState) => state.filter.order;

export const { setCategoryId, setSort, setOrder, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
