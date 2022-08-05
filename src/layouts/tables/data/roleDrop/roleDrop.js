import React from "react";

import "./roleDrop.styles.scss";

function RoleDrop({ name, setRolePopup, setNewRole }) {
  return (
    <div
      className="tagpopup"
      onClick={() => {
        setRolePopup(false);
        setNewRole(name);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={() => {
        setRolePopup(false);
        setNewRole(name);
      }}
    >
      {name}
    </div>
  );
}
export default RoleDrop;
