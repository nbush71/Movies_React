import { useState } from "react";
import '../App.css';
import '../index.css';

const Landing = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (term.trim()) onSearch(term.trim());
  }

  return (
    // ...your existing hero markup...
    <form onSubmit={handleSubmit} className="search__form">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="  Search for a movie title..."
        className="search__input"
      />
      <button type="submit" className="btn">Search</button>
    </form>
    // ...
  );
};

export default Landing;