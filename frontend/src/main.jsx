import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { SocketContextProvider } from "./context/SocketContext.jsx";
import Home from "./pages/home/Home.jsx";
import Inquiry from "./pages/Inquiry/Inquiry.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
);
