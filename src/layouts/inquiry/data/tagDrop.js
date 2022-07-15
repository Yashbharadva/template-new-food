import React from "react";
import "./tagDrop.styles.scss";

function TagPopupC({ name, tags, setTags, setTagPopUp, setSearchField }) {
  const handleTagSave = () => {
    setTags([...tags, name]);
    setTagPopUp(false);
    setSearchField("");
  };
  return (
    <div
      className="tagpopup"
      role="button"
      tabIndex={0}
      onClick={handleTagSave}
      onKeyDown={handleTagSave}
    >
      {name}
    </div>
  );
}
export default TagPopupC;
