const crypto = require("crypto");

// Generate a random 256-bit key (32 bytes, 64 characters)
const key = crypto.randomBytes(32).toString("hex");
console.log(key);
