import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { AppContext } from '../App';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const Home = () => {
  const { categoryId, sort, order, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(AppContext);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onPageChange = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `&search=${encodeURIComponent(searchValue)}` : '';

    axios
      .get(
        `https://67963bf6bedc5d43a6c4a399.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortType}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onPageChange} />
    </div>
  );
};
