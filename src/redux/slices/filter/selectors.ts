import { RootState } from '../../store';

export const selectSort = (state: RootState) => state.filter;

export const selectSortOrder = (state: RootState) => state.filter.order;
