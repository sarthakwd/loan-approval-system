// backend/controllers/authController.js
const User = require("../models/User");
const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
      role
    });

    await user.save();

    // Auto-create Customer profile if role CUSTOMER
    if (role === "CUSTOMER") {
  await Customer.create({
    userId: user._id,
    income: 0,
    creditScore: 700       // default credit score
  });
}


    return res.status(201).json({
      message: "User registered successfully",
      userId: user._id
    });
  } catch (err) {
    console.error("❌ register ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1d" });

    return res.json({
      token,
      userId: user._id,
      role: user.role
    });
  } catch (err) {
    console.error("❌ login ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
