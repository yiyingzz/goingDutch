import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {

  // need to put data into this.state
  constructor() {
    super();
    this.state = {

      // events is an array representing the database
      bills: [],

      // need multiple input values, one for each input
      billInput: '',

      personInput1: '',
      personInput2: '',


      itemValue1: '',
      itemValue2: ''

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
        console.log(newBills); // we can see the new array
      }

      this.setState({
        bills: newBills
      })

      console.log("logging this.state.bills from componentDidMount", this.state.bills);
    })

  }


  
  inputChange = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue);
    // we need to store the inputValue so we can attach it to the input and addNewBill event handler

    this.setState({
      [event.target.id]: inputValue
    })

    console.log(this.state[event.target.id]);
  }

  // this submits the first form that gets bill name & people names
  addNewBill = (event) => {
    event.preventDefault();
    
    console.log(this.state.billInput, this.state.personInput1, this.state.personInput2);

    //assign input value to new top level object in dbRef
    const dbRef = firebase.database().ref();

      // HOW CAN I GET THE KEY OF THIS OBJECT?
        // DO I NEED TO SET A VARIABLE FOR THE KEY FOR THE CURRENT BILL?
    dbRef.push({
      eventName: this.state.billInput,
      people: [
        {
          name: this.state.personInput1,
          // items: [], // PUSHING AN EMPTY ARRAY DOESN'T WORK
          totalAmount: '' // maybe not necessary right here
        },
        {
          name: this.state.personInput2,
          // items: [], // PUSHING AN EMPTY ARRAY DOESN'T WORK
          totalAmount: ''
        }
      ]
    });

    // if statement to add third person

  }


  // this needs to add individual items to each person
addItemToBill = () => {
  const dbRef = firebase.database().ref();
  // need key for the current bill - maybe set a variable for this

  // should it start calculating total here? 
    // eg. update totalAmount as each item is added
      // I think this makes the most sense if we were to keep a running tab
}


finishedAddingItems = () => {
  // basically just needs to take us to a page displaying what each person is paying for




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

        <form class="bill-name-form">

          <label htmlFor="billInput">What's the bill for?/Enter a name for this bill (could be event name)</label>
          <input type="text" id="billInput" value={this.state.billInput} onChange={this.inputChange}></input>

          <label htmlFor="personInput1">Who's splitting this bill?</label>
          <input type="text" id="personInput1" value={this.state.personInput1} onChange={this.inputChange}></input>

          <label htmlFor="personInput2">Who else is splitting this bill?</label>
          <input type="text" id="personInput2" value={this.state.personInput2}onChange={this.inputChange}></input>

          <button type="submit" onClick={this.addNewBill}>Submit</button>

        </form>



        {/* 
          // ADDING ITEMS 
          // page shows inputs for adding items & cost for the event 
          // also shows people's names (maybe button-like element that you can click and "tag" people to the item
          // (this would determine if the item cost needs to be split between x num of people or not)
          // send info to database
            // as items & costs are added, they show up on the page in a list
            // [submit/done] button - or some sort of indicator from user that they are done adding items
        */}


      <h2>{this.state.billInput}</h2>
        <form class="item-input-form">

          <div class="individual-item">
            
            <label htmlFor="itemInput1">Enter an item</label>
            <input type="text" id="itemInput1" value={this.itemValue1} onChange={this.inputChange}></input>
            
            <label htmlFor="costInput1">Cost of item</label>
            <input type="number" min="0" id="costInput1" placeholder="0.00"></input>

            <legend>Who is paying for this item?</legend>

            <input type="checkbox" id={this.state.personInput1} name="person"></input>
            <label htmlFor={this.state.personInput1}>{this.state.personInput1}</label>

            <input type="checkbox" id={this.state.personInput2}></input>
            <label htmlFor={this.state.personInput2}>{this.state.personInput2}</label>

            <button onClick={this.addItemToBill}>Add Item</button>

            
          </div>

          <div class="individual-item">
            <label htmlFor="itemInput2">Enter an item</label>
            <input type="text" id="itemInput2" value={this.itemValue1} onChange={this.inputChange}></input>
            
            <label htmlFor="costInput2">Cost of item</label>
            <input type="number" min="0" id="costInput2" placeholder="0.00"></input>


            <legend>Who is paying for this item?</legend>

            <input type="checkbox" id={this.state.personInput1} name="person"></input>
            <label htmlFor={this.state.personInput1}>{this.state.personInput1}</label>

            <input type="checkbox" id={this.state.personInput2}></input>
            <label htmlFor={this.state.personInput2}>{this.state.personInput2}</label>

            <button onClick={this.addItemToBill}>Add Item</button>

          </div>

          {/* THIS BUTTON DOESN'T NEED TO SUBMIT THE FORM THOUGH !!!!!!! */}
          <button type="submit" onClick={this.finishedAddingItems}>I'm done adding items</button>
        </form>






        {/* 
        // DISPLAY THE MONEYS
        // calculation time!
        // based on how items were split, calculate what each person needs to pay
          // each person would have an array of what they need to pay for, so app just needs to add it all up and get a total amount
          // send to database - update each person's total amount
        // grab updated info from database
        // print a list for each person with the items & cost, with a Total Amount to Pay at the bottom 
        */}

      </div>
    );
  }
}

export default App;