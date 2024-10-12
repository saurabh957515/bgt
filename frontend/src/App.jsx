import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Inquiry from './Pages/Inquiry/Inquiry.jsx'
import Admission from './Pages/Admission/Admission.jsx'
import Messages from './Pages/Messages/Messages.jsx'
import Fees from './Pages/Fees/Fees.jsx'
import BankDetails from './Pages/BankDetails/BankDetails.jsx'
import CreateInquiry from "./Pages/Inquiry/Partials/CreateInquiry.jsx";
import TotalAdmission from "./Pages/Admission/TotalAdmission.jsx";
import CreateBank from "./Pages/BankDetails/Partials/CreateBank.jsx";
import Registration from "./Pages/Registration.jsx";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/create-bank" element={<CreateBank />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/total-admission" element={<TotalAdmission />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/create-inquiry" element={<CreateInquiry />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/bankdetails" element={<BankDetails />} />
        <Route path="/settings" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
