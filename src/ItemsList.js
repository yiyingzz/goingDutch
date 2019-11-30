import React from 'react';

function ItemsList(props) {
  return (
    
    <div>
      <h2>List of Items</h2>

    {
      props.allItems.map((item) => {
        return (
          <div>
            <p>{item.itemName} <span>Total Cost: {item.itemCost}</span></p>
            <p>Who's Paying? <span>{item.whosPaying}</span></p>
          </div>
        ) 
      })
    }

    </div>

  )

}

export default ItemsList;