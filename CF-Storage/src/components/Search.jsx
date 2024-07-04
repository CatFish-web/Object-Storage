import React, { useState } from "react";

const Search = ({ setQuery, setCurrentPage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(inputValue);
    setCurrentPage(1); 
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-bar">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5308af8b2c2ceea3186be55a4c443dc4042525f0d6a68f51cbfc153ac84cb32a?apiKey=61b20d1a1e1848d2bcaf0e442b285d46&"
            className="search-icon"
            alt="Search icon"
            onClick={handleSearch}
          />
          <input
            type="search"
            value={inputValue}
            className="search_input"
            placeholder="Search..."
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
