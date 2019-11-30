import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';
import NewBillForm from './NewBillForm.js';
import ItemForm from './ItemForm.js';
import DisplayBill from './DisplayBill.js';

class App extends Component {

  // need to put data into this.state
  constructor() {
    super();
    this.state = {

      // events is an array representing the database
      bills: [],

      // need multiple input values, one for each input
      // need to get these from NewBillForm
      billName: '',

      person1: '',
      person2: '',
      
      currentBillKey: '',

      showNewBillForm: true,
      showItemForm: false,
      displayBill: false,
      listAllBills: false

    }
  }
  

  componentDidMount() {
    // connect to firebase database in componentDidMount()
    const dbRef = firebase.database().ref();
    console.log(dbRef);
    
    // need to listen for changes in database
      // then add to this.state.bills array
    dbRef.on('value', (snapshot) => {
      const bills = snapshot.val();

      const newBills = [];
      for (let key in bills) {
        console.log(bills[key]); // logging out all the keys (separate bills)
        newBills.push(bills[key]); // push onto new array
      }

      this.setState({
        bills: newBills
      })

      console.log("logging this.state.bills from componentDidMount", this.state.bills);
    })

  }


  getBillInfo = (billName, person1, person2, billKey) => {

    this.setState({
      billName: billName,
      person1: person1,
      person2: person2,
      currentBillKey: billKey,

      showNewBillForm: false,
      showItemForm: true
    })
  }


doneAddingItems = (event) => {
  event.preventDefault();
  // basically just needs to take us to a page displaying what each person is paying for
  console.log("doneAddingItems() running in App.js!");

  this.setState({
    showItemForm: false,
    // displayBill: true   // making this true displays the bill info with total $$
  })
}


  render() {


    return (
      <div className="App">
        <h1>Going Dutch!</h1>


        {/* 
        // INITIAL SETUP FOR EVENT
        // first, input for event/thing to split & total amount
          // add people to pay for it
          // [submit] button
          // send to database to create new Event object
        */}
        
        {/* 
            Probably this form below can be a component
            Use ternary to determine when it shows up for viewer
        */}

        {/* <form className="bill-name-form">

          <label htmlFor="billName">What's the bill for?/Enter a name for this bill (could be event name)</label>
          <input type="text" id="billName" value={this.state.billName} onChange={this.inputChange}></input>

          <label htmlFor="person1">Who's splitting this bill?</label>
          <input type="text" id="person1" value={this.state.person1} onChange={this.inputChange}></input>

          <label htmlFor="person2">Who else is splitting this bill?</label>
          <input type="text" id="person2" value={this.state.person2}onChange={this.inputChange}></input>

          <button type="submit" onClick={this.addNewBill}>Submit</button>

        </form> */}

        {/* 
         */}

        {
          this.state.showNewBillForm
            ? <NewBillForm 
                getBillInfo={this.getBillInfo}
              />
            : null
        }
        
        {
          this.state.showItemForm  // change to showItemForm
            ? <ItemForm 
                currentBillKey={this.state.currentBillKey} 
                billName={this.state.billName} // ****
                person1={this.state.person1} 
                person2={this.state.person2}
                doneAddingItems={this.doneAddingItems}
              />
            : null

            // **** technically can just use currentBillKey to get data from database & prob don't need the other props ??
        }

        {
          this.state.displayBill
          ? <DisplayBill 
              currentBillKey={this.state.currentBillKey} 
            /> // need to pass in bill Info
          : null
        }


        {/* { 
          this.state.listAllBills
            ? <ListAllBills /> 
            : null
        } */}


      </div>
    );
  }
}

export default App;