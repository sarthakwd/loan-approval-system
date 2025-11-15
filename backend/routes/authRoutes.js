// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// debug helper: show what we actually got from the controller file
console.log("📌 authRoutes loaded — controller exports:", Object.keys(authController));

/*
  We accept either:
   - authController.register  OR authController.registerUser
   - authController.login     OR authController.loginUser
  (some of our earlier edits used different names)
*/
const registerHandler = authController.register || authController.registerUser;
const loginHandler = authController.login || authController.loginUser;
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

if (typeof registerHandler !== "function") {
  console.error("❌ Register handler is NOT a function. Check controllers/authController.js");
}
if (typeof loginHandler !== "function") {
  console.error("❌ Login handler is NOT a function. Check controllers/authController.js");
}

router.post("/register", registerHandler);
router.post("/login", loginHandler);

module.exports = router;
