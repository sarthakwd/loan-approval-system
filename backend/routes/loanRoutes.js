const express = require("express");
const router = express.Router();

console.log("📌 loanRoutes loaded");

const { authMiddleware } = require("../middleware/authMiddleware");
const { applyLoan, getLoanStatus, getCustomerLoans } = require("../controllers/loanController");

// APPLY LOAN
router.post(
  "/apply",
  authMiddleware,
  (req, res, next) => {
    console.log("🔥 /apply route HIT!");
    next();
  },
  applyLoan
);

// ⚠️ IMPORTANT: this MUST be ABOVE the :id route
router.get("/customer/me", authMiddleware, getCustomerLoans);

// OLD route (kept, but AFTER "me")
router.get("/customer/:id", authMiddleware, getCustomerLoans);

// LOAN STATUS
router.get("/:id/status", authMiddleware, getLoanStatus);

module.exports = router;
