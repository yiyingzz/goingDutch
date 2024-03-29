import React, { useState } from "react";
import firebase from "../firebase";
import PersonInput from "./PersonInput";

const NewBillForm = (props) => {
  const { getBillInfo, listAllBills } = props;

  const [formState, setFormState] = useState({
    isValid: true
  });

  // check it inputs were filled out properly
  const validateInputs = (event, billInput, peopleInput) => {
    event.preventDefault();

    let formChecker = true;
    // loop through peopleInput to get names and put them on an array with billInput
    const inputs = [billInput];
    peopleInput.forEach((person) => {
      inputs.push(person.name);
    });

    inputs.forEach((input) => {
      if (
        !(formState.isValid && input.trim() !== "" && input.trim().length > 0)
      ) {
        formChecker = false;
      }
    });
    if (formChecker === false) {
      setFormState({ isValid: false });
    } else {
      createNewBill();
    }
  };

  // this submits the first form that gets bill name & people names
  const createNewBill = () => {
    // getting the date
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month.toString().length === 1) {
      month = `0${month}`;
    }
    let day = today.getDate() + 1;
    if (day.toString().length === 1) {
      day = `0${day}`;
    }
    const dateCreated = `${year}-${month}-${day}`;

    // setting bill info
    setBillState({
      ...billState,
      dateCreated: dateCreated,
      people: peopleState
    });

    // database reference
    const dbRef = firebase.database().ref();

    // // push the new bill item & save the key
    const newBillItem = dbRef.push({
      ...billState,
      dateCreated: dateCreated,
      people: peopleState,
      allItems: []
    });

    const newBillKey = newBillItem.key;

    // send bill info up to App.js & takes user to item form
    getBillInfo(billState.billName, dateCreated, peopleState, newBillKey);
  };

  // bill name
  const [billState, setBillState] = useState({ billName: "" });

  const handleBillNameChange = (e) => {
    setBillState({
      billName: e.target.value
    });
  };

  // people
  const blankPerson = { name: "", items: [], checked: false, totalAmount: 0 };
  const [peopleState, setPeopleState] = useState([
    { ...blankPerson, items: [] },
    { ...blankPerson, items: [] }
  ]);

  // add another input
  const addPersonInput = (event) => {
    event.preventDefault();
    setPeopleState([...peopleState, blankPerson]);
  };

  const handlePersonChange = (e) => {
    // update people in state
    const updatedPeople = [...peopleState];
    updatedPeople[e.target.dataset.index].name = e.target.value;
    setPeopleState(updatedPeople);

    // set form to valid
    setFormState({ isValid: true });
  };

  const removePersonInput = (e, i) => {
    e.preventDefault();
    const updatedPeople = [...peopleState];
    updatedPeople.splice(i, 1);
    setPeopleState(updatedPeople);
    setFormState({ isValid: true });
  };

  return (
    <section id="bill-form-section">
      <h3>Create a New Bill</h3>

      {!formState.isValid ? (
        <p className="form-error">Please fill out all sections of the form!</p>
      ) : null}

      <form>
        <label htmlFor="billName">What's this bill for?</label>
        <input
          type="text"
          id="billName"
          placeholder="Bill name"
          value={billState.billName}
          onChange={handleBillNameChange}
        ></input>

        <legend>Who's splitting this bill?</legend>
        {peopleState.map((person, i) => {
          if (i < 2) {
            return (
              <div key={`person${i}`}>
                <label htmlFor={`person${i}`} className="visuallyHidden">
                  Name
                </label>
                <input
                  type="text"
                  className="name-input"
                  id={`person${i}`}
                  data-index={i}
                  placeholder="Name"
                  value={person.name}
                  onChange={handlePersonChange}
                ></input>
              </div>
            );
          } else {
            return (
              <PersonInput
                key={`person${i}`}
                i={i}
                personName={person.name}
                handlePersonChange={handlePersonChange}
                removePersonInput={removePersonInput}
              />
            );
          }
        })}

        <button
          className="input-button input-button__add"
          onClick={(e) => {
            addPersonInput(e);
          }}
        >
          + Add another person
        </button>

        <button
          type="submit"
          onClick={(e) => validateInputs(e, billState.billName, peopleState)}
        >
          Submit
        </button>
      </form>

      <button className="alternate-button" onClick={listAllBills}>
        See Previous Bills
      </button>
    </section>
  );
};

export default NewBillForm;
