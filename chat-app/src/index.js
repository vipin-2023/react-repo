import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { store } from "./app/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <AuthContextProvider>
    <React.StrictMode>
    
        <App />
     
    </React.StrictMode>
  </AuthContextProvider>
  </Provider>
);
