import React, { Component } from 'react';
import firebase from './firebase.js';

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

      billName: this.props.billName,
      person1: this.props.person1,
      person2: this.props.person2,
      itemName: '',
      itemCost: '',
      currentBillKey: this.props.currentBillKey,

      items: []
    }
  }

  // this needs to use the currentBillKey to input data onto the right bill
  componentDidMount() {
    const billRef = firebase.database().ref(this.props.currentBillKey);
    console.log("this.props.currentBillKey in componentDidMount");
    console.log(this.props.currentBillKey);

    console.log("billRef in componentDidMount");
    console.log(billRef);

    billRef.on('value', (snapshot) => {
      const itemList = snapshot.val();

      // this may not be necessary
      const newItems = [];
      for (let key in itemList) {
        console.log("itemList[key]");
        console.log(itemList[key]); // logging out keys
        newItems.push(itemList[key]); // push onto new array
        console.log("newItems list");
        console.log(newItems);
      }
    })

    // this.setState({
    //   items: newItems
    // })

  }

  // this needs to add individual items to each person
  addItemToBill = (event) => {
    event.preventDefault();

    // set ref for current bill obj
    const billRef = firebase.database().ref(this.state.currentBillKey);
    


    console.log("this.state.itemName", this.state.itemName);
    console.log("this.state.itemCost", this.state.itemCost);

    console.log("this.state.person1", this.state.person1);

    // issue is how to get the right person for each item?
    // need to get the selected checkbox id - this is the person
      // add the item & cost to their items array

      const itemName = document.getElementById('itemName').value;
      console.log(itemName);

      const itemCost = document.getElementById('itemCost').value;
      console.log(itemCost);

      const person1 = document.getElementById('itemPerson1');
      const person2 = document.getElementById('itemPerson2');
      console.log(person1, person2);
      console.log('person1.checked', person1.checked)
      // check for which person is paying
      if (person1.checked === true && person2.checked === true) {
        console.log("both are checked!");
      } else if (person1.checked === true) {
        console.log("person1 is checked!");
        
      } else if (person2.checked === true) {
        console.log("person2 is checked!");
      }
      
      
      console.log("itemCost:", itemCost);
      const costPerPerson = itemCost / 2;
      console.log("costPerPerson:", costPerPerson);
      const item = {
        itemName: costPerPerson
      }
      billRef.people[0].items.push(item);
      billRef.people[1].items.push(item);
      
      
      
      // should it start calculating total here? 
      // eg. update totalAmount as each item is added
        // I think this makes the most sense if we were to keep a running tab
        // also can't push to database without calculations

    // MATH TIME!
    // item cost / num of People = amountPaidPerPerson

    // give amountPaidPerPerson to each person involved
    // actually this is all 1 formula
  }

  render() {

    console.log("this.props in ItemForm.js");
    console.log(this.props);
    console.log("this.props.billName") 
    console.log(this.props.billName);
    console.log("this.state.billName");
    console.log(this.state.billName);
    console.log("this.props.currentBillKey");
    console.log(this.props.currentBillKey);

    return (

      <div>

        


        {/* 
          // ADDING ITEMS 
          // page shows inputs for adding items & cost for the event 
          // also shows people's names (maybe button-like element that you can click and "tag" people to the item
          // (this would determine if the item cost needs to be split between x num of people or not)
          // send info to database
            // as items & costs are added, they show up on the page in a list
            // [submit/done] button - or some sort of indicator from user that they are done adding items
        */}

        <h2>{this.state.billName}</h2>

          <form className="individual-item">
            
            <label htmlFor="itemName">Enter an item</label>
            <input type="text" id="itemName" value={this.itemName} onChange={this.inputChange}></input>
            
            <label htmlFor="itemCost">Cost of item</label>
            <input type="number" min="0" step="0.01" id="itemCost" placeholder="0.00" value={this.itemCost} onChange={this.inputChange}></input>

            <legend>Who is paying for this item?</legend>

            {/* SET A VALUE CORRESPONDING TO ORDER EACH PERSON WAS INPUTTED ORIGINALLY */}
            {/* NEED ERROR HANDLING FOR DECIMAL VALUES */}
            <input type="checkbox" id="itemPerson1" name="person"></input>
            <label htmlFor="itemPerson1">{this.state.person1}</label>

            <input type="checkbox" id="itemPerson2" name="person"></input>
            <label htmlFor="itemPerson2">{this.state.person2}</label>

            <button onClick={this.addItemToBill}>Add Item</button>

            
          </form>

      </div>

    )
  }
}

export default ItemForm;