import { FC, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { Status } from '../redux/slices/pizza/types';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectSort } from '../redux/slices/filter/selectors';

export const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, order, currentPage, searchValue } = useSelector(selectSort);

  const sortType = sort.sortProperty;

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onPageChange = (value: number) => {
    dispatch(setCurrentPage(value));
  };

  const getPizzas = async () => {
    const search = searchValue ? `&search=${encodeURIComponent(searchValue)}` : '';

    dispatch(
      fetchPizzas({
        search,
        currentPage,
        categoryId,
        sortType,
        order,
      }),
    );
  };

  //Перевірка на перший рендер якщо змінили параметри
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortType: sort.sortProperty,
  //       order,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, order, searchValue, currentPage]);

  //Перевірка URL параматрів якщо був перший рендер і сохраняєм в redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const stateFromURL = parseQueryParams(window.location.search);

  //     dispatch(setFilters(stateFromURL));
  //     isSearch.current = true;
  //   }
  // }, []);

  //Якщо був перший рендер то робимо запит
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, order, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>No items</h2>
          <p>something went wrong</p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onPageChange} />
    </div>
  );
};
