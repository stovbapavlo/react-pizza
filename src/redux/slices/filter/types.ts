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
