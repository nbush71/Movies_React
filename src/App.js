import { Routes, Route } from 'react-router-dom';
import './App.css';
import MovieDetails from '../src/Pages/MovieDetails.jsx';
import Footer from '../src/Components/Footer.jsx';
import Nav from '../src/Components/Nav.jsx';
import Home from '../src/Pages/Home.jsx';
import Cart from '../src/Pages/Cart.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(movie) {
    setCart((currentCart) => {
      const dupeItem = currentCart.find((item) => +item.id === +movie.id);

      if (dupeItem) {
        return currentCart.map((item) =>
          +item.id === +movie.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }

      return [...currentCart, { ...movie, quantity: 1 }];
    });
  }

  function changeQuantity(movie, quantity) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        +item.id === +movie.id
          ? { ...item, quantity: quantity }
          : item
      )
    );
  }

  function removeItem(movie) {
    setCart(cart.filter(item => movie.id !== item.id))
  }

  useEffect(() => {
    console.log(cart);
  }, [cart])

  return (
    <div className="App">
      <Nav cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/movies/:id"
          element={
            <MovieDetails
              cart={cart}
              changeQuantity={changeQuantity}
              addToCart={addToCart}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;