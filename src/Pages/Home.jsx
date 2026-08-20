import React, { useState } from "react";
import Landing from '../Components/Landing.jsx';
import Movies from "../Pages/Movies.jsx";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Landing onSearch={setSearchTerm} />
      <main>
        <Movies searchTerm={searchTerm} />
      </main>
    </>
  );
};

export default Home;
