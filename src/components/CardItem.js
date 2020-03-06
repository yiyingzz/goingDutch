import React from "react";

const CardItem = props => {
  const { itemName, itemCost } = props;
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
      <p className="card-left invoice-item">{itemName}</p>
      <p className="card-right invoice-amount">${itemPrice}</p>
    </li>
  );
};

export default CardItem;
