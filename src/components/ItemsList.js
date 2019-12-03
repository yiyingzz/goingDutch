import React from 'react';

const ItemsList = (props) => {
  return (
    
    <section id="items-list" className="items-card card flex-container">
      <h4 className="card-heading">Items in Your Bill</h4>

      <ul>
        
      {
        props.allItems.map((item, i) => {
          if (item.costPerPerson == null) {
            return (
              <li key={i}>
                <p className="card-left card-strong">{item.itemName}</p> 
                <p className="card-right card-strong">${item.itemCost}</p>
                <p className="card-left card-small">Who's paying for it?</p>
                <p className="card-right card-small">{item.whosPaying}</p>
              </li>
            ) 
          } else {
            return (
              <li key={i}>
                <p className="card-left card-strong">{item.itemName}</p> 
                <p className="card-right card-strong">${item.itemCost}</p>
                <p className="card-left card-small">Who's paying for it?</p>
                <p className="card-right card-small">{item.whosPaying}</p>
                <p className="card-left card-small">Cost per person:</p>
                <p className="card-right card-small">${item.costPerPerson}</p>
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