const Hotel = require("../models/hotel.model");

const searchHotels = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const hotels = await Hotel.find({
      "address.city": { $regex: location, $options: "i" },
      isActive: true
    });

    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
};

module.exports = { searchHotels };
