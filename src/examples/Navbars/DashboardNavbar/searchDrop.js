import React from "react";
// import "./tagDrop.scss";

function SearchDrop({ text, search, setSearch, setSearchPop, setSearchField }) {
  const handleSearch = () => {
    setSearch([...search, text]);
    setSearchPop(false);
    setSearchField("");
  };
  return (
    <div
      className="tagpopup"
      role="button"
      tabIndex={0}
      onClick={handleSearch}
      onKeyDown={handleSearch}
    >
      {text}
    </div>
  );
}
export default SearchDrop;
