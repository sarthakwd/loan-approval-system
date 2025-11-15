const { evaluateLoan } = require("../services/loanService");
const LoanApplication = require("../models/LoanApplication");
const Customer = require("../models/Customer");

// CUSTOMER: Apply for a loan
// CUSTOMER: Apply for a loan
exports.applyLoan = async (req, res) => {
  try {
    console.log("\n========================");
    console.log("📥 applyLoan START");
    console.log("========================");

    const { amountRequested, tenureMonths, income } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { userId } = req.user;
    let customer = await Customer.findOne({ userId });

    if (!customer) {
      return res.status(400).json({ message: "Customer profile not found" });
    }

    // ---------- UPDATE INCOME ----------
    customer.income = Number(income);

    // ---------- DYNAMIC CREDIT SCORE ----------
    let score = 500;

    // Income based factor
    if (customer.income < 20000) score += 20;
    else if (customer.income < 40000) score += 80;
    else if (customer.income < 60000) score += 150;
    else if (customer.income < 80000) score += 220;
    else score += 300;

    // Loan history factor
    const previousLoans = await LoanApplication.find({ customerId: customer._id });

    previousLoans.forEach((loan) => {
      if (loan.status === "APPROVED") score += 20;
      if (loan.status === "REJECTED") score -= 10;
    });

    // Limit credit score between 300 and 850
    customer.creditScore = Math.max(300, Math.min(850, score));

    await customer.save();
    console.log("✨ Updated Dynamic Credit Score:", customer.creditScore);

    // ---------- CREATE NEW LOAN ----------
    const newLoan = new LoanApplication({
      customerId: customer._id,
      amountRequested,
      tenureMonths,
      status: "PENDING"
    });

    await newLoan.save();

    // Evaluate eligibility (DO NOT change status)
    await evaluateLoan(newLoan._id);

    return res.json({
      message: "Loan application submitted",
      loanId: newLoan._id
    });

  } catch (err) {
    console.log("❌ Loan Apply Error:", err);
    return res.status(500).json({ error: err.message });
  }
};


// CUSTOMER: Get loan status
exports.getLoanStatus = async (req, res) => {
  try {
    const loanId = req.params.id;

    console.log("\n================= GET LOAN STATUS =================");
    console.log("Loan ID:", loanId);

    const loan = await LoanApplication.findById(loanId);
    console.log("Loan found in DB:", loan);

    if (!loan) {
      console.log("❌ Loan not found");
      return res.status(404).json({ message: "Loan not found" });
    }

    console.log("➡ Status:", loan.status);
    console.log("➡ Eligibility Score:", loan.eligibilityScore);

    res.json({
      status: loan.status,
      eligibilityScore: loan.eligibilityScore
    });

  } catch (err) {
    console.log("❌ getLoanStatus ERROR =", err);
    res.status(500).json({ error: err.message });
  }
};

// CUSTOMER: Get all loans of a customer
exports.getCustomerLoans = async (req, res) => {
  try {
    console.log("\n========================");
    console.log("📥 getCustomerLoans START");
    console.log("========================");

    // Logged-in userId from JWT
    const userId = req.user.userId;
    console.log("🔍 JWT userId =", userId);

    // Find customer using userId
    const customer = await Customer.findOne({ userId });

    console.log("🧾 Found customer =", customer);

    if (!customer) {
      console.log("❌ No customer profile found");
      return res.status(404).json({ message: "Customer profile not found" });
    }

    // Fetch loans belonging to this customer
    const loans = await LoanApplication.find({ customerId: customer._id }).sort({ createdAt: -1 });

    console.log("📌 Loans Found =", loans.length);

    res.json(loans);

  } catch (err) {
    console.log("❌ GetCustomerLoans Error:", err);
    res.status(500).json({ error: err.message });
  }
};
