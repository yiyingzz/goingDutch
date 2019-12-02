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
          people: `${data[item].people[0].name}, ${data[item].people[1].name}`
        });
      }

      this.setState({
        billData: billData
      })
    })
  }

  render() {
    return(
      <section id="list-all-bills" className="list-all-bills">
        <h2>LISTING ALL MY BILLS</h2>

        <ul className="bills-list flex-container">
          {
            this.state.billData.map((item, i) => {
              return (
                <li key={i} onClick={() => this.props.displayBill(item.billKey)}>
                  <div className="list-left">

                  </div>
                  <div className="list-right">
                    
                  </div>
                  <p className="bill-name">{item.billName}</p>
                  <p className="date-created">{item.billDate}</p>
                  <p className="whos-splitting">Who's splitting this bill?</p>
                  <p className="people-involved">{item.people}</p>
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