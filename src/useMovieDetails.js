import { useState, useEffect } from 'react';

const API_KEY = 'bd39f942';

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMovie() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${encodeURIComponent(id)}`
        );

        if (!response.ok) {
          throw new Error('The movie request failed.');
        }

        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
          setMovie(null);
        } else {
          setMovie({
            id: data.imdbID,
            url: data.Poster !== 'N/A' ? data.Poster : null,
            title: data.Title,
            year: Number(data.Year) || 0,
            plot: data.Plot !== 'N/A' ? data.Plot : 'No description available.',
            // OMDB's imdbRating is 0-10; scale it to a 0-5 star rating
            rating: data.imdbRating !== 'N/A' ? Math.round((Number(data.imdbRating) / 2) * 10) / 10 : 0,
            originalPrice: 15,
            salePrice: 10,
          });
        }
      } catch (err) {
        setError('Sorry, this movie could not be loaded.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
}
