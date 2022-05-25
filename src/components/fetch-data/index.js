import React from "react";

const fetchData = ({ item }) => {
  const { name, email } = item;
  return (
    <div className="fetch-data">
      <div className="name">{name}</div>
      <div className="email">{email}</div>
    </div>
  );
};

export default fetchData;
