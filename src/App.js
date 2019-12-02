import React, { Component } from 'react';
import './styles/style.css';
import NewBillForm from './components/NewBillForm.js';
import ItemForm from './components/ItemForm.js';
import DisplayBill from './components/DisplayBill.js';
import ListAllBills from './components/ListAllBills.js';

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
      
      currentBillKey: '',

      showNewBillForm: true,
      showItemForm: false,
      displayBill: false,
      listAllBills: false

    }
  }

  // refactor this to only need billKey - use info from database for everything else
  // then use this function in ListAllBills to get info
    // have to do something about the showFOrms part
  getBillInfo = (billName, person1, person2, billKey) => {

    this.setState({
      billName: billName,
      person1: person1,
      person2: person2,
      currentBillKey: billKey,

      // showNewBillForm: false,
      showItemForm: true
    })
  }

  showFrontPage = () => {
    this.setState({
      showNewBillForm: true,
      displayBill: false,
      listAllBills: false
    })
  }

  listAllBills = () => {
    this.setState({
      showNewBillForm: false,
      displayBill: false,
      listAllBills: true
    })
  }

  displayBill = (billKey) => {
    this.setState({
      currentBillKey: billKey,
      showNewBillForm: false,
      showItemForm: false,
      listAllBills: false,
      displayBill: true
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
                  listAllBills={this.listAllBills}
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
                  displayBill={this.displayBill}
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


          { 
            this.state.listAllBills
              ? <ListAllBills 
                  showFrontPage={this.showFrontPage}
                  displayBill={this.displayBill}
                /> 
              : null
          }

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