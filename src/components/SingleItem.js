import React from "react";

const SingleItem = props => {
  const { itemName, itemCost, whosPaying, costPerPerson } = props;

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  let itemPrice = itemCost;
  if (typeof itemCost === "number") {
    itemPrice = itemCost.toFixed(2);
  } else {
    itemPrice = Number(itemCost).toFixed(2);
  }
  itemPrice = formatNumber(itemPrice);

  return (
    <li>
      <p className="card-left card-strong">{itemName}</p>
      <p className="card-right card-strong">${itemPrice}</p>
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
