import React, { Component } from 'react';
import firebase from '../firebase.js';

class NewBillForm extends Component {
  constructor() {
    super();
    this.state = {
      billName: '',
      person1: '',
      person2: '',
      formValid: true,
    }
  }
  
  inputChange = (event) => {
    const inputValue = event.target.value;

    this.setState({
      [event.target.id]: inputValue,
      formValid: true
    })

    console.log(inputValue);
  }

  // check it inputs were filled out properly
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
      this.createNewBill();
    }
  }

  // this submits the first form that gets bill name & people names
  createNewBill = () => {
    // getting the date 
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate() + 1;
    const dateCreated = `${year}-${month}-${day}`;

    // database reference
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
    
    // send bill info up to App.js & takes user to item form
    this.props.getBillInfo(this.state.billName, this.state.person1, this.state.person2, newBillKey);
  }

  render() {
    return (

      <section id="bill-form-section">
        <h3>Create a New Bill</h3>

        {
          this.state.formValid === false
            ? <p className="form-error">Please fill out all sections of the form!</p>
            : null
        }

        <form>
          <label htmlFor="billName">What's this bill for?</label>
          <input type="text" id="billName" placeholder="Bill name" value={this.state.billName} onChange={this.inputChange}></input>

          <label htmlFor="person1">Who's splitting this bill?</label>
          <input type="text" id="person1" placeholder="Name" value={this.state.person1} onChange={this.inputChange}></input>

          <label htmlFor="person2">Who else is splitting this bill?</label>
          <input type="text" id="person2" placeholder="Name" value={this.state.person2} onChange={this.inputChange}></input>

          <button type="submit" onClick={(event) => this.validateInputs(event, this.state.billName, this.state.person1, this.state.person2)}>Submit</button>
        </form>

        <button className="alternate-button" onClick={this.props.listAllBills}>See Previous Bills</button>

      </section>

    )
  }

}

export default NewBillForm;