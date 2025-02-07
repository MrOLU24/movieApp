import React from "react";
import Search from "./Components/Search";
import { useState } from "react";
function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You’ll Love
            Without the Hassle
          </h1>
          <Search searchValue={searchValue} setSearchValue={setSearchValue}/>
        </header>
      </div>
    </main>
  );
}

export default App;
