import React from "react";
// import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
