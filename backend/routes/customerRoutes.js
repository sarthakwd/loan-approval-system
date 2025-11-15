const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { updateCustomerProfile } = require("../controllers/customerController");

router.put("/update-profile", authMiddleware, updateCustomerProfile);

module.exports = router;
