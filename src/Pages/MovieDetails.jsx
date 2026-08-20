import { useParams, Link } from 'react-router-dom';
import Ratings from '../Components/ui/Ratings.jsx';
import Price from '../Components/ui/Price.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Movie from '../Components/Movie.jsx';
import { useMovieDetails } from '../useMovieDetails.js';
import { useMovies } from '../useMovies.js';

const MovieDetails = ({ cart = [], addToCart }) => {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetails(id);

  // Reuse the first word of the title as a loose "related movies" search
  const recommendedSearchTerm = movie ? movie.title.split(' ')[0] : '';
  const { movies: recommended } = useMovies(recommendedSearchTerm);

  function addMovieToCart(movieToAdd) {
    addToCart(movieToAdd);
  }

  function movieExistsOnCart() {
    return cart.some((cartMovie) => cartMovie.id === id);
  }

  if (loading) {
    return (
      <main className="container__movie--selected">
        <p>Loading movie...</p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="container__movie--selected">
        <p>Movie not found.</p>
        <Link to="/">Back to Movies</Link>
      </main>
    );
  }

  return (
    <main className="container__movie--selected">
      <div className="book__selected">
        <figure className="movie__selected--figure">
          <img className="movie__selected--img" src={movie.url} alt={movie.title} />
        </figure>
        <div className="movie__selected--description">
          <div className="book__selected--top">
            <Link to="/" className="movie__selected--link">
              <FontAwesomeIcon icon="arrow-left" /> Back
            </Link>
          </div>
          <h2 className="movie__selected--title">{movie.title} ({movie.year})</h2>
          <div className="movie__summary">
            <h3 className="movie__summary--title">Description</h3>
            <p className="movie__summary--para">{movie.plot}</p>
          </div>
          <Ratings rating={movie.rating} />
          <div className="movie__price">
            <Price originalPrice={movie.originalPrice} salePrice={movie.salePrice} />
          </div>
          {movieExistsOnCart() ? (
            <Link to={`/cart`} className="movie__link">
              <button className="btn">Checkout</button>
            </Link>
          ) : (
            <button className="btn" onClick={() => addMovieToCart(movie)}>
              Add to cart
            </button>
          )}
        </div>
      </div>
      <div className="movies__container">
        <div className="row">
          <div className="movie__selected--top">
          </div>
          <div className="movies">
            {recommended
              .filter((rec) => rec.id !== movie.id)
              .slice(0, 4)
              .map((rec) => <Movie movie={rec} key={rec.id} />)}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
