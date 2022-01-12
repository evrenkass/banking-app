import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";

import "./core/firebase";
import "./styles.css";

import { App } from "./App";

const content = (
  <HashRouter>
    <App />
  </HashRouter>
);

ReactDOM.render(content, document.getElementById("root"));
