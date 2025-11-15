// Load env vars
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");
const customerRoutes = require("./routes/customerRoutes");
const officerRoutes = require("./routes/officerRoutes");

const app = express();

// CORS FIX
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/officer", officerRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Loan Approval Backend is running 🚀");
});

// MONGO CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
