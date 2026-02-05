require("dotenv").config();
const mongoose = require("mongoose");
const Hotel = require("../models/hotel.model");
const cities = require("../data/cities"); // ✅ FIXED
const {
  randomHotelName,
  randomImages,
  randomPrice,
  randomRating,
} = require("../utils/hotelGenerator");

mongoose.connect(process.env.MONGO_URI);

const seedHotels = async () => {
  try {
    console.log("🚀 Seed script started");

    if (!cities || cities.length === 0) {
      throw new Error("❌ Cities data not loaded");
    }

    await Hotel.deleteMany();
    console.log("🗑️ Old hotels removed");

    const hotels = [];

    for (const city of cities) {
      console.log("Seeding city:", city.city);

      const count = Math.floor(Math.random() * 6) + 5;

      for (let i = 0; i < count; i++) {
        hotels.push({
          name: `${randomHotelName()} ${city.city}`,
          description: `Premium stay in ${city.city} with modern amenities.`,
          address: {
            street: "Main Road",
            city: city.city,
            state: city.state,
            country: "India",
          },
          location: {
            type: "Point",
            coordinates: [city.lng, city.lat],
          },
          images: randomImages(),
          rating: randomRating(),
          amenities: ["WiFi", "Parking", "AC", "Restaurant"],
          minPrice: randomPrice(),
          isActive: true,
        });
      }
    }

    console.log("Hotels to insert:", hotels.length);

    await Hotel.insertMany(hotels);

    console.log(`✅ Inserted ${hotels.length} hotels successfully`);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedHotels();
