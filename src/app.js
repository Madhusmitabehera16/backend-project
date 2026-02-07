const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.routes");
const hotelRoutes = require("./routes/hotel.routes");
const roomRoutes = require("./routes/room.routes");
const paymentRoutes = require("./routes/payment.routes");
const contactRoutes = require("./routes/contact.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

/* ======================
   🔹 MIDDLEWARES
====================== */

// 🔥 CORS (REQUIRED for Next.js + Google OAuth)
app.use(
  cors({
    origin: "https://luxstay-frontend-8yer.onrender.com",
    credentials: true,
  })
);

// 🔹 JSON parser
app.use(express.json());

/* ======================
   🔹 ROUTES (UNCHANGED)
====================== */

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contact", contactRoutes);


/* ======================
   🔹 DEBUG ROUTES (NEW)
====================== */

// Root check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔥 AUTH DEBUG (VERY IMPORTANT)
app.get("/api/auth/test", (req, res) => {
  res.send("Auth route working ✅");
});

/* ======================
   🔹 ERROR HANDLER
====================== */

app.use(errorHandler);

module.exports = app;
