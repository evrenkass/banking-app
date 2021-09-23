import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";

import { UserContext } from "./context";
import { NavBar } from "./navbar";
import { Home } from "./home";
import { CreateAccount } from "./createaccount";
import { Deposit } from "./deposit";
import { Withdraw } from "./withdraw";
import { AllData } from "./alldata";

import "./styles.css";

export function Spa() {
  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "evren",
              email: "evren@example.com",
              password: "12345678",
              balance: 0,
            },
          ],
        }}
      >
        <div className="container" style={{ padding: "20px" }}>
          <Route path="/" exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
          <Route path="/alldata/" component={AllData} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
