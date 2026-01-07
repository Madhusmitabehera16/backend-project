const express = require("express");
const router = express.Router();

const { searchHotels } = require("../controllers/hotel.controller");

router.get("/search", searchHotels);

module.exports = router;
