const express = require("express");
const router = express.Router();

const { checkAvailability } = require("../controllers/room.controller");

router.get("/availability", checkAvailability);

module.exports = router;
