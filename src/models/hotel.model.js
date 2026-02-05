const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    address: {
      street: String,
      city: {
        type: String,
        required: true,
        index: true, // important for searching
      },
      state: String,
      country: {
        type: String,
        default: "India",
      },
      pincode: String,
    },

    // GEO LOCATION (VERY IMPORTANT)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    images: [String],

    rating: {
      type: Number,
      default: 0,
    },

    amenities: [
      {
        type: String,
      },
    ],

    minPrice: {
      type: Number,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// GEO INDEX FOR LOCATION SEARCH
hotelSchema.index({ location: "2dsphere" });
// hotelSchema.index({ "address.city": 1 });
hotelSchema.index({ minPrice: 1 });
hotelSchema.index({ rating: -1 });

module.exports = mongoose.model("Hotel", hotelSchema);
