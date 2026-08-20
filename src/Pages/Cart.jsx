import React from 'react';
import { Link } from 'react-router-dom';
import EmptyCart from '../assets/empty_cart.svg';

const Cart = ({ cart, changeQuantity, removeItem }) => 
{
  const subtotal = cart.reduce(
    (total, item) => total + ((item.salePrice ?? item.originalPrice) * (item.quantity || 1)),
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (!cart.length) {
    return (
      <div id="movies__body">
        <main className="movies__main">
          <div className="movies__container">
            <div className="row">
              <div className="movie__selected--top">
                <h2 className="cart__title">Cart</h2>
              </div>
              <div className="cart__empty">
                <img src={EmptyCart} alt="Empty shopping cart" className="cart__empty--img" />
                <h2>Your cart is empty.</h2>
                <Link to="/">
                  <button className="btn">Browse Movies</button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div id="movies__body">
      <main className="movies__main">
        <div className="movies__container">
          <div className="row">
            <div className="movie__selected--top">
              <h2 className="cart__title">Cart</h2>
            </div>
            <div className="cart__header">
              <span className="cart__movie">Movie</span>
              <span className="cart__quantity">Quantity</span>
              <span className="cart__total">Total</span>
            </div>
            {cart.length === 0 && (<div className="cart__empty">
              <img src={EmptyCart} alt="" className="cart__empty--img" />
              <h2>You don't have any movies in your cart!</h2>
              <Link to="/">
              <button className="btn">Browse Movies</button></Link>
            </div>)}
            <div className="cart__body">
              {cart.map((movie) => (
                <div className="cart__item" key={`${movie.id}-${movie.title}`}>
                  <div className="cart__movie">
                    <img className="cart__movie--img" src={movie.url} alt={movie.title} />
                    <div className="cart__movie--info">
                      <span className="cart__movie--title">{movie.title}</span>
                      <span className="cart__movie--price">${((movie.salePrice || movie.originalPrice) * (movie.quantity || 1)).toFixed(2)}</span>
                      <button className="cart__book--remove" onClick={() => removeItem(movie)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart__quantity">
                    <input type="number" min={0} max={99} className="cart__input" onChange={(event) => changeQuantity(movie, Number(event.target.value))} defaultValue={movie.quantity || 1} />
                  </div>
                  <div className="cart__total">
                    ${((movie.salePrice || movie.originalPrice) * (movie.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {cart.length > 0 && (<div className="total">
            <div className="total__item total__sub-total">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total__item total__tax">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total__item total__price">
              <span>Price</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="btn btn__checkout" onClick={() => alert('Have not gotten around to doing this.')}>Proceed to Checkout</button>
          </div>)}
        </div>
      </main>
    </div>
  );
};

export default Cart;
