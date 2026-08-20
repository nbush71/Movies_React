import { useState, useEffect } from 'react';

const API_KEY = 'bd39f942';

export function useMovies(searchTerm) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm || 'fast')}`
        );

        if (!response.ok) {
          throw new Error('The movie request failed.');
        }

        const data = await response.json();

        if (data.Response === 'False') {
          setError(data.Error);
          setMovies([]);
        } else {
          const mapped = data.Search.map((item) => ({
            id: item.imdbID,
            url: item.Poster !== 'N/A' ? item.Poster : null,
            title: item.Title,
            year: Number(item.Year) || 0,
            rating: 5,
            originalPrice: 15,
            salePrice: 10,
          }));
          setMovies(mapped);
        }
      } catch (err) {
        setError('Sorry, movies could not be loaded.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchTerm]);

  return { movies, loading, error };
}
