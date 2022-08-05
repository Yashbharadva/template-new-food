import React from "react";
import "./tagDrop.styles.scss";

function TagPopupC({ user, tags, setTags, setTagPopUp, setSearchField }) {
  const handleTagSave = () => {
    setTags([...tags, user]);
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
      {user}
    </div>
  );
}
export default TagPopupC;
