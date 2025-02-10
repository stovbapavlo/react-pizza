import { TCartItem } from '../redux/slices/cart/types';

export const updateTotalPrice = (items: TCartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
