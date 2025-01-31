const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialty: {
    type: String,
    enum: ["Healthcare", "Technology", "Education", "Finance", "Other"],
    default: "Technology",
  },
});

module.exports = mongoose.model("User", userSchema);
