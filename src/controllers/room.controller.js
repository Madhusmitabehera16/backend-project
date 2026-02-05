const mongoose = require("mongoose");
const Room = require("../models/room.model");
const Booking = require("../models/booking.model");

exports.checkAvailability = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests } = req.query;

    // 🔹 Basic validation
    if (!hotelId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    if (!mongoose.Types.ObjectId.isValid(hotelId)) {
      return res.status(400).json({ message: "Invalid hotelId" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // 🔹 Fetch rooms for hotel
    const rooms = await Room.find({
      hotel: hotelId,
      maxGuests: { $gte: Number(guests || 1) },
      isAvailable: true,
    });

    const results = [];

    for (const room of rooms) {
      // 🔹 Count overlapping bookings
      const bookedCount = await Booking.countDocuments({
        room: room._id,
        checkIn: { $lt: checkOutDate },
        checkOut: { $gt: checkInDate },
      });

      const availableRooms = room.totalRooms - bookedCount;

      if (availableRooms > 0) {
        results.push({
          room,
          availableRooms,
        });
      }
    }

    return res.status(200).json(results);
  } catch (err) {
    console.error("❌ Availability error:", err);
    return res.status(500).json({
      message: "Availability check failed",
      error: err.message,
    });
  }
};
