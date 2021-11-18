import React from "react";
import ReactDOM from "react-dom";
import DisplayComponent from "./ContactComponent";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <DisplayComponent />
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
