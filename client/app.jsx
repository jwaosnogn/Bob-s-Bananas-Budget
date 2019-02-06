import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      startDateInput: undefined,
      startDateOutput: undefined,
      numberOfDaysInput: 0,
      numberOfDaysOutput: undefined,
      totalCostOutput: undefined,
    };
    this.changeInput = this.changeInput.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
  }

  changeInput(event) {
    this.setState({ [event.target.className]: event.target.value });
  }

  calculatePrice() {
    const { startDateInput, numberOfDaysInput } = this.state;
    // Send request only if both inputs have been filled out
    if (startDateInput && numberOfDaysInput) {
      // Converting stored date into date object (for some reason, when you do so it's set one day previous)
      const date = new Date(startDateInput);
      date.setDate(date.getDate() + 1);
      const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      const reqObj = {
        startDate: dateString,
        numberOfDays: Number(numberOfDaysInput),
      };
      fetch('/calculatePrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      })
        .then(response => response.json())
        .then(response => this.setState({
          startDateOutput: dateString,
          numberOfDaysOutput: numberOfDaysInput,
          totalCostOutput: response.totalCost,
        }));
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Bob's Banana Budget</h1>
        <h2>Input</h2>
        <h3>Start Date</h3>
        <input type="date" className="startDateInput" onChange={this.changeInput} />
        <h3>Number of Days</h3>
        <input type="number" className="numberOfDaysInput" onChange={this.changeInput} min={1} />
        <button type="button" onClick={this.calculatePrice}>Calculate!</button>
        <h2>Output</h2>
        <h3>Start Date: {this.state.startDateOutput}</h3>
        <h3>Number of Days: {this.state.numberOfDaysOutput}</h3>
        <h3>Total Cost: {this.state.totalCostOutput}</h3>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById('app'));
