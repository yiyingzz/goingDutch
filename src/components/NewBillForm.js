import React, { useState } from "react";
import firebase from "../firebase.js";

const NewBillForm = props => {
  // getBillInfo & listAllBills functions

  // check it inputs were filled out properly
  const validateInputs = (event, ...inputs) => {
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
      createNewBill();
      // alert(`you submitted the form!`);
    }
  };

  // this submits the first form that gets bill name & people names
  const createNewBill = () => {
    // getting the date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate() + 1;
    const dateCreated = `${year}-${month}-${day}`;

    console.log(dateCreated);
    console.log(peopleState);
    // need to get rid of blank persons - validate it somehow

    // setting bill info
    setBillState({
      ...billState,
      dateCreated: dateCreated,
      people: peopleState
    });
    console.log(billState);
    // this doesn't seem to update quick enough (maybe page hasn't refreshed yet???) - because of preventdefault??? - don't need it here

    // database reference
    const dbRef = firebase.database().ref();

    // // push the new bill item & save the key
    const newBillItem = dbRef.push({
      ...billState,
      dateCreated: dateCreated,
      people: peopleState
    });

    const newBillKey = newBillItem.key;

    // send bill info up to App.js & takes user to item form
    props.getBillInfo(billState, dateCreated, peopleState, newBillKey);
    console.log(billState, dateCreated, peopleState, newBillKey);
  };

  // bill name
  const [billState, setBillState] = useState({ billName: "" });

  const handleBillNameChange = e => {
    setBillState({
      billName: e.target.value
    });
  };

  // people
  const blankPerson = { name: "", items: [], checked: false, totalAmount: 0 };
  const [peopleState, setPeopleState] = useState([
    { ...blankPerson },
    { ...blankPerson }
  ]);

  // add another input
  const addPersonInput = e => {
    e.preventDefault();
    setPeopleState([...peopleState, blankPerson]);
  };

  const handlePersonChange = e => {
    // first, clone the current peopleState
    const updatedPeople = [...peopleState];

    // const inputCheck = new RegExp(/\w/);
    // console.log(inputCheck.test(e.target.value));

    // if (inputCheck.test(e.target.value)) {
    updatedPeople[e.target.dataset.index].name = e.target.value;
    // ^^ putting this here prevents people from typing spaces entirely since it won't set the value in the input
    // but no way get rid of spaces at the end, might need .trim() or something else???

    // set new peopleState to the updated one with new info
    setPeopleState(updatedPeople);
    // }
  };

  return (
    <section id="bill-form-section">
      <h3>Create a New Bill</h3>

      {/* {this.state.formValid === false ? (
        <p className="form-error">Please fill out all sections of the form!</p>
      ) : null} */}

      <form>
        <label htmlFor="billName">What's this bill for?</label>
        <input
          type="text"
          id="billName"
          placeholder="Bill name"
          // value={billState.billName}
          onChange={handleBillNameChange}
        ></input>

        <legend>Who's splitting this bill?</legend>
        {peopleState.map((val, i) => {
          const personId = `person${i}`;
          return (
            <div key={personId}>
              <label htmlFor={personId} className="visuallyHidden">
                Name
              </label>
              <input
                type="text"
                className="name-input"
                id={personId}
                data-index={i}
                placeholder="Name"
                value={peopleState[i].name}
                onChange={handlePersonChange}
              ></input>
            </div>
          );
        })}

        <button
          onClick={e => {
            addPersonInput(e);
          }}
        >
          + Add another person
        </button>

        <button
          type="submit"
          onClick={e =>
            validateInputs(
              e
              // this.state.billName,
              // this.state.person1,
              // this.state.person2
            )
          }
        >
          Submit
        </button>
      </form>

      {/* <button className="alternate-button" onClick={this.props.listAllBills}>
        See Previous Bills
      </button> */}
    </section>
  );
};

export default NewBillForm;
