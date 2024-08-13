import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Inquiry from "./pages/Inquiry/Inquiry";
import Admissions from "./pages/Admissions/Admissions";
import FeeDetails from "./pages/FeeDetails/FeeDetails";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="bg-white">
      <Routes>
        <Route
          path="/"
          // element={authUser ? <Home /> : <Navigate to={"/home"} />}
          element={<Home/>}
        />
        <Route
          path="/inquiry"
          // element={authUser ? <Inquiry /> : <Navigate to={"/inquiry"} />}
          element={<Inquiry/>}
        />
        <Route
          path="/admissions"
          // element={authUser ? <Admissions /> : <Navigate to={"/inquiry"} />}
          element={<Admissions/>}
        />
        <Route
          path="/login"
          // element={authUser ? <Navigate to="/" /> : <Login />}
          element={<Login/>}
        />
        <Route
          path="/signup"
          // element={authUser ? <Navigate to="/" /> : <SignUp />}
          element={<SignUp/>}
        />
         <Route
          path="/feedetails"
          // element={authUser ? <Navigate to="/" /> : <SignUp />}
          element={<FeeDetails/>}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
