import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzasArgs, PizzaItem } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { search, currentPage, categoryId, sortType, order } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://67963bf6bedc5d43a6c4a399.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${sortType}&order=${order}${search}`,
    );
    return data;
  },
);
