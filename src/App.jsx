import React from "react";
import { useState, useEffect } from "react";
import Search from "./Components/Search";
import LoadingSpinner from "./Components/LoadingSpinner";
import MovieCard from "./Components/Moviecard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";
import { getTrendingMovies } from "./appwrite";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchvalue, setdebounceSearchvalue] = useState("");
  const [trendingMovies, settrendingMovies] = useState([]);

  useDebounce(() => setdebounceSearchvalue(searchValue), 500, [searchValue]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.Error || "Error fetching movies");
        setMovies([]);
        return;
      }
      setMovies(data.results || []);
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  const LoadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      settrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };
  useEffect(() => {
    fetchMovies(debounceSearchvalue);
  }, [debounceSearchvalue]);

  useEffect(() => {
    LoadTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img className="size-24" src="./logo.png" alt="logo" />
          <img src="./hero.png" alt="hero" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
          </h1>
          <Search searchValue={searchValue} setsearchValue={setsearchValue} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2> Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};
export default App;
