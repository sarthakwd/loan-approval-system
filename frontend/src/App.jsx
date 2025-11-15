// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import LoanStatus from "./pages/LoanStatus";
import CustomerProfile from "./pages/CustomerProfile";

import AppNavbar from "./components/AppNavbar";   // ✅ NEW
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

console.log("🔥 App rendered");

function App() {
  return (
    <>
      {/* Toast System */}
      <ToastContainer position="top-right" autoClose={1500} />

      {/* Navbar visible on all pages */}
      <AppNavbar />

      {/* Page Routes */}
      <div style={{ paddingTop: "20px" }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/officer" element={<OfficerDashboard />} />
          <Route path="/loan/:id" element={<LoanStatus />} />
          <Route path="/profile" element={<CustomerProfile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
