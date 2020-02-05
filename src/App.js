import React, { Component } from "react";
import "./styles/style.css";
import NewBillForm from "./components/NewBillForm.js";
import ItemForm from "./components/ItemForm.js";
import DisplayBill from "./components/DisplayBill.js";
import ListAllBills from "./components/ListAllBills.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      billName: "",

      people: [],
      currentBillKey: "",

      showNewBillForm: true,
      showItemForm: false,
      displayBill: false,
      listAllBills: false
    };
  }

  getBillInfo = (billName, billDate, people, billKey) => {
    this.setState({
      billName: billName,
      billDate: billDate,
      people: people,
      currentBillKey: billKey,

      showNewBillForm: false,
      showItemForm: true
    });
  };

  showFrontPage = () => {
    this.setState({
      showNewBillForm: true,
      displayBill: false,
      listAllBills: false
    });
  };

  listAllBills = () => {
    this.setState({
      showNewBillForm: false,
      displayBill: false,
      listAllBills: true
    });
  };

  displayBill = billKey => {
    this.setState({
      currentBillKey: billKey,
      showItemForm: false,
      listAllBills: false,
      displayBill: true
    });
  };

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
          {this.state.showNewBillForm ? (
            <NewBillForm
              getBillInfo={this.getBillInfo}
              listAllBills={this.listAllBills}
            />
          ) : null}

          {this.state.showItemForm ? (
            <ItemForm
              currentBillKey={this.state.currentBillKey}
              billName={this.state.billName}
              people={this.state.people}
              displayBill={this.displayBill}
            />
          ) : null}

          {this.state.displayBill ? (
            <DisplayBill
              currentBillKey={this.state.currentBillKey}
              showFrontPage={this.showFrontPage}
              listAllBills={this.listAllBills}
            />
          ) : null}

          {this.state.listAllBills ? (
            <ListAllBills
              showFrontPage={this.showFrontPage}
              displayBill={this.displayBill}
            />
          ) : null}
        </div>
        {/* --- /.wrapper ----- */}
        <footer>
          <div className="wrapper">
            <p>
              Made by{" "}
              <a
                href="https://www.yiying.ca"
                target="_blank"
                rel="noopener noreferrer"
              >
                Yiying Zou
              </a>{" "}
              2020
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
