const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to verify Google token
const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload(); // Returns user details from Google
};

// Register a new user (manual & Google OAuth)
const registerUser = async (req, res) => {
  const { email, password, specialty, googleToken } = req.body;

  try {
    let user;

    // If Google Token is provided, handle Google Authentication
    if (googleToken) {
      const googleUser = await verifyGoogleToken(googleToken);

      // Check if the user already exists
      user = await User.findOne({ email: googleUser.email });

      if (!user) {
        // Create new Google-authenticated user
        user = new User({
          email: googleUser.email,
          username: googleUser.name,
          avatar: googleUser.picture, // Profile picture from Google
          googleAuth: true,
          specialty: specialty || "", // User can update specialty later
        });
        await user.save();
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.json({
        token,
        user: {
          userId: user._id,
          email: user.email,
          specialty: user.specialty,
          avatar: user.avatar,
        },
      });
    }

    // Manual Registration (Non-Google Users)
    if (!password || !specialty) {
      return res
        .status(400)
        .json({ msg: "Password and specialty are required" });
    }

    // Check if the user already exists
    user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      specialty,
      googleAuth: false,
    });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.json({
      token,
      user: {
        userId: newUser._id,
        email: newUser.email,
        specialty: newUser.specialty,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).send("Server error during registration");
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Prevent Google users from logging in manually
    if (user.googleAuth) {
      return res.status(400).json({ msg: "Please log in with Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        userId: user._id,
        email: user.email,
        specialty: user.specialty,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).send("Server error during login");
  }
};

// Google OAuth callback
const googleAuthCallback = async (req, res) => {
  if (!req.user) {
    return res.redirect(
      "https://tech-tales-iota.vercel.app/login?error=google-auth-failed"
    );
  }

  try {
    let user = await User.findOne({ email: req.user.email });

    if (!user) {
      // Create a new user if not found
      user = new User({
        email: req.user.email,
        username: req.user.displayName || "No Name",
        avatar: req.user.photos?.[0]?.value || "default-avatar.png",
        googleAuth: true,
        specialty: "", // User needs to choose this
      });

      await user.save();
    } else {
      // If user exists but was registered manually, update to enable Google Auth
      user.googleAuth = true;
      user.avatar = req.user.photos?.[0]?.value || user.avatar;
      await user.save();
    }

    console.log("Google user updated:", user);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict",
    });

    // Redirect to ChooseSpecialty page with userId
    res.redirect(`https://tech-tales-iota.vercel.app/specialty/${user._id}`);
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.redirect("https://tech-tales-iota.vercel.app/login?error=server-error");
  }
};

// Logout user
const logoutUser = (req, res) => {
  req.logout();
  req.session.destroy(() => {
    res.redirect("https://tech-tales-iota.vercel.app/login");
  });
};

module.exports = { registerUser, loginUser, googleAuthCallback, logoutUser };
