require("dotenv").config();
const mongoose = require("mongoose");

const Hotel = require("../models/hotel.model");
const Room = require("../models/room.model");

mongoose.connect(process.env.MONGO_URI);

const roomTemplates = [
  {
    title: "Standard Room",
    priceMultiplier: 1,
    maxGuests: 2,
    totalRooms: 10,
  },
  {
    title: "Deluxe Room",
    priceMultiplier: 1.4,
    maxGuests: 3,
    totalRooms: 8,
  },
  {
    title: "Premium Room",
    priceMultiplier: 1.8,
    maxGuests: 4,
    totalRooms: 5,
  },
  {
    title: "Suite",
    priceMultiplier: 2.4,
    maxGuests: 5,
    totalRooms: 3,
  },
];

const seedRooms = async () => {
  try {
    console.log("🌱 Seeding rooms...");

    await Room.deleteMany();

    const hotels = await Hotel.find();

    const rooms = [];

    for (const hotel of hotels) {
      for (const template of roomTemplates) {
        rooms.push({
          hotel: hotel._id,
          title: template.title,
          description: `${template.title} at ${hotel.name}`,
          pricePerNight: Math.floor(hotel.minPrice * template.priceMultiplier),
          maxGuests: template.maxGuests,
          totalRooms: template.totalRooms,
        });
      }
    }

    await Room.insertMany(rooms);

    console.log(`✅ Inserted ${rooms.length} rooms successfully`);
    process.exit();
  } catch (err) {
    console.error("❌ Room seeding failed", err);
    process.exit(1);
  }
};

seedRooms();
