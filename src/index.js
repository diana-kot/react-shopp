import React from "react";
// import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import "macro-css";

import { createRoot } from "react-dom/client";

import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
// ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
