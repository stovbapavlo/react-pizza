import axios from 'axios';
import { useEffect, useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://67963bf6bedc5d43a6c4a399.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('something went wrong!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>loading...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} $</h4>
    </div>
  );
};
