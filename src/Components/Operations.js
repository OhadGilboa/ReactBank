import React, { Component } from "react";

class Operations extends Component {
  constructor() {
    super();
    this.state = {
      amount: "",
      vendor: "",
      category: ""
    };
  }

  DepositTransaction = () => {
    this.props.DepositTransaction(
      this.state.amount,
      this.state.vendor,
      this.state.category
    );
  };

  withdrawTransaction = () => {
    this.props.withdrawTransaction(
      this.state.amount,
      this.state.vendor,
      this.state.category
    );
  };


  changeValue = async event => {
    await this.setState({
      [event.target.id === "amount"
        ? "amount"
        : event.target.id === "vendor"
        ? "vendor"
        : "category"]: event.target.value
    });
    console.log(this.state);
  };

  render() {
    return (
      <div className="operations">
        <br />
        <input
          id="amount"
          value={this.state.amount}
          onChange={this.changeValue}
          placeholder="Amount"
        ></input>
        <input
          id="vendor"
          value={this.state.vendor}
          onChange={this.changeValue}
          placeholder="Vendor"
        ></input>
        <input
          id="category"
          value={this.state.category}
          onChange={this.changeValue}
          placeholder="Category"
        ></input>
        <button id="deposit" onClick={this.DepositTransaction}>
          Deposit
        </button>
        <button id="withdraw" onClick={this.withdrawTransaction}>
          Withdraw
        </button>
      </div>
    );
  }
}
export default Operations;
