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
      [event.target.id]: inputValue
    })

    console.log(inputValue);
  }

  validateInputs = (event, ...inputs) => {
    event.preventDefault();

    // input is in state so check if state is blank
    inputs.forEach((input) => {
      if (this.state.formValid) {
        if (input.trim() !== '' && input.trim().length > 0) {
          return input;
        } else {
          alert("Make sure you fill out the form!");
          this.setState({
            formValid: false
          })
        }
      }
    })

    // I used a setTimeout here b/c it seems like state isn't updating fast enough above
    setTimeout(() => {
      if (this.state.formValid) {
        this.createNewBill();
      } else {
        // reset state so the user can input again
        this.setState({
          formValid: true
        })
      }
    }, 500)
  }

  // this submits the first form that gets bill name & people names
  createNewBill = () => {
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
    
    // send bill info up to App.js & takes user to item form
    this.props.getBillInfo(this.state.billName, this.state.person1, this.state.person2, newBillKey);

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

          <button type="submit" onClick={(event) => this.validateInputs(event, this.state.billName, this.state.person1, this.state.person2)}>Submit</button>

        </form>

        <button className="list-bills" onClick={this.props.listAllBills}>See Previous Bills</button>
      </section>

    )
  }

}

export default NewBillForm;