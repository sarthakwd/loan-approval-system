// import { useEffect, useState, useContext } from "react";
// import api from "../api/axios";
// import { AuthContext } from "../context/AuthContext";
// import { toast } from "react-toastify";

// export default function OfficerDashboard() {
//   const [pending, setPending] = useState([]);
//   const { logout } = useContext(AuthContext);

//   const loadPending = async () => {
//     try {
//       const res = await api.get("/officer/loans/pending");
//       setPending(res.data);
//     } catch (err) {
//       toast.error("Failed to load pending loans");
//     }
//   };

//   const review = async (loanId, decision) => {
//     try {
//       await api.post(`/officer/loans/${loanId}/review`, { decision });
//       toast.success(`Loan ${decision.toLowerCase()} successfully`);
//       loadPending();
//     } catch (err) {
//       toast.error("Failed to review loan");
//     }
//   };

//   useEffect(() => {
//     loadPending();
//   }, []);

//   return (
//     <div
//       className="container"
//       style={{
//         maxWidth: "700px",
//         marginTop: "120px",      // ⭐ Prevents overlap with fixed blue header
//         marginBottom: "40px",
//       }}
//     >
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="mb-0 fw-bold">Officer Dashboard</h2>
//       </div>

//       <h4 className="mb-3 text-secondary">Pending Loan Applications</h4>

//       {pending.length === 0 && <p>No pending loans</p>}

//       {pending.map((loan) => (
//         <div className="card p-3 mb-3 shadow-sm" key={loan._id}>
//           <p>
//             <b>Customer Name:</b>{" "}
//             {loan.customerId?.userId?.name || "Unknown"}
//           </p>

//           <p>
//             <b>Amount:</b> ₹{loan.amountRequested}
//           </p>

//           <p>
//             <b>Customer Income:</b> ₹{loan.customerId?.income}
//           </p>

//           <p>
//             <b>Credit Score:</b> {loan.customerId?.creditScore}
//           </p>

//           <div className="mt-2">
//             <button
//               className="btn btn-success btn-sm me-2"
//               onClick={() => review(loan._id, "APPROVED")}
//             >
//               Approve
//             </button>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => review(loan._id, "REJECTED")}
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function OfficerDashboard() {
  const [pending, setPending] = useState([]);
  const [officerName, setOfficerName] = useState("");
  const { userId } = useContext(AuthContext);

  // Fetch Officer Name
  const loadOfficer = async () => {
    try {
      const res = await api.get(`/auth/user/${userId}`);
      setOfficerName(res.data.name || "Loan Officer");
    } catch {
      setOfficerName("Loan Officer");
    }
  };

  const loadPending = async () => {
    try {
      const res = await api.get("/officer/loans/pending");
      setPending(res.data);
    } catch {
      toast.error("Failed to load pending loans");
    }
  };

  const review = async (loanId, decision) => {
    try {
      await api.post(`/officer/loans/${loanId}/review`, { decision });
      toast.success(`Loan ${decision.toLowerCase()} successfully`);
      loadPending();
    } catch {
      toast.error("Failed to review loan");
    }
  };

  useEffect(() => {
    loadOfficer();
    loadPending();
  }, []);

  return (
    <div
      className="container"
      style={{
        maxWidth: "750px",
        marginTop: "120px", 
        marginBottom: "40px",
      }}
    >

      {/* ---- Officer Header ---- */}
      <div className="mb-4 text-center">
        <h2 className="fw-bold m-0">Welcome, {officerName}</h2>
        <p className="text-muted m-0">Review pending loan applications</p>
      </div>

      {/* ---- Section Title ---- */}
      {pending.length > 0 && (
        <h4 className="mb-3 text-secondary fw-semibold text-center">
          Pending Loan Applications
        </h4>
      )}

      {/* ---- No Loans ---- */}
      {pending.length === 0 && (
        <p className="text-center text-muted mt-3">No pending loans</p>
      )}

      {/* ---- Loan Cards ---- */}
      {pending.map((loan) => (
        <div
          className="card p-3 mb-3 shadow-sm"
          key={loan._id}
          style={{ borderRadius: "14px" }}
        >
          <h5 className="fw-bold mb-2">
            <i className="bi bi-person-circle me-2"></i>
            {loan.customerId?.userId?.name || "Unknown"}
          </h5>

          <div className="row">
            <div className="col-6 mb-2">
              <b>Loan Amount:</b>
              <div>₹ {loan.amountRequested.toLocaleString()}</div>
            </div>

            <div className="col-6 mb-2">
              <b>Income:</b>
              <div>₹ {loan.customerId?.income?.toLocaleString()}</div>
            </div>

            <div className="col-6 mb-2">
              <b>Credit Score:</b>
              <div className="badge bg-info text-dark">{loan.customerId?.creditScore}</div>
            </div>

            <div className="col-6 mb-2">
              <b>Eligibility Score:</b>
              <div className="badge bg-warning text-dark">
                {loan.eligibilityScore ?? "N/A"}
              </div>
            </div>
          </div>

          <div className="mt-3 d-flex">
            <button
              className="btn btn-success btn-sm me-2 px-3"
              onClick={() => review(loan._id, "APPROVED")}
            >
              <i className="bi bi-check-circle me-1"></i> Approve
            </button>

            <button
              className="btn btn-danger btn-sm px-3"
              onClick={() => review(loan._id, "REJECTED")}
            >
              <i className="bi bi-x-circle me-1"></i> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
