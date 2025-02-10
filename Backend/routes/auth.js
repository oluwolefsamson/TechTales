const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleAuthCallback,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();
const LOCAL_FRONTEND_URL =
  process.env.LOCAL_FRONTEND_URL || "http://localhost:5173";
const DEV_FRONTEND_URL =
  process.env.DEV_FRONTEND_URL || "http://localhost:5173";
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account", // Force email selection every time
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Assuming 'userId' is available in the session after authentication
    const userId = req.user._id; // Or however you are storing the user ID

    // Redirect to the frontend route with userId
    res.redirect(`${LOCAL_FRONTEND_URL}/specialty/${userId}`);
  }
);

module.exports = router;
