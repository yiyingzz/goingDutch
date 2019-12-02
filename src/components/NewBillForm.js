import React, { Component } from 'react';
import firebase from '../firebase.js';

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

    // check for blank inputs
    if (this.state.billName == false || this.state.person1 == false || this.state.person2 == false) {
      alert("Make sure you fill out each part of the form!");
    } else {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate() + 1;
      const dateCreated = `${year}-${month}-${day}`;
    
      //assign input value to new top level object in dbRef
      const dbRef = firebase.database().ref();

      // push the new bill item & save the key
      const newBillItem = dbRef.push({
        billName: this.state.billName,
        dateCreated: dateCreated,
        people: [
          {
            name: this.state.person1,
            totalAmount: 0 
          },
          {
            name: this.state.person2,
            totalAmount: 0
          }
        ]
      });

      const newBillKey = newBillItem.key;
      
      // send bill info up to App.js
      this.props.getBillInfo(this.state.billName, this.state.person1, this.state.person2, newBillKey)
    
    }
  }

  render() {
    return (

      <section id="new-bill">
        <h3>Create a new bill</h3>
        <form>

          <label htmlFor="billName">What's this bill for?</label>
          <input type="text" id="billName" placeholder="Bill name" value={this.state.billName} onChange={this.inputChange}></input>

          <label htmlFor="person1">Who's splitting this bill?</label>
          <input type="text" id="person1" placeholder="Name" value={this.state.person1} onChange={this.inputChange}></input>

          <label htmlFor="person2">Who else is splitting this bill?</label>
          <input type="text" id="person2" placeholder="Name" value={this.state.person2} onChange={this.inputChange}></input>

          <button type="submit" onClick={this.addNewBill}>Submit</button>

        </form>

        <button onClick={this.props.listAllBills}>See Previous Bills</button>
      </section>

    )
  }

}

export default NewBillForm;