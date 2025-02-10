import { TCartItem } from '../redux/slices/cart/types';
import { updateTotalPrice } from './updateTotalPrice';

export const getCartFromLocalStorage = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = updateTotalPrice(items);

  return {
    items: items as TCartItem[],
    totalPrice,
  };
};
