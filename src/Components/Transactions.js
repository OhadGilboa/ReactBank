import React, { Component } from "react";
import Transaction from "./Transaction";

class Transactions extends Component {
  
    deleteTransaction = (id) => {
        this.props.deleteTransaction(id)
    }
  
    render() {
    return (
      <div className="Transactions">
        {this.props.transactions.map(t => (
          <Transaction transaction={t} deleteTransaction={this.deleteTransaction} />
        ))}
      </div>
    );
  }
}
export default Transactions;
