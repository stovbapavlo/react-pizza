import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import './scss/app.scss';
import { Home } from './pages/Home';
import { MainLayout } from './layouts/MainLayout';
import { lazy, Suspense } from 'react';
import NotFound from './pages/NotFound';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));

// const Cart = Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "Cart" */ './pages/Cart').then((module) => module.default),
//   loading: () => <div>loading...</div>,
// });

const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Download...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
