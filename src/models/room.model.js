const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: String,

    pricePerNight: {
      type: Number,
      required: true,
    },

    maxGuests: {
      type: Number,
      required: true,
    },

    totalRooms: {
      type: Number,
      required: true,
    },

    amenities: [String],

    images: [String],

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
