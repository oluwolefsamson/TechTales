const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

// Passport Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/auth/google/callback", // Ensure it's correct for production as well
      scope: ["profile", "email"], // Scopes for profile and email permissions
    },
    async (token, tokenSecret, profile, done) => {
      console.log("Google profile:", profile); // Debugging line

      if (!profile) {
        return done(new Error("Profile not found"));
      }

      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          // If no user exists, create a new one
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
          });

          await user.save();
        } else if (!user.googleId) {
          // If user exists but does not have a Google ID, update it
          user.googleId = profile.id;
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        console.error("Error during authentication:", err);
        return done(err, null);
      }
    }
  )
);

// Serialize and Deserialize User
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
