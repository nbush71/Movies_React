import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/film-solid.png';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <Link to="/">
            <figure className="footer__logo">
              <img src={Logo} className="footer__logo--img" alt="" />
            </figure>
          </Link>
          <div className="footer__list">
            <Link to="/" className="footer__link">
              Home
            </Link>
            <Link to="/about" className="footer__link no-cursor">
              About
            </Link>
            <Link to="/" className="footer__link">
              Movies
            </Link>
            <Link to="/cart" className="footer__link">
              Cart
            </Link>
          </div>
          <div className="footer__copyright">Copyright &copy; 2021 Movies</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
