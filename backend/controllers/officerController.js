const LoanApplication = require("../models/LoanApplication");
const Customer = require("../models/Customer");

exports.getPendingLoans = async (req, res) => {
  try {
    const loans = await LoanApplication.find({ status: "PENDING" })
      .populate({
        path: "customerId",
        populate: {
          path: "userId",
          model: "User",
          select: "name email"
        }
      });

    res.json(loans);
  } catch (err) {
    console.log("❌ Pending Loans Error:", err);
    res.status(500).json({ error: err.message });
  }
};



// Approve / Reject loan
exports.reviewLoan = async (req, res) => {
  try {
    const loanId = req.params.id;
    const { decision } = req.body; // "APPROVED" or "REJECTED"

    const loan = await LoanApplication.findById(loanId);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    // Officer decides the status (NOT system)
    loan.status = decision;

    await loan.save();

    res.json({ message: `Loan ${decision}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

