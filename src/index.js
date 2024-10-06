import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component inside Provider for Redux
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Performance measurement setup
reportWebVitals(console.log); // Pass a logging function to measure performance
