const express = require("express");
const connectDB = require("./Utils/db");
const cors = require("cors");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/auth");
const passport = require("./config/passport"); // Import the passport configuration
const session = require("express-session");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.LOCAL_FRONTEND_URL,
      process.env.DEV_FRONTEND_URL,
      "https://techtales-1nru.onrender.com",
      "https://accounts.google.com",
    ];

    if (process.env.NODE_ENV !== "production") {
      allowedOrigins.push("http://localhost:5173"); // Example for Vite frontend
    }

    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log(`Blocked CORS request from origin: ${origin}`);
    return callback(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);

// Handle preflight (OPTIONS) requests globally
app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Dynamic Content Generator API");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
