import React from 'react';
import { Link } from 'react-router-dom';
import MovieLogo from "../assets/film-solid.png"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ cart = [] }) => {
  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const openMenu = () => {
    document.body.classList.add("menu--open");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu--open");
  };

  return (
    <nav>
      <div className="nav__container">
        <div className="nav__brand">
        <Link to="/">
          <img src={MovieLogo} alt="Movie logo" className="nav__logo" />
        </Link>
        </div>
        <ul className="nav__links">
          <li className="nav__list">
            <Link to="/" className="nav__link">
              Home
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/" className="nav__link">
              Movies
            </Link>
          </li>
          <li className="nav__list">
            <Link to="/about" className="nav__link no-cursor">
              About
            </Link>
          </li>
          <li className="nav__list nav__menu-button">
            <button className="btn__menu" type="button" onClick={openMenu} aria-label="Open menu">
              <FontAwesomeIcon icon={faBars} style={{ color: "black", fontSize: "24px" }} />
            </button>
          </li>
          <li className="nav__icon">
            <Link to="/cart" className="nav__link">
              <FontAwesomeIcon icon={faShoppingCart} style={{ color:"purple"}} />
            </Link>
            <span className="cart__length">{cartCount}</span>
          </li>
        </ul>
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={closeMenu} aria-label="Close menu">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link">
                Home
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/" className="menu__link">
                Movies
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/about" className="menu__link no-cursor" >
                About
              </Link>
            </li>
            <li className="menu__list">
              <Link to="/cart" className="menu__link">
                Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;