const express = require("express");
const connectDB = require("./Utils/db");
const cors = require("cors");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

// To restrict CORS to specific origins (optional)
const corsOptions = {
  origin: ["http://localhost:5173", "https://tech-tales-qv6h.vercel.app"], // Update this with your Vercel URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // If you're sending cookies or auth tokens
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);

// Handle preflight (OPTIONS) requests globally
app.options("*", cors());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Dynamic Content Generator API");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
