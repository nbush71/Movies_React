import React, { useState } from 'react';
import Movie from '../Components/Movie.jsx';
import { useMovies } from '../useMovies.js';

const Movies = ({ searchTerm }) => {
  const { movies, loading, error } = useMovies(searchTerm);
  const [sortedMovies, setSortedMovies] = useState(null);
  const displayMovies = sortedMovies ?? movies;

  function filterMovies(filter) {
    const sorted = [...movies];
    if (filter === 'LOW_TO_HIGH') {
      sorted.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
    }
    if (filter === 'HIGH_TO_LOW') {
      sorted.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
    }
    if (filter === 'RATING') {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    if (filter === 'YEAR') {
      sorted.sort((a, b) => b.year - a.year);
    }
    setSortedMovies(sorted);
  }

  return (
    <main id="movies__main">
      <section>
        <div className="movies__container">
          <div className="row">
            <div className="movies__header">
              <h2 className="section__title movies__header--title">All Movies</h2>
              <select id="filter" defaultValue="DEFAULT" onChange={(event) => filterMovies(event.target.value)}>
                <option value="DEFAULT" disabled>Sort</option>
                <option value="LOW_TO_HIGH">Price, Low to High</option>
                <option value="HIGH_TO_LOW">Price, High to Low</option>
                <option value="RATING">Rating</option>
                <option value="YEAR">Year</option>
              </select>
            </div>

            {loading && <p>Loading movies...</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
              <div className="movies">
                {displayMovies && displayMovies.map((movie) => (
                  <Movie movie={movie} key={movie.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Movies;
