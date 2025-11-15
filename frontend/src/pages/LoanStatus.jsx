import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function LoanStatus() {
  const { id } = useParams();

  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    try {
      const res = await api.get(`/loans/${id}/status`);

      const details = await api.get(`/loans/customer/me`);
      const specificLoan = details.data.find((l) => l._id === id);

      setLoan({
        status: res.data.status || "N/A",
        score: res.data.eligibilityScore ?? "N/A",
        amount: specificLoan?.amountRequested,
        tenure: specificLoan?.tenureMonths,
        createdAt: specificLoan?.createdAt,
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load loan status");
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!loan) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <p className="text-danger">Loan not found.</p>
      </div>
    );
  }

  const getStatusColor = () => {
    if (loan.status === "APPROVED") return "text-success";
    if (loan.status === "REJECTED") return "text-danger";
    return "text-warning";
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        minHeight: "100vh",
        paddingTop: "120px",
        background: "linear-gradient(135deg, #d9e6ff, #f0e6ff)",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: "420px",
          borderRadius: "20px",
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.6)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        <h3 className="fw-bold text-center mb-3">
          <i className="bi bi-info-circle me-2"></i>Loan Status
        </h3>

        {/* Status */}
        <p className="text-center fs-5">
          <b>Status:</b>{" "}
          <span className={getStatusColor()}>{loan.status}</span>
        </p>

        {/* Eligibility Score */}
        <div className="text-center my-3">
          <div
            style={{
              display: "inline-block",
              padding: "15px 25px",
              borderRadius: "50px",
              background: "#ffffffcc",
              boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
            }}
          >
            <h5 className="m-0">
              <b>Eligibility Score:</b> {loan.score}
            </h5>
          </div>
        </div>

        {/* Loan Details */}
        <div className="mt-3">
          <p className="m-0">
            <b>Loan Amount:</b> ₹{loan.amount}
          </p>
          <p className="m-0">
            <b>Tenure:</b> {loan.tenure} months
          </p>
          <p className="m-0">
            <b>Date Applied:</b>{" "}
            {loan.createdAt
              ? new Date(loan.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        {/* Back Button */}
        <Link
          to="/customer"
          className="btn btn-primary w-100 mt-4 fw-semibold"
          style={{ borderRadius: "12px" }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
