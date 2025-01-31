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

  phone: {
    type: String,
    required: false,
  },
  specialty: {
    type: String,
    enum: ["Healthcare", "Technology", "Education", "Finance", "Other"],
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
