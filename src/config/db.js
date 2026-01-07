const mongoose = require("mongoose");

console.log("🔥 db.js file loaded");

const connectDB = async () => {
  try {
    console.log("⏳ Trying to connect to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
