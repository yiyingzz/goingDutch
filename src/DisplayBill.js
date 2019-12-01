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

    billRef.on('value', (snapshot) => {      
      const items1 = snapshot.val().people[0].items;
      const items1Array = [];

      // because in firebase, the items are on an object, not an array, need to make them into an array to use on our page
      for (let item in items1) {
        items1Array.push(items1[item]);
      }

      // do the same for the 2nd person
      const items2 = snapshot.val().people[1].items;
      const items2Array = [];

      for (let item in items2) {
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
    return (

      <div>      
        <h2>{this.state.billItem.billName}</h2>  


        <div className="card-display">

          <div className="invoice-card">
            <h3>{this.state.person1.name}</h3>  

            <ul>
              {
                this.state.person1Items.map((item) => {
                  return(
                    <li>
                      <p className="invoice-item">{item.itemName}</p> 
                      <p className="invoice-amount">${item.itemCost}</p>
                    </li>
                  )
                })
              }
              <li>
                <p className="invoice-item invoice-total">Total Amount Owed:</p> 
                <p className="invoice-amount invoice-total">${this.state.person1.totalAmount}</p>
              </li>
            </ul>

          </div>


          <div className="invoice-card">
            <h3>{this.state.person2.name}</h3>  

            <ul>
              {
                this.state.person2Items.map((item) => {
                  return(
                    <li>
                      <p className="invoice-item">{item.itemName}</p> 
                      <p className="invoice-amount">${item.itemCost}</p>
                    </li>
                  )
                })
              }
              <li>
                <p className="invoice-item invoice-total">Total Amount Owed:</p> 
                <p className="invoice-amount invoice-total">${this.state.person1.totalAmount}</p>
              </li>
            </ul>

          </div>

        </div>

        <button onClick={(event) => this.props.showFrontPage(event)}>Split Another Bill?</button>
        
      </div>

    )
  }
}

export default DisplayBill;