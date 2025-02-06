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
      callbackURL: "http://localhost:8000/api/auth/google/callback",
      scope: ["profile", "email"],
      prompt: "select_account", // Force email selection every time
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google profile:", profile);

      if (!profile) {
        console.error("Google profile not found");
        return done(new Error("Profile not found"));
      }

      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          console.log(
            `No user found. Creating new user: ${profile.emails[0].value}`
          );
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value,
          });

          await user.save();
          console.log("User created successfully:", user);
        } else if (!user.googleId) {
          console.log(
            `User found, but no Google ID. Updating user with Google ID: ${profile.id}`
          );
          user.googleId = profile.id;
          await user.save();
          console.log("User updated successfully:", user);
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
  console.log("Serializing user:", user.id); // Info log
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserialized user:", user); // Info log
    done(null, user);
  } catch (err) {
    console.error("Error during deserialization:", err); // Error log
    done(err, null);
  }
});

module.exports = passport;
