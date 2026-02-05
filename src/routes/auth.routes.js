const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const {
  register,
  login,
} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);



router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, picture, sub } = payload;

    // 🔹 Find or create user in DB
    const user = {
      googleId: sub,
      email,
      name,
      avatar: picture,
    };

    // 🔹 Create your own JWT
    const appToken = jwt.sign(
      { email, googleId: sub },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token: appToken, user });
  } catch (err) {
    res.status(401).json({ error: "Invalid Google Token" });
  }
});

module.exports = router;
