const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleAuthCallback,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Assuming 'userId' is available in the session after authentication
    const userId = req.user._id; // Or however you are storing the user ID

    // Redirect to the frontend route with userId
    res.redirect(`https://tech-tales-iota.vercel.app/specialty/${userId}`);
  }
);

module.exports = router;
