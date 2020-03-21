import React, { Component } from "react";
import logo from "./logo.svg";
import shortid from "shortid";
import "./App.css";
import Transactions from "./Components/Transactions";
import Operations from "./Components/Operations";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

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

  deleteTransaction = async(id) => {
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
        <div className="App">
          <Link className="link" to="/">
            Home
          </Link>
          <div></div>
          <Link className="link" to="/transactions">
            All Transaction
          </Link>
          <div></div>
          <Link className="link" to="/depositAndWithdraw">
            Deposit And Withdraw
          </Link>

          <Route
            exact
            path="/"
            render={() => (
              <div>
                <div>Welcome TO the Bank</div>
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
