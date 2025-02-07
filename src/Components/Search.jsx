import React from "react";

const Search = ({ searchValue, setsearchValue }) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="" />
        <input
          placeholder="Search through 300+ knowledge base"
          value={searchValue}
          onChange={(e) => setsearchValue(e.target.value)}
          type="text"
        />
      </div>
    </div>
  );
};

export default Search;