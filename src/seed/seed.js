require("dotenv").config(); // loads .env
const mongoose = require("mongoose");

// IMPORT MODELS
const Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");
  } catch (error) {
    console.error("❌ DB connection failed", error);
    process.exit(1);
  }
};
const clearDatabase = async () => {
  await Hotel.deleteMany();
  await Room.deleteMany();
  console.log("🧹 Old data removed");
};

const seedHotelsAndRooms = async () => {
  // CREATE HOTELS
  const delhiHotel = await Hotel.create({
    name: "Taj Palace",
    description: "Luxury hotel in Delhi",
    address: {
      city: "Delhi",
      country: "India"
    },
    location: {
      type: "Point",
      coordinates: [77.2167, 28.6448]
    },
    amenities: ["WiFi", "Pool", "Parking"],
    minPrice: 4500,
    isActive: true
  });

  const mumbaiHotel = await Hotel.create({
    name: "Oberoi Trident",
    description: "Premium hotel in Mumbai",
    address: {
      city: "Mumbai",
      country: "India"
    },
    location: {
      type: "Point",
      coordinates: [72.8777, 19.076]
    },
    amenities: ["WiFi", "Gym", "Spa"],
    minPrice: 3800,
    isActive: true
  });

  console.log("🏨 Hotels added");
  await Room.create([
    {
      hotel: delhiHotel._id,
      title: "Deluxe Room",
      pricePerNight: 5000,
      maxGuests: 2,
      totalRooms: 5,
      amenities: ["AC", "WiFi"]
    },
    {
      hotel: delhiHotel._id,
      title: "Suite Room",
      pricePerNight: 8000,
      maxGuests: 4,
      totalRooms: 2,
      amenities: ["AC", "WiFi", "Jacuzzi"]
    },
    {
      hotel: mumbaiHotel._id,
      title: "Executive Room",
      pricePerNight: 4200,
      maxGuests: 2,
      totalRooms: 6,
      amenities: ["AC", "WiFi"]
    }
  ]);

  console.log("🛏 Rooms added");
};
const runSeed = async () => {
  await connectDB();
  await clearDatabase();
  await seedHotelsAndRooms();
  console.log("🌱 Seeding completed");
  process.exit();
};

runSeed();
