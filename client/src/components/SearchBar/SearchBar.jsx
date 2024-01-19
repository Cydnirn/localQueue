import React, { useState } from "react";
import "./SearchBar.css";
import { Search } from "@mui/icons-material";

function SearchBar({ placeholder, onSearch }) {
  const [wordEntered, setWordEntered] = useState("");

  const handleInputchange = (e) => {
    setWordEntered(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="searchbar">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleInputchange} className="form"
        />
        <div className="searchIcon">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;