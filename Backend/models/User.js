const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
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
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
