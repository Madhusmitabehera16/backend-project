const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
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
      default: null,
    },
    googleId: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: ["guest", "owner", "admin"],
      default: "guest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
