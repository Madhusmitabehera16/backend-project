const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");

const {
  createBooking,
  getMyBookings,
} = require("../controllers/booking.controller");

router.post("/", protect, createBooking);     // existing
router.get("/my", protect, getMyBookings);    // NEW

module.exports = router;
