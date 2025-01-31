const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// Register a new user
const registerUser = async (req, res) => {
  const { email, password, specialty } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      specialty,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: {
        userId: newUser._id,

        email: newUser.email,
        specialty: newUser.specialty,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        specialty: user.specialty,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Logout user
const logoutUser = async (req, res) => {
  try {
    // Tell the client to remove the token
    res.json({
      msg: "Logout successful. Please remove token from client storage.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { registerUser, loginUser, logoutUser };
