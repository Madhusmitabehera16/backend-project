const Booking = require("../models/booking.model");
const Room = require("../models/room.model");

const createBooking = async (req, res) => {
  try {
    const {
      hotel,
      room,
      checkIn,
      checkOut,
      guests,
      nights,
      totalAmount,
    } = req.body;

    // Re-check availability
    const bookedCount = await Booking.countDocuments({
      room,
      bookingStatus: "confirmed",
      $and: [
        { checkIn: { $lt: new Date(checkOut) } },
        { checkOut: { $gt: new Date(checkIn) } },
      ],
    });

    const roomData = await Room.findById(room);

    if (bookedCount >= roomData.totalRooms) {
      return res.status(400).json({ message: "Room not available" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      hotel,
      room,
      checkIn,
      checkOut,
      guests,
      nights,
      totalAmount,
      paymentStatus: "paid",
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("hotel")
      .populate("room")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
};

