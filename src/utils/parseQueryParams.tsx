import qs from 'qs';
import { Order, FilterSliceState } from '../redux/slices/filter/types';
import { sortList } from '../components/Sort';

interface QueryParams {
  searchValue?: string | string[];
  sortType?: string | string[];
  order?: string | string[];
  categoryId?: string | string[];
  currentPage?: string | string[];
}

export function parseQueryParams(queryString: string): FilterSliceState {
  const params = qs.parse(queryString.replace(/^\?/, '')) as QueryParams;

  const foundSort = sortList.find((item) => item.sortProperty === params.sortType) || sortList[0];

  return {
    searchValue: typeof params.searchValue === 'string' ? params.searchValue : '',
    categoryId: params.categoryId ? +params.categoryId : 0,
    currentPage: params.currentPage ? +params.currentPage : 1,
    order: params.order === Order.ASC ? Order.ASC : Order.DESC,
    sort: foundSort,
  };
}
