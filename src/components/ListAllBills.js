import React, { Component } from 'react';
import firebase from '../firebase.js';

// this one is for displaying every bill
// probably should just list bills by name & people
  // then clicking on them takes them to DisplayBills page
  // do this by hooking up bill keys in props

class ListAllBills extends Component {
  constructor() {
    super();
    this.state = {
      billData: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {   
      const data = snapshot.val();

      const billData = []
      for (let item in data) {
        billData.push({
          billKey: item,
          billDate: data[item].dateCreated,
          billName: data[item].billName,
          people: `${data[item].people[0].name} & ${data[item].people[1].name}`
        });
      }

      this.setState({
        billData: billData
      })
    })
  }

  render() {
    return(
      <section id="bills-cards">
        <h3>All Bills</h3>

        <ul className="flex-container">
          {
            this.state.billData.map((item, i) => {
              return (
                <li key={i} onClick={() => this.props.displayBill(item.billKey)} className="bill-card card">
                  <div className="card-heading flex-container">
                    <p className="card-left">{item.billName}</p>
                    <p className="card-right card-small">{item.billDate}</p>
                  </div>
                  <div className="bill-card-bottom flex-container">
                    <p className="card-left card-small">Who's splitting this bill?</p>
                    <p className="card-right card-small">{item.people}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>

        <button onClick={this.props.showFrontPage}>Home</button>

      </section>
    )
  }
}

export default ListAllBills;