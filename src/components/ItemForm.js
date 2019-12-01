import React, { Component } from 'react';
import firebase from '../firebase.js';
import ItemsList from './ItemsList.js';

class ItemForm extends Component {
  constructor() {
    super();
    this.state = {

      allItems: [],
      person1Total: 0,
      person2Total: 0,

      showItemsList: false
    }
  }

  addItemToBill = (event) => {
    event.preventDefault();

    // set ref for current bill obj
    const person1Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [0]);
    const person2Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [1]);

    const itemName = document.getElementById('itemName').value;
    let itemCost = Number(document.getElementById('itemCost').value);
    itemCost = itemCost.toFixed(2);
    itemCost = Number(itemCost);
    const person1 = document.getElementById('itemPerson1');
    const person2 = document.getElementById('itemPerson2');

    let person1CurrentTotal = this.state.person1Total;
    let person2CurrentTotal = this.state.person2Total;

    // check for which person is paying
    if (person1.checked === true && person2.checked === true) {
      let costPerPerson = (itemCost / 2).toFixed(2);
      costPerPerson = Number(costPerPerson);
      const item = {
        itemName: `1/2 ${itemName}`,
        itemCost: costPerPerson
      }

      
      person1CurrentTotal += costPerPerson;
      person2CurrentTotal += costPerPerson;
      this.setState({
        person1Total: person1CurrentTotal,
        person2Total: person2CurrentTotal
      })
      this.state.allItems.push({
        itemName: itemName,
        itemCost: itemCost,
        costPerPerson: costPerPerson,
        whosPaying: `${this.props.person1}, ${this.props.person2}` 
      })

      person1Ref.child('items').push(item);
      person2Ref.child('items').push(item);
      person1Ref.child('totalAmount').set(person1CurrentTotal);
      person2Ref.child('totalAmount').set(person2CurrentTotal);

    } else if (person1.checked === true) {
      const item = {
        itemName: itemName,
        itemCost: itemCost
      }
      person1Ref.child('items').push(item);
      

      person1CurrentTotal += itemCost;
      person1Ref.totalAmount = person1CurrentTotal;

      this.setState({
        person1Total: person1CurrentTotal
      })
      this.state.allItems.push({
        itemName: itemName,
        itemCost: itemCost,
        person1Total: person1CurrentTotal,
        whosPaying: this.props.person1 
      })
      person1Ref.child('totalAmount').set(person1CurrentTotal);

    } else if (person2.checked === true) {
      const item = {
        itemName: itemName,
        itemCost: itemCost
      }
      person2Ref.child('items').push(item);
      person2CurrentTotal += itemCost;
      this.setState({
        person2Total: person2CurrentTotal
      })
      this.state.allItems.push({
        itemName: itemName,
        itemCost: itemCost,
        person2Total: person2CurrentTotal,
        whosPaying: this.props.person2 
      })
      person2Ref.child('totalAmount').set(person2CurrentTotal);
    }


    // clear inputs
    document.getElementById('item-form').reset();

    this.setState({
      showItemsList: true
    })
      
  }

  render() {

    console.log("this.state.allItems");
    console.log(this.state.allItems);

    return (

      <div>

        <h2>{this.props.billName}</h2>

          {
            this.state.showItemsList 
              ? <ItemsList allItems={this.state.allItems} />
              : null
          }

          <form id="item-form" className="item-form flex-container">
            <div className="item-inputs">
              <label htmlFor="itemName">Enter an item</label>
              <input type="text" id="itemName"></input>
            </div>

            <div className="item-inputs">
              <label htmlFor="itemCost" className="item-cost-label">Item cost</label>
              <span className="dollar-sign">$ </span>
                <input type="number" min="0" step="0.01" id="itemCost" placeholder="0.00" className="cost-input" value={this.itemCost} onChange={this.inputChange}></input>
              
            </div>

            <fieldset>
              <legend>Who is paying for this item?</legend>

              <input type="checkbox" id="itemPerson1" name="person"></input>
              <label htmlFor="itemPerson1" className="nameLabel">{this.props.person1}</label>

              <input type="checkbox" id="itemPerson2" name="person"></input>
              <label htmlFor="itemPerson2" className="nameLabel">{this.props.person2}</label>
            </fieldset>

            <button className="add-item" onClick={this.addItemToBill}>Add Item</button>

          </form>

          <button onClick={this.props.doneAddingItems}>I'm done adding items!</button>

      </div>

    )
  }
}

export default ItemForm;