import React, { Component } from "react";
import firebase from "../firebase.js";
import ItemsList from "./ItemsList.js";

class ItemForm extends Component {
  constructor() {
    super();
    this.state = {
      formValid: true,
      checkboxValid: true,
      showItemsList: false,
      isItemsListBlank: false,

      allItems: [],
      people: [], // people objects on the array

      itemName: "",
      itemCost: "",
      whosPaying: [] // array of people's names
    };
  }

  componentDidMount() {
    const billRef = firebase.database().ref(this.props.currentBillKey);

    billRef.on("value", snapshot => {
      const items = snapshot.val().allItems;
      const itemsList = [];
      for (let item in items) {
        itemsList.push(items[item]);
      }

      this.setState({
        allItems: itemsList,
        people: this.props.people
      });
    });
  }

  checkboxChange = event => {
    // create a new array from state
    const updatedPeople = [...this.state.people];

    // toggles the checkbox
    const checked = updatedPeople[event.target.dataset.idx].checked;
    updatedPeople[event.target.dataset.idx].checked = !checked;

    this.setState({
      people: updatedPeople,
      checkboxValid: true
    });
  };

  inputChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      formValid: true
    });
  };

  // check if all inputs were filled out
  validateInputs = (event, itemNameInput, itemCostInput) => {
    event.preventDefault();

    if (
      Number(itemCostInput) !== 0 &&
      itemNameInput.trim() !== "" &&
      0 < itemNameInput.trim().length &&
      this.state.formValid
    ) {
      this.validateCheckboxes();
    } else {
      this.setState({
        formValid: false
      });
    }
  };

  validateCheckboxes = () => {
    let uncheckedCounter = 0;
    this.state.people.forEach(person => {
      if (person.checked !== true) {
        uncheckedCounter++;
        // if all people are unchecked
        if (uncheckedCounter === this.state.people.length) {
          this.setState({
            checkboxValid: false
          });
        }
      }
    });
    if (this.state.checkboxValid) {
      this.addItemToBill();
    }
  };

  checkForItems = () => {
    if (this.state.allItems.length === 0) {
      this.setState({
        isItemListBlank: true
      });
    } else {
      // display the bill
      this.props.displayBill(this.props.currentBillKey);
    }
  };

  addItemToBill = () => {
    // set ref for current bill
    const billRef = firebase.database().ref(this.props.currentBillKey);

    // get who's paying for the current item
    const whosPaying = this.state.people
      .filter(person => person.checked)
      .map(person => {
        return person.name;
      });

    if (0 < whosPaying.length) {
      // calculate price per person
      const costPerPerson = Number(this.state.itemCost) / whosPaying.length;

      // set up reference to database people array
      const peopleRef = billRef.child("people");

      const item = {
        itemName: this.state.itemName,
        itemCost: this.state.itemCost,
        costPerPerson: costPerPerson.toFixed(2),
        whosPaying: whosPaying
      };

      //  push to database to allItems list
      billRef.child("allItems").push(item);

      const splitItem = {};
      if (whosPaying.length === 1) {
        splitItem.itemName = this.state.itemName;
        splitItem.itemCost = this.state.itemCost;
      } else {
        // create split item for each person who's paying
        splitItem.itemName = `1/${whosPaying.length} ${this.state.itemName}`;
        splitItem.itemCost = costPerPerson.toFixed(2);
      }

      const updatedPeople = [...this.state.people];
      updatedPeople.forEach(person => {
        if (person.checked === true) {
          person.items.push(splitItem);
          // set total amount for each person
          let totalAmount = Number(person.totalAmount);
          totalAmount += Number(costPerPerson);
          person.totalAmount = Number(totalAmount).toFixed(2);
        }
      });

      // pushing item to database for each individual person
      this.state.people.forEach((person, i) => {
        if (person.checked) {
          const personRef = peopleRef.child(i);
          personRef.child("items").push(splitItem);
          personRef.child("totalAmount").set(person.totalAmount);
          person.checked = false; // reset
        }
      });

      // update people state, reset inputs & show items list
      this.setState({
        itemName: "",
        itemCost: "",
        people: updatedPeople,
        showItemsList: true,
        isItemListBlank: false
      });
    }
  };

  render() {
    return (
      <section id="item-form-section">
        <h2 className="item-form-bill-title">{this.props.billName}</h2>

        {this.state.showItemsList ? (
          <ItemsList allItems={this.state.allItems} />
        ) : null}

        <h3>Add Items to Your Bill</h3>

        {this.state.isItemListBlank ? (
          <p className="form-error">
            It looks like you need to add some items to your bill!
          </p>
        ) : null}

        {!this.state.formValid ? (
          <p className="form-error">
            Please fill out all sections of the form properly!
          </p>
        ) : null}

        {!this.state.checkboxValid ? (
          <p className="form-error">Please select who will pay for the item!</p>
        ) : null}

        <form id="item-form" className="item-form flex-container">
          <div className="item-inputs item-inputs__name">
            <label htmlFor="itemName">Enter an item</label>
            <input
              type="text"
              id="itemName"
              placeholder="Item Name"
              value={this.state.itemName}
              onChange={this.inputChange}
            ></input>
          </div>

          <div className="item-inputs item-inputs__cost">
            <label htmlFor="itemCost" className="item-cost-label">
              Item cost <span className="label-dollar-sign">($)</span>
            </label>
            <span className="dollar-sign">$ </span>
            <input
              type="number"
              min="0"
              step="0.01"
              id="itemCost"
              placeholder="0.00"
              className="cost-input"
              value={this.state.itemCost}
              onChange={this.inputChange}
            ></input>
          </div>

          <div className="item-form-bottom">
            <fieldset>
              <legend>Who is paying for this item?</legend>

              {this.props.people.map((person, i) => {
                const personId = `person${i}`;
                return (
                  <label
                    htmlFor={personId}
                    key={personId}
                    className="name-label"
                  >
                    <input
                      type="checkbox"
                      id={personId}
                      data-idx={i}
                      checked={person.checked}
                      onChange={this.checkboxChange}
                    ></input>
                    {person.name}
                  </label>
                );
              })}
            </fieldset>

            <button
              className="alternate-button add-item-button"
              onClick={event =>
                this.validateInputs(
                  event,
                  this.state.itemName,
                  this.state.itemCost
                )
              }
            >
              Add Item
            </button>
          </div>
        </form>

        <button className="done-adding" onClick={() => this.checkForItems()}>
          I'm done adding items!
        </button>
      </section>
    );
  }
}

export default ItemForm;
