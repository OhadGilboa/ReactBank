import React, { Component } from "react";
import logo from "./logo.svg";
import shortid from "shortid";
import "./App.css";
import Transactions from "./Components/Transactions";
import Operations from "./Components/Operations";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Header from "./Components/Header";
import Categories from "./Components/Categories";

class App extends Component {
  constructor() {
    super();
    this.state = {
      transactions: [],
      sum: 0
    };
  }

  async getData() {
    let data = await Axios.get("http://localhost:3001/transactions");
    console.log(`data`);
    return data;
  }

  async postData(amount, vendor, category) {
    let toAdd = {
      amount,
      vendor,
      category
    };
    await Axios.post("http://localhost:3001/transaction", toAdd);
  }

  async componentDidMount() {
    const response = await this.getData();
    this.setState({ transactions: response.data });
    console.log(this.state.sum);
    this.calcSum();
  }

  DepositTransaction = (amount, vendor, category) => {
    parseInt(amount);
    let temp = [...this.state.transactions];
    temp.push({ amount, vendor, category, _id: shortid.generate() });
    this.setState({
      transactions: temp
    });
    this.postData(amount, vendor, category);
  };

  withdrawTransaction = (amount, vendor, category) => {
    parseInt(amount);
    amount = -amount;
    let temp = [...this.state.transactions];
    temp.push({ amount, vendor, category, _id: shortid.generate() });
    this.setState({
      transactions: temp
    });
    this.postData(amount, vendor, category);
  };

  deleteTransaction = async id => {
    await Axios.delete(`http://localhost:3001/transaction/${id}`);
    const transactions = this.state.transactions.filter(t => t._id !== id);
    this.setState({ transactions });
  };

  calcSum = () => {
    let sum = 0;
    this.state.transactions.forEach(t => (sum += parseInt(t.amount)));
    return sum;
  };

  render() {
    return (
      <Router>
        <Header />
        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <h1>Welcome to G-BANK</h1>
                <Categories trans={this.state.transactions} />
                <h3></h3>
                <h4></h4>
                <h4>
                  GO ahead and make your transactions! <br />
                  For Corona Virus Issues <br />
                  contact us: +1 0745667788
                </h4>
              </div>
            )}
          />
          <Route
            exact
            path="/transactions"
            render={() => (
              <div>
                <div>Total Bank Balance: ${this.calcSum()} </div>
                <Transactions
                  transactions={this.state.transactions}
                  deleteTransaction={this.deleteTransaction}
                />{" "}
              </div>
            )}
          />
          <Route
            exact
            path="/depositAndWithdraw"
            render={() => (
              <div>
                <Operations
                  DepositTransaction={this.DepositTransaction}
                  withdrawTransaction={this.withdrawTransaction}
                />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
