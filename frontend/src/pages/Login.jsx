import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      login(res.data.token, res.data.role, res.data.userId);

      toast.success("Login successful");

      if (res.data.role === "CUSTOMER") {
        navigate("/customer");
      } else {
        navigate("/officer");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
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

    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control mb-3"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control mb-3"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  </>
);

}

export default Login;
