import React, { Component } from "react";
import firebase from "../firebase.js";
import IndividualBillCard from "./IndividualBillCard";

class DisplayBill extends Component {
  constructor() {
    super();
    this.state = {
      billItem: {},
      people: []
    };
  }

  componentDidMount() {
    const billRef = firebase.database().ref(this.props.currentBillKey);

    billRef.on("value", snapshot => {
      this.setState({
        billItem: snapshot.val(),
        people: snapshot.val().people
      });
    });
  }

  render() {
    return (
      <section id="display-bill-section" className="display-bill">
        <h3>{this.state.billItem.billName}</h3>
        <p>Created on: {this.state.billItem.dateCreated}</p>
        <div className="card-display flex-container">
          {this.state.people.map((person, i) => {
            return (
              <IndividualBillCard
                key={i}
                name={person.name}
                totalAmount={person.totalAmount}
                items={person.items}
              />
            );
          })}
        </div>
        {/*---/.card-display */}
        <button onClick={this.props.showFrontPage}>Split Another Bill</button>
        <button onClick={this.props.listAllBills} className="alternate-button">
          View Other Bills
        </button>
      </section>
    );
  }
}

export default DisplayBill;
