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

    }
  }

  componentDidMount() {
    // needs to grab all bills from firebase
    // needs to grab key for each bill
    // key needs to be passed up to App.js to display the correct Bill
    // only list billName & Created on date & People's names
  }


  render() {
    return(
      <section id="list-all-bills" className="list-all-bills">
        
      </section>
    )
  }
}

export default ListAllBills;