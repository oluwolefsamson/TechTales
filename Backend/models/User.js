const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Set to false here
  },
  phone: {
    type: String,
    required: false,
  },
  specialty: {
    type: String,
    enum: ["Healthcare", "Technology", "Education", "Finance", "Other"],
    default: "Technology", // Set default here
  },
  googleAuth: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to handle default values and password conditionally
userSchema.pre("save", function (next) {
  // Ensure specialty has a valid value
  if (!this.specialty || this.specialty.trim() === "") {
    this.specialty = "Technology"; // Set default if empty or undefined
  }

  // If it's a new user and Google authentication is used, set googleAuth = true
  if (this.isNew && !this.password) {
    this.googleAuth = true;
  }

  // If user is not using Google authentication and password is missing, throw an error
  if (!this.googleAuth && !this.password) {
    return next(new Error("Password is required for regular users"));
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
