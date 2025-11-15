// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: { // store hashed password
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["CUSTOMER", "OFFICER"],
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
