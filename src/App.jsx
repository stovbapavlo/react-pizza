import './scss/app.scss';
import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';

import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);
  //https://67963bf6bedc5d43a6c4a399.mockapi.io/items

  useEffect(() => {
    fetch('https://67963bf6bedc5d43a6c4a399.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => setItems(arr));
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
                // title={obj.title}
                // price={obj.price}
                // imageUrl={obj.imageUrl}
                // sizes={obj.sizes}
                // types={obj.types}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
