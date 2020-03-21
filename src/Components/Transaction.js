import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Transaction extends Component {
  deleteTransaction = () => {
    this.props.deleteTransaction(this.props.transaction._id);
  };

  render() {
    let transaction = this.props.transaction;
    return (
      <div key={transaction.vendor} className="Transaction">
        <div>amount: ${transaction.amount}</div>
        <div>vendor: {transaction.vendor}</div>
        <div>category: {transaction.category}</div>
        <button onClick={this.deleteTransaction}>Delete Transaction</button>
      </div>
    );
  }
}
export default Transaction;
