import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role
      });

      toast.success("Registered successfully!");
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
  <>
    {/* SIMPLE HEADER */}
   <div
      className="bg-primary text-white text-center p-3"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000
      }}
    >
      <h3 className="m-0">Loan Approval System</h3>
    </div>

    <div style={{ paddingTop: "90px" }}></div>

    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">Register</h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="CUSTOMER">Customer</option>
          <option value="OFFICER">Officer</option>
        </select>

        <button className="btn btn-success w-100 mb-2" onClick={handleRegister}>
          Register
        </button>

        <p className="text-center">
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  </>
);

}

export default Register;
