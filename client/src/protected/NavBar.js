import { NavLink } from "react-router-dom";
import { CurrentUserInfo } from "./CurrentUserInfo";

export function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Dreambank
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/deposit">
                  Deposit
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/withdraw">
                  Withdraw
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/transfer">
                  Transfer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/transactions">
                  Transactions
                </NavLink>
              </li>
            </ul>
          </div>
          <CurrentUserInfo />
        </div>
      </nav>
    </>
  );
}
