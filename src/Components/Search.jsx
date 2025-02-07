import React from "react";

const Search = ({searchValue, setSearchValue}) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="search" />
        <input
          placeholder="Search through thounsands of movies"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
        />
      </div>
    </div>
  );
};
export default Search;
