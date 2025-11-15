const LoanApplication = require("../models/LoanApplication");

exports.evaluateLoan = async (loanId) => {
  try {
    console.log("🔍 Evaluating loan:", loanId);

    const loan = await LoanApplication.findById(loanId).populate("customerId");

    if (!loan) return console.log("❌ Loan not found");

    const customer = loan.customerId;
    if (!customer) return console.log("❌ Customer not found");

    // Calculate normalized values (income used as provided)
    const incomeNorm = Math.min(customer.income / 100000, 1);
    const creditNorm = Math.min((customer.creditScore || 0) / 850, 1);

    // Score calculation (only saved, no status change)
    const score = (0.6 * creditNorm + 0.4 * incomeNorm) * 100;

    loan.eligibilityScore = Math.round(score);

    await loan.save();

    console.log("🎯 Eligibility Score Saved:", loan.eligibilityScore);

  } catch (err) {
    console.log("❌ Evaluation error:", err);
  }
};
