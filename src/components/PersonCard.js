import React from "react";
import CardItem from "./CardItem";

const PersonCard = props => {
  const { name, totalAmount, items } = props;

  let totalPrice = totalAmount;
  if (typeof totalAmount === "number") {
    totalPrice = totalAmount.toFixed(2);
  }

  const billItems = [];
  for (let item in items) {
    billItems.push(items[item]);
  }

  return (
    <div className="invoice-card card">
      <h4 className="card-heading">{name}</h4>
      <ul className="flex-container">
        {billItems.map((item, i) => {
          return (
            <CardItem
              key={i}
              itemName={item.itemName}
              itemCost={item.itemCost}
            />
          );
        })}
      </ul>
      <div className="invoice-total card-heading">
        <p className="card-left invoice-item">Total Amount to Pay:</p>
        <p className="card-right invoice-amount">${totalPrice}</p>
      </div>
    </div>
  );
};

export default PersonCard;
