import React, { Component } from 'react';
import firebase from './firebase.js';

class NewBillForm extends Component {
  constructor() {
    super();
    this.state = {
      billName: '',
      person1: '',
      person2: '',
    }
  }
  
  inputChange = (event) => {
    const inputValue = event.target.value;

    this.setState({
      [event.target.id]: inputValue
    })
  }

  // this submits the first form that gets bill name & people names
  addNewBill = (event) => {
    event.preventDefault();

    //assign input value to new top level object in dbRef
    const dbRef = firebase.database().ref();

    // push the new bill item & save the key
    const newBillItem = dbRef.push({
      billName: this.state.billName,
      people: [
        {
          name: this.state.person1,
          totalAmount: 0 // maybe not necessary right here
        },
        {
          name: this.state.person2,
          totalAmount: 0
        }
      ]
    });

    const newBillKey = newBillItem.key;
      
    this.props.getBillInfo(this.state.billName, this.state.person1, this.state.person2, newBillKey)

  }

  render() {
    return (

      <form className="bill-name-form">

          <label htmlFor="billName">What's the bill for?/Enter a name for this bill (could be event name)</label>
          <input type="text" id="billName" value={this.state.billName} onChange={this.inputChange}></input>

          <label htmlFor="person1">Who's splitting this bill?</label>
          <input type="text" id="person1" value={this.state.person1} onChange={this.inputChange}></input>

          <label htmlFor="person2">Who else is splitting this bill?</label>
          <input type="text" id="person2" value={this.state.person2}onChange={this.inputChange}></input>

          <button type="submit" onClick={this.addNewBill}>Submit</button>

        </form>

    )
  }

}

export default NewBillForm;