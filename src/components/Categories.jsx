import { useState } from 'react';

export function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ['All', 'Meat', 'Vegat', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? 'active' : ''}>
            {value}
          </li>
        ))}
        {/* <li onClick={() => onClickCategory(0)} className={activeIndex === 0 ? 'active' : ''}>
          Все
        </li> */}
      </ul>
    </div>
  );
}
