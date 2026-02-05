const Contact = require("../models/Contact");

exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, address, query } = req.body;

    if (!name || !email || !phone || !query) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      address,
      query,
    });

    res.status(201).json({
      message: "Contact query submitted successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
