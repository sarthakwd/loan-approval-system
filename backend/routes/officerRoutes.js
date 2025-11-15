const express = require("express");
const router = express.Router();
console.log("📌 officerRoutes loaded");

const { authMiddleware, officerOnly } = require("../middleware/authMiddleware");
const { getPendingLoans, reviewLoan } = require("../controllers/officerController");

// GET all pending loans
router.get("/loans/pending", authMiddleware, officerOnly, getPendingLoans);

// POST approve/reject loan
router.post("/loans/:id/review", authMiddleware, reviewLoan);


module.exports = router;
