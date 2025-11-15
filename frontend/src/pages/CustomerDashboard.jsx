import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function CustomerDashboard() {
  const { logout } = useContext(AuthContext);
const [loading, setLoading] = useState(false);

  const [income, setIncome] = useState("");
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [apps, setApps] = useState([]);

  const loadLoans = async () => {
    try {
      const res = await api.get("/loans/customer/me");
      setApps(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load loans");
    }
    
  };

  const applyLoan = async () => {
    if (!income || !amount || !tenure) {
      return toast.warn("Please fill all fields");
    }

    try {
      await api.post("/loans/apply", {
        income: Number(income),
        amountRequested: Number(amount),
        tenureMonths: Number(tenure),
      });

      toast.success("Loan application submitted!");
      setIncome("");
      setAmount("");
      setTenure("");
      loadLoans();
    } catch (err) {
      toast.error("Failed to apply loan");
    }
  };

  useEffect(() => {
    loadLoans();
  }, []);

  return (
    <div
      className="min-vh-100 d-flex justify-content-center"
      style={{
        background: "linear-gradient(135deg, #d9e6ff, #f0e6ff)",
        paddingTop: "40px",
      }}
    >
      <div style={{ width: "720px" }}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 px-2">
          {/* <h2 className="fw-bold" style={{ letterSpacing: "0.5px" }}>
            Customer Dashboard
          </h2> */}

          {/* <button
            className="btn btn-danger btn-sm shadow-sm"
            onClick={logout}
            style={{ borderRadius: "10px" }}
          >
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button> */}
        </div>

        {/* Apply Loan (Glass Card) */}
        <div
          className="card shadow-lg p-4 mb-4"
          style={{
            borderRadius: "20px",
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(255,255,255,0.4)",
          }}
        >
          <h4 className="fw-bold mb-3">
            <i className="bi bi-cash-coin me-2"></i> Apply for Loan
          </h4>

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Your Monthly Income (₹)"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            style={{ borderRadius: "12px" }}
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Loan Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ borderRadius: "12px" }}
          />

          <input
            type="number"
            className="form-control mb-3"
            placeholder="Tenure (Months)"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            style={{ borderRadius: "12px" }}
          />

          <button
            className="btn btn-primary w-100 fw-semibold shadow-sm"
            onClick={applyLoan}
            style={{ borderRadius: "12px", padding: "10px" }}
          >
            Apply Now
          </button>
        </div>

        {/* Loans List */}
        <h4 className="fw-bold mb-3 px-2">Your Loan Applications</h4>

        {apps.length === 0 ? (
          <p className="text-muted px-2">No loans found</p>
        ) : (
          apps.map((loan) => (
            <div
              className="card p-3 shadow-sm mb-3"
              key={loan._id}
              style={{
                borderRadius: "16px",
                background: "white",
                transition: "0.3s",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="m-0">
                    <b>Amount:</b> ₹{loan.amountRequested}
                  </p>
                  <p className="m-0">
                    <b>Status:</b>{" "}
                    <span
                      className={
                        loan.status === "APPROVED"
                          ? "text-success fw-bold"
                          : loan.status === "REJECTED"
                          ? "text-danger fw-bold"
                          : "text-warning fw-bold"
                      }
                    >
                      {loan.status}
                    </span>
                  </p>
                  <p className="m-0">
                    <b>Eligibility Score:</b>{" "}
                    {loan.eligibilityScore ?? "N/A"}
                  </p>
                </div>

                <Link
                  to={`/loan/${loan._id}`}
                  className="btn btn-outline-primary btn-sm"
                  style={{ borderRadius: "10px" }}
                >
                  View
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
