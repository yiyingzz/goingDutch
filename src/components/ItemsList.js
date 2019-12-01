import React from 'react';

const ItemsList = (props) => {
  return (
    
    <div>
      <h2>List of Items</h2>

      <ul>
      
      {
        props.allItems.map((item) => {
          return (
            <li>
              <p>{item.itemName} <span>Total Cost: {item.itemCost}</span></p>
              <p>Who's Paying? <span>{item.whosPaying}</span></p>
            </li>
          ) 
        })
      }

      </ul>
    
    </div>

  )
}

export default ItemsList;