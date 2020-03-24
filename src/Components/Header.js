import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="mainLinks">
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
      </div>
    );
  }
}
export default Header;
