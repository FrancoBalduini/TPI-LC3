import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeProvider from "./components/context/Context.jsx";
import AuthenticationProvider from "./components/context/AuthenticationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthenticationProvider>
  </React.StrictMode>
);
