import React from "react";
import { useState, useEffect } from "react";
import Search from "./Components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchValue, setsearchValue] = useState("");
const [errorMessage, setErrorMessage] = useState('');


  const fetchMovies = async () => {
    try{
    

    }catch(error){
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies, please try again later.');
    }
  }
  // useEffect(()=>{

  // }, deps[])
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
          </h1>
          <Search searchValue={searchValue} setsearchValue={setsearchValue} />
          <h1 className="text-white">{searchValue}</h1>
        </header>
        <section>
          <h2>All Movies</h2>
          {errorMessage && <p className="text-red-700">{errorMessage}</p>}
        </section>
      </div>
    </main>
  );
};
export default App;
