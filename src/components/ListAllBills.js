import React, { Component } from 'react';
import firebase from '../firebase.js';

// component to display all bills in database
class ListAllBills extends Component {
  constructor() {
    super();
    this.state = {
      billData: []
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref(); // database reference

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
      <section id="bill-cards-section">
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

        <button onClick={this.props.showFrontPage}>Split Another Bill</button>

      </section>
    )
  }
}

export default ListAllBills;