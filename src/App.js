import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js'; // DO I NEED THIS HERE
import NewBillForm from './components/NewBillForm.js';
import ItemForm from './components/ItemForm.js';
import DisplayBill from './components/DisplayBill.js';

class App extends Component {

  // need to put data into this.state
  constructor() {
    super();
    this.state = {

      // need multiple input values, one for each input
      // need to get these from NewBillForm
      billName: '',

      person1: 'yiying',
      person2: 'pikachu',
      person1ItemsKey: '',
      person2ItemsKey: '',
      
      currentBillKey: `-Lv1CJx1Nq81k5TbV3-f`,

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

  listAllBills = (event) => {
    event.preventDefault();
    this.setState({
      listAllBills: true
    })
  }

  render() {


    return (
      <div className="App">

        <header>
          <div className="wrapper">
            <h1>Going Dutch</h1>
            <h2>A Bill Splitter for Two</h2>
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
                listAllBills={this.listAllBills}
              />
            : null
          }


          {/* { 
            this.state.listAllBills
              ? <ListAllBills /> 
              : null
          } */}

        </div> {/* --- /.wrapper ----- */}
        
        <footer>
          <div className="wrapper">
            <p>Made by <a href="https://www.yiying.ca">Yiying Zou</a> 2019</p>
          </div>
        </footer>

      </div>
    );
  }
}

export default App;