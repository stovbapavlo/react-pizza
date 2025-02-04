import { useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { Categories } from '../components/Categories';
import { Sort, sortList } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { AppContext } from '../App';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, order, currentPage } = useSelector((state) => state.filter);

  const sortType = sort.sortProperty;
  const { searchValue } = useContext(AppContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onPageChange = (number) => {
    dispatch(setCurrentPage(number));
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
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sort.sortProperty,
        order,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, order, searchValue, currentPage]);

  //Перевірка URL параматрів якщо був перший рендер і сохраняєм в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((item) => item.sortProperty === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  //Якщо був перший рендер то робимо запит
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, order, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>No items</h2>
          <p>something went wrong</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onPageChange} />
    </div>
  );
};
