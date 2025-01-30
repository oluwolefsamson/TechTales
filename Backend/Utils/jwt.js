const jwt = require("jsonwebtoken");

// Secret key for JWT (keep this secure)
const SECRET_KEY = process.env.JWT_SECRET || "yourSecretKey";

// Function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Function to verify JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
