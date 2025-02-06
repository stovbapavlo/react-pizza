import { FC } from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

export const CartEmpty: FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Cart is empty 😕</h2>
        <p>
          Most likely, you haven't ordered a pizza yet.
          <br />
          To order a pizza, go to the homepage.
        </p>
        <img src={cartEmptyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Return to homepage</span>
        </Link>
      </div>
    </>
  );
};
