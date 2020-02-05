import React from "react";

const CardItem = props => {
  const { itemName, itemCost } = props;

  let itemPrice = itemCost;
  if (typeof itemCost === "number") {
    itemPrice = itemCost.toFixed(2);
  }
  return (
    <li>
      <p className="card-left invoice-item">{itemName}</p>
      <p className="card-right invoice-amount">${itemPrice}</p>
    </li>
  );
};

export default CardItem;
