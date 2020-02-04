import React from "react";

const SingleItem = props => {
  const { itemName, itemCost, whosPaying, costPerPerson } = props;

  return (
    <li>
      <p className="card-left card-strong">{itemName}</p>
      <p className="card-right card-strong">${itemCost}</p>
      <p className="card-left card-small">Who's paying for it?</p>
      <p className="card-right card-small">{whosPaying}</p>
      {costPerPerson !== undefined ? (
        <div>
          <p className="card-left card-small">Cost per person:</p>
          <p className="card-right card-small">${costPerPerson}</p>
        </div>
      ) : null}
    </li>
  );
};

export default SingleItem;
