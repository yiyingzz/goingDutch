import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js'; // DO I NEED THIS HERE
import NewBillForm from './NewBillForm.js';
import ItemForm from './ItemForm.js';
import DisplayBill from './DisplayBill.js';

class App extends Component {

  // need to put data into this.state
  constructor() {
    super();
    this.state = {

      // need multiple input values, one for each input
      // need to get these from NewBillForm
      billName: '',

      person1: '',
      person2: '',
      person1ItemsKey: '',
      person2ItemsKey: '',
      
      currentBillKey: `-LuygpOX5b-98D_LZGn0`,

      showNewBillForm: true,
      showItemForm: true,
      displayBill: true,
      listAllBills: false

    }
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


  doneAddingItems = () => {
    this.setState({
      showItemForm: false,
      displayBill: true   
    })
  }

  showFrontPage = (event) => {
    event.preventDefault();
    this.setState({
      showNewBillForm: true,
      displayBill: false
    })
  }

  render() {


    return (
      <div className="App">

        <header>
          <div className="wrapper">
            <h1>Going Dutch!</h1>
          </div>
        </header>

        <div className="wrapper">

          {
            this.state.showNewBillForm
              ? <NewBillForm 
                  getBillInfo={this.getBillInfo}
                />
              : null
          }
          
          {
            this.state.showItemForm 
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
                showFrontPage={this.showFrontPage}
              />
            : null
          }


          {/* { 
            this.state.listAllBills
              ? <ListAllBills /> 
              : null
          } */}

        </div>
      </div>
    );
  }
}

export default App;