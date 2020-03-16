import React, { Component } from "react";
import logo from "./logo.svg";
import shortid from 'shortid';
import "./App.css";
import Transactions from "./Components/Transactions";
import Operations from "./Components/Operations";

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [
        { id: 1, amount: 3200, vendor: "Elevation", category: "Salary" },
        { id: 2, amount: -7, vendor: "Runescape", category: "Entertainment" },
        { id: 3, amount: -20, vendor: "Subway", category: "Food" },
        { id: 4, amount: -98, vendor: "La Baguetterie", category: "Food" }
      ],
      sum: 0
    };
  }

  DepositTransaction = (amount, vendor, category) => {
    parseInt(amount);
    let temp = [...this.state.transactions];
    temp.push({ amount, vendor, category, id: shortid.generate(), });
    this.setState({
      transactions: temp
    });
  };

  withdrawTransaction = (amount, vendor, category) => {
    parseInt(amount);
    amount = -amount;
    let temp = [...this.state.transactions];
    temp.push({ amount, vendor, category, id: shortid.generate(), });
    this.setState({
      transactions: temp
    });
  };

  deleteTransaction = id => {
    let trans = [...this.state.transactions]
    trans.splice(trans.findIndex(t => t.id === id),1)
    this.setState({
      transactions: trans
    })
  }

  calcSum = () => {
    let sum = 0;
    this.state.transactions.forEach(t => (sum += parseInt(t.amount)));
    return sum;
  };

  componentDidMount = () => {
    console.log(this.state.sum);
    this.calcSum();
  };

  render() {
    return (
      <div className="App">
        <div>Total Bank Balance: {this.calcSum()} </div>
        <Transactions
          transactions={this.state.transactions}
          deleteTransaction={this.deleteTransaction}
        />
        <Operations
          DepositTransaction={this.DepositTransaction}
          withdrawTransaction={this.withdrawTransaction}
        />
      </div>
    );
  }
}

export default App;
