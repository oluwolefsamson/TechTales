const mongoose = require("mongoose");

const generatedContentSchema = new mongoose.Schema({
  specialty: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GeneratedContent = mongoose.model(
  "GeneratedContent",
  generatedContentSchema
);

module.exports = GeneratedContent;
