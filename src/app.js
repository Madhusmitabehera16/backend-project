const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.routes");
const hotelRoutes = require("./routes/hotel.routes");
const roomRoutes = require("./routes/room.routes");
const errorHandler = require("./middleware/error.middleware");
const paymentRoutes = require("./routes/payment.routes");



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/payment", paymentRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use(errorHandler);

module.exports = app;
