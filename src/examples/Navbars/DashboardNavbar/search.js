import React, { useState } from "react";

function Search(onSubmit) {
  const [searchValue, setSearchValue] = useState("");
  const handleChange = ({ target }) => setSearchValue(target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchValue);
  };

  return (
    <div onSubmit={handleSubmit}>
      <input type="text" value={searchValue} onChange={handleChange} />
      <button type="button">search</button>
    </div>
  );
}

export default Search;
