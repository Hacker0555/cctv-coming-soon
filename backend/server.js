// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// CORS: allow local dev + your domain
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
  "https://lookoutline.com",
  "http://lookoutline.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like Postman / curl (no origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

// SMTP transporter (reused)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Optional: verify SMTP on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready to take our messages");
  }
});

app.post("/api/leads", async (req, res) => {
  try {
    const { name, email, phone, city, serviceType, message } = req.body;

    if (!name || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Name and phone are required" });
    }

    console.log("Incoming lead:", {
      name,
      email,
      phone,
      city,
      serviceType,
    });

    const mailText = `
New CCTV / Biometric Lead

Name: ${name}
Email: ${email || "Not provided"}
Phone: ${phone}
City/Area: ${city || "Not provided"}
Service Type: ${serviceType || "Not selected"}

Message:
${message || "-"}
    `.trim();

    await transporter.sendMail({
      from: `"LookOutline Leads" <${process.env.SMTP_USER}>`,
      to: process.env.LEADS_EMAIL,
      subject: "New CCTV / Biometric Service Lead",
      text: mailText,
    });

    console.log("✅ Lead email sent successfully");

    return res.json({
      success: true,
      message: "Lead sent successfully",
    });
  } catch (err) {
    console.error("❌ Error sending lead email:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send lead. Please try again later.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Lead server running on port ${PORT}`);
});
