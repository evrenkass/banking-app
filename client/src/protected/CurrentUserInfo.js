import React from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import { useAuth } from "../hooks";

export const CurrentUserInfo = () => {
  const { profileData, authenticate } = useAuth();
  const auth = getAuth();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      authenticate(null);
    } catch (e) {}
  };

  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {profileData.name} (#{profileData.accountNumber})
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdown"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              Edit
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleSignout}>
              Sign out
            </button>
          </li>
        </ul>
      </li>
    </ul>
  );
};
