import React, { Component } from 'react';
import firebase from './firebase.js';

class DisplayBill extends Component {
  constructor() {
    super()
    this.state = {
      billItem: {},
      person1: {},
      person2: {},
      person1Items: [],
      person2Items: []
    }
  }

  componentDidMount() {
    const billRef = firebase.database().ref(this.props.currentBillKey);
    const person1Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [0]);
    const person2Ref = firebase.database().ref(this.props.currentBillKey + '/people/' + [1]);

    const person1ItemsRef = firebase.database().ref(this.props.currentBillKey + '/people/' + [0] + '/items/');
    const person2ItemsRef = firebase.database().ref(this.props.currentBillKey + '/people/' + [1] + '/items/');
    

    // we need to save this to state as an array

    billRef.on('value', (snapshot) => {
      console.log("logging  items snapshot value");
      
      const items1 = snapshot.val().people[0].items;
      const items1Array = [];

      // because in firebase, the items are on an object, not an array, need to make them into an array to use on our page
      for (let item in items1) {
        console.log("loggin item in items loop");
        console.log(items1[item]);
        items1Array.push(items1[item]);
      }

      const items2 = snapshot.val().people[1].items;
      const items2Array = [];

      // because in firebase, the items are on an object, not an array, need to make them into an array to use on our page
      for (let item in items2) {
        console.log("loggin item in items loop");
        console.log(items2[item]);
        items2Array.push(items2[item]);
      }

      this.setState({
        billItem: snapshot.val(),
        person1: snapshot.val().people[0],
        person2: snapshot.val().people[1],
        person1Items: items1Array,
        person2Items: items2Array,
      })
    })
  }

  render() {
    console.log("loggin this.state.billItem");
    console.log(this.state.billItem);
    console.log(this.state.billItem.people);

    console.log("loggin this.state.items1");
    console.log(this.state.items1);


    return (


      <div>

      {/* 
        // DISPLAY THE MONEYS
        
        // grab updated info from database 
        // print a list for each person with the items & cost, with a Total Amount to Pay at the bottom 
        // state needs array for each person's item list

      */}

      
        <h2>{this.state.billItem.billName}</h2>  

        <h3>{this.state.person1.name}</h3>  

        {
          this.state.person1Items.map((item) => {
            return(
              <div>
                <p>{item.itemName}, {item.itemCost}</p>
              </div>
            )
          })
        }
        {/* <p>Total Amount Owed: <span>{this.state.person1.totalAmount}</span></p> */}
     
        <h3>{this.state.person2.name}</h3> 

        {
          this.state.person2Items.map((item) => {
            return(
              <div>
                <p>{item.itemName}, {item.itemCost}</p>
              </div>
            )
          })
        }
        
        

        {/* <p>Total Amount Owed: <span>{this.state.person2.totalAmount}</span></p> */}
        
      </div>

    )
  }
}

export default DisplayBill;