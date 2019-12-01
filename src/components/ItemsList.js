import React from 'react';

const ItemsList = (props) => {
  return (
    
    <section id="items-list" className="items-card flex-container">
      <h3>Items in Your Bill</h3>

      <ul>
        
      {
        props.allItems.map((item) => {
          if (item.costPerPerson == null) {
            return (
              <li>
                <p className="invoice-item">{item.itemName}</p> 
                <p className="invoice-amount">${item.itemCost}</p>
                <p className="whos-paying">Who's paying for it?</p>
                <p className="whos-paying-names">{item.whosPaying}</p>
              </li>
            ) 
          } else {
            return (
              <li>
                <p className="invoice-item">{item.itemName}</p> 
                <p className="invoice-amount">${item.itemCost}</p>
                <p className="whos-paying">Who's paying for it?</p>
                <p className="whos-paying-names">{item.whosPaying}</p>
                <p className="cost-per-person">Cost per person:</p>
                <p className="item-cost">${item.costPerPerson}</p>
              </li>
            ) 
          }
        })
      }

      </ul>
    
    </section>

  )
}

export default ItemsList;