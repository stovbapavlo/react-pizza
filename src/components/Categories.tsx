import { FC } from 'react';

type CategoriesProps = {
  value: number;
  onChangeCategory: any;
};

export const Categories: FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Spicy', 'Closed'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
