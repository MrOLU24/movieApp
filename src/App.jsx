import React from "react";
import { useState } from "react";
import Search from "./Components/Search";
const App = () => {
  const [searchValue, setsearchValue] = useState("");
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
      </div>
    </main>
  );
};
export default App;
