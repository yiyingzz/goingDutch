import React, { Component } from 'react';

class ItemsList extends Component {
  constructor() {
    super();
    this.state = {
      itemList: this.props.allItems
    }
  }

  componentDidMount() {
    // needs to listen for changes to this.props.allItems

  }
  
  render() {
    return (
      
      <div>
      <h2>List of Items</h2>

      {
        // loop through this.props.allItems
          // list by items

        

        this.state.itemList.forEach((item) => {
          return (`
          <p>${item.itemName} <span>Total Cost: ${item.itemCost}</span></p>
          <p>Who's Paying? <span>${item.whosPaying}</span></p>
          `) 
        })
      }

      </div>

    )

  }
}

export default ItemsList;