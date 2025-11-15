const Customer = require("../models/Customer");

exports.updateCustomerProfile = async (req, res) => {
  try {
    const { income, creditScore } = req.body;
    const userId = req.user.userId;

    let customer = await Customer.findOne({ userId });

    if (!customer) {
      customer = new Customer({ userId, income, creditScore });
      await customer.save();
    } else {
      customer.income = income;
      customer.creditScore = creditScore;
      await customer.save();
    }

    res.json({
      message: "Customer profile updated",
      customer
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
