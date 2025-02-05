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
      "http://localhost:5173",
      "https://tech-tales-iota.vercel.app",
      "https://accounts.google.com",
      "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=921177674856-a7s0l0srf0d4r28vn1mmm9t05qukupkn.apps.googleusercontent.com&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow",
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
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
