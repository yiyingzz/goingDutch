import React, { Component } from "react";
import firebase from "../firebase.js";
import ItemsList from "./ItemsList.js";

class ItemForm extends Component {
  constructor() {
    super();
    this.state = {
      formValid: true,
      checkboxValid: true,
      checkboxes: true,
      showItemsList: false,

      allItems: [],
      people: [], // people objects on the array
      // {
      // name: "yiying",
      // checked: false,
      // totalAmount: 0;
      // items: [] // empty array
      // }

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
      console.log(items); // starts off undefined cuz it doesn't exist yet
      console.log("this.props.people");
      console.log(this.props.people);

      this.setState({
        allItems: itemsList,
        people: this.props.people
      });
    });
  }

  inputChange = event => {
    if (event.target.type === "checkbox") {
      const updatedPeople = [...this.state.people];
      console.log(updatedPeople);
      // creating a new array from state
      let currentPerson = updatedPeople[event.target.dataset.idx];
      // grabbing current person
      currentPerson = { ...currentPerson };
      // using spread this way replaces the property
      console.log(currentPerson);
      // toggles the checkbox
      const checked = updatedPeople[event.target.dataset.idx].checked;
      updatedPeople[event.target.dataset.idx].checked = !checked;
      console.log(updatedPeople);

      this.setState({
        people: updatedPeople,
        checkboxValid: true
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value,
        formValid: true
      });
    }
  };

  // check if all inputs were filled out
  validateInputs = (event, ...inputs) => {
    event.preventDefault();

    let formChecker = true;
    inputs.forEach(input => {
      if (
        !(
          this.state.formValid &&
          input.trim() !== "" &&
          input.trim().length > 0
        )
      ) {
        formChecker = false;
      }
    });

    if (formChecker === false) {
      this.setState({
        formValid: false
      });
    } else {
      this.validateCheckboxes();
    }
  };

  validateCheckboxes = () => {
    // check if at least one checkbox is checked
    // do this by looping through people.checked & look for true
    // counter
    let checkedCounter = 0;
    this.state.people.forEach(person => {
      if (person.checked === true) {
        console.log(person.checked);
        this.addItemToBill();
        return;
      } else {
        checkedCounter++;
        // if all people are checked "false"
        if (checkedCounter === this.state.people.length) {
          this.setState({
            checkboxValid: false
          });
        }
      }
    });
    // if (this.state.whosPaying1 === false && this.state.whosPaying2 === false) {
    //   this.setState({
    //     checkboxValid: false
    //   });
    // } else {
    //   this.addItemToBill();
    // }
  };

  addItemToBill = () => {
    // set ref for current bill
    const billRef = firebase.database().ref(this.props.currentBillKey);

    console.log(billRef);
    console.log("loggin people array", this.state.people);
    console.log("logging items array", this.state.allItems);

    // get item info & push to database

    // get who pays
    const whosPaying = [];
    // counter for how many people pay - we'll use this number for math calculations later
    let whosPayingCounter = 0;
    this.state.people.forEach(person => {
      if (person.checked === true) {
        whosPaying.push(person.name);
        whosPayingCounter++;
      }
    });

    const item = {
      itemName: this.state.itemName,
      itemCost: this.state.itemCost,
      whosPaying: whosPaying
    };
    //  push to database
    billRef.child("allItems").push(item);

    // calculate price per person
    const costPerPerson = Number(this.state.itemCost) / whosPayingCounter;
    billRef.child("people"); // this is an array of people
    // need to push costPerPerson to the items array on people
    // need to calculate total amount and push onto the right person
  };

  // addItemToBill = () => {
  //   // set ref for current bill
  //   const billRef = firebase.database().ref(this.props.currentBillKey);
  //   // const person1Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [0]);
  //   // const person2Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [1]);

  //   // let person1CurrentTotal = Number(this.state.person1Total);
  //   // let person2CurrentTotal = Number(this.state.person2Total);

  //   // check for which person is paying
  //   if (this.state.whosPaying1 === true && this.state.whosPaying2 === true) {
  //     let costPerPerson = (this.state.itemCost / 2).toFixed(2);
  //     costPerPerson = Number(costPerPerson);
  //     person1CurrentTotal += costPerPerson;
  //     person2CurrentTotal += costPerPerson;

  //     // update state
  //     // this.setState({
  //     //   person1Total: person1CurrentTotal,
  //     //   person2Total: person2CurrentTotal
  //     // });

  //     // push to database
  //     //   const item = {
  //     //     itemName: this.state.itemName,
  //     //     itemCost: this.state.itemCost,
  //     //     costPerPerson: costPerPerson,
  //     //     whosPaying: `${this.props.person1} & ${this.props.person2}`
  //     //   };
  //     //   const splitItem = {
  //     //     itemName: `1/2 ${this.state.itemName}`,
  //     //     itemCost: costPerPerson,
  //     //     whosPaying: `${this.props.person1} & ${this.props.person2}`
  //     //   };
  //     //   billRef.child("allItems").push(item);
  //     //   person1Ref.child("items").push(splitItem);
  //     //   person2Ref.child("items").push(splitItem);
  //     //   person1Ref.child("totalAmount").set(person1CurrentTotal);
  //     //   person2Ref.child("totalAmount").set(person2CurrentTotal);
  //     // } else if (this.state.whosPaying1 === true) {
  //     //   // update state
  //     //   person1CurrentTotal += Number(this.state.itemCost);
  //     //   this.setState({
  //     //     person1Total: person1CurrentTotal
  //     //   });

  //     // push to database
  //     //   const item = {
  //     //     itemName: this.state.itemName,
  //     //     itemCost: this.state.itemCost,
  //     //     whosPaying: this.props.person1
  //     //   };
  //     //   billRef.child("allItems").push(item);
  //     //   person1Ref.child("items").push(item);
  //     //   person1Ref.child("totalAmount").set(person1CurrentTotal);
  //     // } else if (this.state.whosPaying2 === true) {
  //     //   // update state
  //     //   person2CurrentTotal += Number(this.state.itemCost);
  //     //   this.setState({
  //     //     person2Total: person2CurrentTotal
  //     //   });

  //     // push to database
  //     // const item = {
  //     //   itemName: this.state.itemName,
  //     //   itemCost: this.state.itemCost,
  //     //   whosPaying: this.props.person2
  //     // };
  //     // billRef.child("allItems").push(item);
  //     // person2Ref.child("items").push(item);
  //     // person2Ref.child("totalAmount").set(person2CurrentTotal);
  //   }

  //   // reset inputs & show items list
  //   // this.setState({
  //   //   itemName: "",
  //   //   itemCost: "",
  //   //   whosPaying1: false,
  //   //   whosPaying2: false,
  //   //   showItemsList: true
  //   // });
  // };

  render() {
    return (
      <section id="item-form-section">
        <h2 className="item-form-bill-title">{this.props.billName.billName}</h2>

        {this.state.showItemsList ? (
          <ItemsList allItems={this.state.allItems} />
        ) : null}

        <h3>Add Items to Your Bill</h3>

        {this.state.formValid === false ? (
          <p className="form-error">
            Please fill out all sections of the form properly!
          </p>
        ) : null}

        {this.state.checkboxValid === false ? (
          <p className="form-error">Please select who will pay for the item!</p>
        ) : null}

        <form id="item-form" className="item-form flex-container">
          <div className="item-inputs">
            <label htmlFor="itemName">Enter an item</label>
            <input
              type="text"
              id="itemName"
              value={this.state.itemName}
              onChange={this.inputChange}
            ></input>
          </div>

          <div className="item-inputs">
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

          <fieldset>
            <legend>Who is paying for this item?</legend>

            {this.props.people.map((person, i) => {
              const personId = `person${i}`;
              return (
                <label htmlFor={personId} key={personId} className="name-label">
                  <input
                    type="checkbox"
                    id={personId}
                    data-idx={i}
                    checked={person.checked}
                    onChange={this.inputChange}
                  ></input>
                  {person.name}
                </label>
              );
            })}

            {/* <label htmlFor="whosPaying1" className="name-label">
              <input
                type="checkbox"
                id="whosPaying1"
                name="whosPaying"
                checked={this.state.whosPaying1}
                onChange={this.inputChange}
              ></input>
              {this.props.person1}
            </label>

            <label htmlFor="whosPaying2" className="name-label">
              <input
                type="checkbox"
                id="whosPaying2"
                name="whosPaying"
                checked={this.state.whosPaying2}
                onChange={this.inputChange}
              ></input>
              {this.props.person2}
            </label> */}
          </fieldset>

          <button
            className="alternate-button add-item"
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
        </form>

        <button
          className="done-adding"
          onClick={() => this.props.displayBill(this.props.currentBillKey)}
        >
          I'm done adding items!
        </button>
      </section>
    );
  }
}

export default ItemForm;
