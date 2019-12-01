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
    // needs to grab all bills from firebase

    const dbRef = firebase.database().ref();

    dbRef.on('value', (snapshot) => {      
      const data = snapshot.val();

      const billData = []
      for (let item in data) {
        billData.push({
          billKey: item,
          billName: data[item].billName,
          people: `${data[item].people[0].name}, ${data[item].people[1].name}`
        });
        console.log(item);
        console.log(data[item]);
        console.log(data[item].billName);
        console.log(data[item].people[0].name);
        console.log(data[item].people[1].name);
      }


      this.setState({
        billData: billData
      })
    })
  }

  render() {

    console.log(this.state.billData);

    return(
      <section id="list-all-bills" className="list-all-bills">
        <h2>LISTING ALL MY BILLS</h2>

        <ul>
          {
            this.state.billData.map((item, i) => {
              return (
                <li key={i} onClick={item.billKey}>
                  <p>{item.billName}</p>
                  <p>Who's on this bill? {item.people}</p>
                </li>
              )
            })
          }
        </ul>

        <button onClick={() => this.props.showFrontPage()}>Home</button>

      </section>
    )
  }
}

export default ListAllBills;