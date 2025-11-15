import { useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function CustomerProfile() {
  const { userId } = useContext(AuthContext);

  const [income, setIncome] = useState("");
  const [creditScore, setCreditScore] = useState("");

  const saveProfile = async () => {
    try {
      await api.put("/customer/update-profile", {
        income: Number(income),
        creditScore: Number(creditScore)
      });

      alert("Profile updated!");
      window.location.href = "/customer"; // back to dashboard
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Update Your Profile</h2>

      <input
        type="number"
        placeholder="Income (₹)"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        style={{ display: "block", margin: "10px 0" }}
      />

      <input
        type="number"
        placeholder="Credit Score"
        value={creditScore}
        onChange={(e) => setCreditScore(e.target.value)}
        style={{ display: "block", margin: "10px 0" }}
      />

      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}
