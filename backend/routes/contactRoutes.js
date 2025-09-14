import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact → send email + save to DB
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // ✅ save to MongoDB
    const newContact = await Contact.create({ name, email, message });

    // ✅ send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    res.json({ success: true, message: "Message sent & saved ✅", data: newContact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "❌ Failed to send or save message" });
  }
});

export default router;
