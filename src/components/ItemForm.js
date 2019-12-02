import React, { Component } from 'react';
import firebase from '../firebase.js';
import ItemsList from './ItemsList.js';

class ItemForm extends Component {
  constructor() {
    super();
    this.state = {

      formValid: true,
      checkboxes: true,

      allItems: [],
      person1Total: 0,
      person2Total: 0,
      
      itemName: '',
      itemCost: '',
      whosPaying1: false,
      whosPaying2: false,

      showItemsList: false
    }
  }

  inputChange = (event) => {
    if (event.target.type === "checkbox") {
      this.setState({
        [event.target.id]: event.target.checked
      })
    } else {
      this.setState({
        [event.target.id]: event.target.value
      })
    }
  }

  validateInputs = (event, ...inputs) => {
    event.preventDefault();

    let formChecker = true;
    inputs.forEach((input) => {
      if (!(this.state.formValid && input.trim() !== '' && input.trim().length > 0)) {
        formChecker = false;
      }
    })
    if (formChecker === false) {
      this.setState({
        formValid: false
      })
    } else {
      this.validateCheckboxes();
    }
  }

  validateCheckboxes = () => {
    // check if at least one checkbox is checked
    if (this.state.whosPaying1 === false && this.state.whosPaying2 === false) {
      alert("Please make sure you've selected who will be paying for this item!");
    } else {
      this.addItemToBill();
    }
  }

  addItemToBill = () => {

    // set ref for current bill obj
    const person1Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [0]);
    const person2Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [1]);

    let person1CurrentTotal = Number(this.state.person1Total);
    let person2CurrentTotal = Number(this.state.person2Total);

    // check for which person is paying
    if (this.state.whosPaying1 === true && this.state.whosPaying2 === true) {
      let costPerPerson = (this.state.itemCost / 2).toFixed(2);
      
      costPerPerson = Number(costPerPerson);
      person1CurrentTotal += costPerPerson;
      person2CurrentTotal += costPerPerson;

      // updating state
      this.setState({
        person1Total: person1CurrentTotal,
        person2Total: person2CurrentTotal
      })
      this.state.allItems.push({
        itemName: this.state.itemName,
        itemCost: this.state.itemCost,
        costPerPerson: costPerPerson,
        whosPaying: `${this.props.person1}, ${this.props.person2}` 
      })

      // push to database
      const item = {
        itemName: `1/2 ${this.state.itemName}`,
        itemCost: costPerPerson
      }
      person1Ref.child('items').push(item);
      person2Ref.child('items').push(item);
      person1Ref.child('totalAmount').set(person1CurrentTotal);
      person2Ref.child('totalAmount').set(person2CurrentTotal);

    } else if (this.state.whosPaying1 === true) {
      
      // update state
      person1CurrentTotal += Number(this.state.itemCost);
      this.setState({
        person1Total: person1CurrentTotal
      })
      this.state.allItems.push({
        itemName: this.state.itemName,
        itemCost: this.state.itemCost,
        whosPaying: this.props.person1 
      })
      
      // push to database
      const item = {
        itemName: this.state.itemName,
        itemCost: this.state.itemCost
      }
      person1Ref.child('items').push(item);
      person1Ref.child('totalAmount').set(person1CurrentTotal);

    } else if (this.state.whosPaying2 === true) {
      // update state
      person2CurrentTotal += Number(this.state.itemCost);
      this.setState({
        person2Total: person2CurrentTotal
      })
      this.state.allItems.push({
        itemName: this.state.itemName,
        itemCost: this.state.itemCost,
        whosPaying: this.props.person2 
      })

      // push to database
      const item = {
        itemName: this.state.itemName,
        itemCost: this.state.itemCost
      }
      person2Ref.child('items').push(item);
      person2Ref.child('totalAmount').set(person2CurrentTotal);
    }

    // reset inputs & show items list
    this.setState({
      itemName: '',
      itemCost: '',
      whosPaying1: false,
      whosPaying2: false,
      showItemsList: true
    }) 
  }

  render() {

    console.log("this.state.allItems");
    console.log(this.state.allItems);

    return (

      <section id="item-section">

        <h2>{this.props.billName}</h2>

          {
            this.state.showItemsList 
              ? <ItemsList allItems={this.state.allItems} />
              : null
          }

          <h3>Add Items to Your Bill</h3>
          <form id="item-form" className="item-form flex-container">

            <div className="item-inputs">
              <label htmlFor="itemName">Enter an item</label>
              <input type="text" id="itemName" value={this.state.itemName} onChange={this.inputChange}></input>
            </div>

            <div className="item-inputs">
              <label htmlFor="itemCost" className="item-cost-label">Item cost <span className="label-dollar-sign">($)</span></label>
              <span className="dollar-sign">$ </span>
                <input type="number" min="0" step="0.01" id="itemCost" placeholder="0.00" className="cost-input" value={this.state.itemCost} onChange={this.inputChange}></input>
              
            </div>

            <fieldset>
              <legend>Who is paying for this item?</legend>

              <label htmlFor="whosPaying1" className="name-label">
              <input type="checkbox" id="whosPaying1" name="whosPaying" checked={this.state.whosPaying1} onChange={this.inputChange}></input>{this.props.person1}</label>

              <label htmlFor="whosPaying2" className="name-label">
              <input type="checkbox" id="whosPaying2" name="whosPaying" checked={this.state.whosPaying2} onChange={this.inputChange}></input>{this.props.person2}</label>
            </fieldset>

            <button className="add-item" onClick={(event) => this.validateInputs(event, this.state.itemName, this.state.itemCost)}>Add Item</button>

          </form>

          <button className="done-adding" onClick={() => this.props.displayBill(this.props.currentBillKey)}>I'm done adding items!</button>

      </section>

    )
  }
}

export default ItemForm;