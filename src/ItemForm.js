import React, { Component } from 'react';
import firebase from './firebase.js';
import ItemsList from './ItemsList.js';

class ItemForm extends Component {
  constructor() {
    super();
    this.state = {

      allItems: [],
      person1Items: [],
      person2Items: [],
      showItemsList: false
    }
  }

  addItemToBill = (event) => {
    event.preventDefault();

    // set ref for current bill obj
    // const billRef = firebase.database().ref(this.props.currentBillKey);
    const person1Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [0]);
    const person2Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [1]);

    const itemName = document.getElementById('itemName').value;
    const itemCost = Number(document.getElementById('itemCost').value);
    const person1 = document.getElementById('itemPerson1');
    const person2 = document.getElementById('itemPerson2');

    // check for which person is paying
    if (person1.checked === true && person2.checked === true) {
      const costPerPerson = (itemCost / 2).toFixed(2);
      const item = {
        itemName: `1/2 ${itemName}`,
        itemCost: costPerPerson
      }

      person1Ref.child('items').push(item);
      person2Ref.child('items').push(item);

      this.state.person1Items.push(item);
      this.state.person2Items.push(item);
      this.state.allItems.push({
        itemName: itemName,
        itemCost: itemCost,
        costPerPerson: costPerPerson,
        whosPaying: `${this.props.person1}, ${this.props.person2}` 
      })

    } else if (person1.checked === true) {
      const item = {
        itemName: itemName,
        itemCost: itemCost
      }
      person1Ref.child('items').push(item);


      this.state.person1Items.push(item);
      this.state.allItems.push({
        itemName: itemName,
        itemCost: itemCost,
        whosPaying: this.props.person1 
      })

    } else if (person2.checked === true) {
      const item = {
        itemName: itemName,
        itemCost: itemCost
      }
      person2Ref.child('items').push(item);

      this.state.person2Items.push(item);
      this.state.allItems.push({
        itemName: itemName,
        itemCost: itemCost,
        whosPaying: this.props.person2 
      })
    }

    // I FORGOT TO CALCULATE TOTAL AMOUNT FOR EACH PERSON!!!!

    this.setState({
      showItemsList: true
    })
      
  }

  render() {

    console.log("this.state.allItems");
    console.log(this.state.allItems);

    return (

      <div>


        {/* 

          // ADDING ITEMS 
          // page shows inputs for adding items & cost for the event 
          // also shows people's names (maybe button-like element that you can click and "tag" people to the item
          // (this would determine if the item cost needs to be split between x num of people or not)

          // calculation time!
          // based on how items were split, calculate what each person needs to pay
          // each person would have an array of what they need to pay for, so app just needs to add it all up and get a total amount
          // send to database - update each person's total amount

          // send info to database
            // as items & costs are added, they show up on the page in a list
            // [submit/done] button - or some sort of indicator from user that they are done adding items


        */}

        <h2>{this.props.billName}</h2>


          {/* 
              ONCE an item has been added, make it show up here
              ternary to check if at least one item is there
          */}

          {
            this.state.showItemsList 
              ? <ItemsList allItems={this.state.allItems} />
              : null
          }




          <form className="individual-item">
            
            <label htmlFor="itemName">Enter an item</label>
            <input type="text" id="itemName" value={this.itemName} onChange={this.inputChange}></input>
            
            <label htmlFor="itemCost">Cost of item</label>
            <input type="number" min="0" step="0.01" id="itemCost" placeholder="0.00" value={this.itemCost} onChange={this.inputChange}></input>

            <legend>Who is paying for this item?</legend>

            {/* SET A VALUE CORRESPONDING TO ORDER EACH PERSON WAS INPUTTED ORIGINALLY */}
            {/* NEED ERROR HANDLING FOR DECIMAL VALUES */}

            <input type="checkbox" id="itemPerson1" name="person"></input>
            <label htmlFor="itemPerson1">{this.props.person1}</label>

            <input type="checkbox" id="itemPerson2" name="person"></input>
            <label htmlFor="itemPerson2">{this.props.person2}</label>

            <button onClick={this.addItemToBill}>Add Item</button>

            
          </form>

          <button onClick={(event) => this.props.doneAddingItems(event)}>I'm done adding items!</button>

      </div>

    )
  }
}

export default ItemForm;