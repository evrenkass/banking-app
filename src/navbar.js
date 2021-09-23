import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient bg-opacity-75">
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
                <NavLink className="nav-link" to="/CreateAccount">
                  Create Account
                </NavLink>
              </li>
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
                <NavLink className="nav-link" to="/alldata">
                  All Data
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
