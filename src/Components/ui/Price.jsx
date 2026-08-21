import React from "react";

const Price = ({ salePrice, originalPrice }) => {
  return (
    <div className="movie__price">
      {salePrice ? (
        <>
          <span className="movie__price--normal">
            ${movie.originalPrice.toFixed(2)}
          </span>
          ${movie.salePrice.toFixed(2)}
        </>
      ) : (
        `$${movie.originalPrice.toFixed(2)}`
      )}
    </div>
  );
};

export default Price;
