const express = require("express");
const {
  generateDynamicContent,
  getAllGeneratedContent,
} = require("../controllers/contentController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

// Protecting the /generate route
router.post("/generate", generateDynamicContent);

// Protecting the / route (to get all generated content)
router.get("/", getAllGeneratedContent);

module.exports = router;
