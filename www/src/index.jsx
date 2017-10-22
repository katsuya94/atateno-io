import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import "./index.scss";
import "../assets/kubernetes.svg";
import "../assets/kafka.svg";
import "../assets/react.svg";
import "../assets/rails.svg";
import "../assets/racket.svg";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
