const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/multer");
const { uploadAvatar } = require("../controllers/user.controller");
const { updateProfile } = require("../controllers/user.controller");

router.patch("/update-profile", protect, updateProfile);

router.post(
  "/upload-avatar",
  protect,
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;
