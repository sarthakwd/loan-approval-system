import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function Header() {
  const location = useLocation();
  const { role, logout } = useContext(AuthContext);

  let pageTitle = "";

  if (role === "CUSTOMER" && location.pathname.startsWith("/customer")) {
    pageTitle = "Customer Dashboard";
  } else if (role === "OFFICER" && location.pathname.startsWith("/officer")) {
    pageTitle = "Officer Dashboard";
  } else {
    pageTitle = "Loan Approval Portal";
  }

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
      className="navbar navbar-dark bg-primary shadow-sm"
    >
      <div className="container d-flex justify-content-between align-items-center">

        {/* Left Logo */}
        <div
          className="d-flex align-items-center"
          style={{ color: "white", fontSize: "18px", fontWeight: "600" }}
        >
          <i className="bi bi-bank2 me-2"></i> Loan System
        </div>

        {/* CENTER TITLE — dynamic */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            color: "white",
            fontSize: "20px",
            fontWeight: "700",
            letterSpacing: "0.5px",
          }}
        >
          {pageTitle}
        </div>

        {/* Right Logout */}
        <button
          onClick={logout}
          className="btn btn-danger btn-sm"
          style={{ fontWeight: "600" }}
        >
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </button>
      </div>
    </nav>
  );
}
