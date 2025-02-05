import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider
import store from "../src/redux/store";
import App from "./App";
import "./index.css";

// Correctly access the environment variable
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* Wrap App with GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
