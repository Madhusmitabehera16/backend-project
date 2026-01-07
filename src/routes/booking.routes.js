const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");

const { createBooking } = require("../controllers/booking.controller");

router.post("/", protect, createBooking);

module.exports = router;
