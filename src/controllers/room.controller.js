const Room = require("../models/room.model");
const Booking = require("../models/booking.model");

const checkAvailability = async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, guests } = req.query;

    if (!hotelId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const rooms = await Room.find({
      hotel: hotelId,
      maxGuests: { $gte: guests },
      isAvailable: true,
    });

    const availableRooms = [];

    for (const room of rooms) {
      const bookedCount = await Booking.countDocuments({
        room: room._id,
        bookingStatus: "confirmed",
        $and: [
          { checkIn: { $lt: new Date(checkOut) } },
          { checkOut: { $gt: new Date(checkIn) } },
        ],
      });

      if (bookedCount < room.totalRooms) {
        availableRooms.push({
          room,
          availableRooms: room.totalRooms - bookedCount,
        });
      }
    }

    res.status(200).json(availableRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Availability check failed" });
  }
};

module.exports = { checkAvailability };
