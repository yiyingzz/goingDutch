import React, { Component } from 'react';
import firebase from '../firebase.js';

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
      // grab items for 1st person & put on an array to use on the page
      const items1 = snapshot.val().people[0].items;
      const items1Array = [];

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
        person1Total: snapshot.val().people[0].totalAmount.toFixed(2),
        person2Total: snapshot.val().people[1].totalAmount.toFixed(2),
        person1Items: items1Array,
        person2Items: items2Array,
      })
    })
  }

  render() {
    return (

      <section id="display-bill-section" className="display-bill">      
        <h3>{this.state.billItem.billName}</h3>  
        <p>Created on: {this.state.billItem.dateCreated}</p>


        <div className="card-display flex-container">

          <div className="invoice-card card">
            <h4 className="card-heading">{this.state.person1.name}</h4>  
            <ul className="flex-container">
              {
                this.state.person1Items.map((item, i) => {
                  return(
                    <li key={i}>
                      <p className="card-left invoice-item">{item.itemName}</p> 
                      <p className="card-right invoice-amount">${item.itemCost}</p>
                    </li>
                  )
                })
              }
            </ul>
            <div className="invoice-total card-heading">
              <p className="card-left invoice-item">Total Amount to Pay:</p> 
              <p className="card-right invoice-amount">${this.state.person1Total}</p>
            </div>
          </div>

          <div className="invoice-card card">
            <h4 className="card-heading">{this.state.person2.name}</h4>  
            <ul className="flex-container">
              {
                this.state.person2Items.map((item, i) => {
                  return(
                    <li key={i}>
                      <p className="card-left invoice-item">{item.itemName}</p> 
                      <p className="card-right invoice-amount">${item.itemCost}</p>
                    </li>
                  )
                })
              }
            </ul>
            <div className="invoice-total card-heading">
              <p className="card-left invoice-item">Total Amount to Pay:</p> 
              <p className="card-right invoice-amount">${this.state.person2Total}</p>
            </div>
          </div>

        </div> {/*---/.card-display */}

        <button onClick={this.props.showFrontPage}>Split Another Bill</button>
        <button onClick={this.props.listAllBills} className="alternate-button">View Other Bills</button>
        
      </section>

    )
  }
}

export default DisplayBill;