import React from "react";
import CardItem from "./CardItem";

const IndividualBillCard = props => {
  const { name, totalAmount, items } = props;
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  let totalPrice = totalAmount;
  if (typeof totalAmount === "number") {
    totalPrice = totalAmount.toFixed(2);
  } else {
    totalPrice = Number(totalAmount).toFixed(2);
  }
  totalPrice = formatNumber(totalPrice);

  const billItems = [];
  for (let item in items) {
    billItems.push(items[item]);
  }

  return (
    <div className="invoice-card card">
      <h4 className="card-heading">{name}</h4>
      <ul className="flex-container">
        {billItems.length === 0 ? (
          <li>
            <p className="card-small">
              It looks like {name} doesn't need to pay for anything on this
              bill. Lucky {name}!
            </p>
          </li>
        ) : (
          billItems.map((item, i) => {
            return (
              <CardItem
                key={i}
                itemName={item.itemName}
                itemCost={item.itemCost}
              />
            );
          })
        )}
      </ul>
      <div className="invoice-total card-heading">
        <p className="card-left invoice-item">Total Amount to Pay:</p>
        <p className="card-right invoice-amount">${totalPrice}</p>
      </div>
    </div>
  );
};

export default IndividualBillCard;
