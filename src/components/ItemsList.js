import React from "react";
import SingleItem from "./SingleItem";

// functional component for displaying items in new bill
const ItemsList = props => {
  const { allItems } = props;

  return (
    <section id="items-list" className="items-card card flex-container">
      <h4 className="card-heading">Items in Your Bill</h4>

      <ul>
        {allItems.map((item, i) => {
          if (item.whosPaying.length === 1) {
            return (
              <SingleItem
                key={i}
                itemName={item.itemName}
                itemCost={item.itemCost}
                whosPaying={item.whosPaying[0]}
              />
            );
          } else if (item.whosPaying.length === 2) {
            const names = `${item.whosPaying[0]} and ${item.whosPaying[1]}`;
            return (
              <SingleItem
                key={i}
                itemName={item.itemName}
                itemCost={item.itemCost}
                whosPaying={names}
                costPerPerson={item.costPerPerson}
              />
            );
          } else {
            let names = "";
            item.whosPaying.forEach((person, i) => {
              if (i <= item.whosPaying.length - 2) {
                names += `${person}, `;
              } else if (i === item.whosPaying.length - 1) {
                names += `and ${person}`;
              }
            });

            return (
              <SingleItem
                key={i}
                itemName={item.itemName}
                itemCost={item.itemCost}
                whosPaying={names}
                costPerPerson={item.costPerPerson}
              />
            );
          }
        })}
      </ul>
    </section>
  );
};

export default ItemsList;
