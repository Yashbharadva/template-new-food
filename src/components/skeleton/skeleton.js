import React from "react";
import "./skeleton.css";

function Skeleton({ type }) {
  return (
    <div className="skeleton">
      <div className={type} />
    </div>
  );
}

export default Skeleton;
