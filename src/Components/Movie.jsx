import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Ratings from './ui/Ratings'; 
import Price from "./ui/Price";

const Movie = ({ movie }) => {
  const [setImg] = useState();

  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = movie.url;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 300);
    };

    return () => {
      //When the component unmounts
      mountedRef.current = false;
    };
  })

  return (
    <div className="movie">
      <Link to={`/movies/${movie.id}`}>
        <figure className="movie__img--wrapper">
            <img className="movie__img" src={movie.url || '/placeholder-poster.png'} alt={movie.title} />
        </figure>
      </Link>
      <div className="movie__title">
        <Link to={`/movies/${movie.id}`} className="movie__title--link">
          {movie.title}
        </Link>
      </div>
      <Ratings rating={movie.rating} />
      <Price originalPrice={movie.originalPrice} salePrice={movie.salePrice} />
    </div>
  );
};

export default Movie;
