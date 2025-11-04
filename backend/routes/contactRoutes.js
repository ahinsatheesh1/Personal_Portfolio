import express from "express";
import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contact — save to DB + email owner
router.post("/", async (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const ownerEmail = process.env.EMAIL_USER;
  const ownerPass = process.env.EMAIL_PASS;
  if (!ownerEmail || !ownerPass) {
    return res.status(500).json({ success: false, message: "Email not configured on server" });
  }

  try {
    // Save to MongoDB (best‑effort)
    try {
      await Contact.create({ name, email, message });
    } catch (dbErr) {
      console.error("contact db save error:", dbErr?.message || dbErr);
    }

    // Build mail payload
    const mail = {
      from: `Portfolio Contact <${ownerEmail}>`,
      to: process.env.EMAIL_TO || ownerEmail,
      replyTo: email,
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong></p>
             <pre style="white-space:pre-wrap">${message}</pre>`,
    };

    // Primary SMTP from env (defaults to Gmail 465)
    const host = process.env.EMAIL_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.EMAIL_PORT || "465", 10);
    const secure = (process.env.EMAIL_SECURE || "true").toString().toLowerCase() === "true" || port === 465;
    let transporter = nodemailer.createTransport({ host, port, secure, auth: { user: ownerEmail, pass: ownerPass } });

    try {
      await transporter.sendMail(mail);
      return res.json({ success: true, message: "Message sent successfully" });
    } catch (primaryErr) {
      console.error("contact primary smtp error:", primaryErr?.response || primaryErr?.message || primaryErr);
      // Fallback to STARTTLS on 587 (common firewalls block 465)
      try {
        transporter = nodemailer.createTransport({ host, port: 587, secure: false, auth: { user: ownerEmail, pass: ownerPass } });
        await transporter.sendMail(mail);
        return res.json({ success: true, message: "Message sent successfully" });
      } catch (fallbackErr) {
        console.error("contact fallback smtp error:", fallbackErr?.response || fallbackErr?.message || fallbackErr);
        return res.status(500).json({ success: false, message: "Failed to send message (SMTP error)" });
      }
    }
  } catch (err) {
    console.error("contact mail error:", err?.response || err?.message || err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

// Debug endpoint (no secrets) to verify server env
router.get("/debug", (_req, res) => {
  res.json({
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
    EMAIL_PORT: process.env.EMAIL_PORT || 465,
    EMAIL_SECURE: process.env.EMAIL_SECURE || true,
    TO: process.env.EMAIL_TO || process.env.EMAIL_USER || null,
  });
});

export default router;

