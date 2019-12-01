import React from 'react';

const ItemsList = (props) => {
  return (
    
    <section id="items-list" className="invoice-card flex-container">
      <h2>List of Items in Your Bill</h2>

      <ul>
        
      {
        props.allItems.map((item) => {
          return (
            <li>
              <p className="invoice-item">{item.itemName}</p> 
              <p className="invoice-amount">${item.itemCost}</p>
              <p className="whos-paying">Who's paying for it? {item.whosPaying}</p>
            </li>
          ) 
        })
      }

      </ul>
    
    </section>

  )
}

export default ItemsList;