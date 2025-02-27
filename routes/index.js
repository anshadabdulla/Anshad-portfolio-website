const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Home page route
router.get("/", (req, res) => {
  res.render("index", { success: null, error: null });
});

// Handle contact form submission
router.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Received form data:", { name, email, message });

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Your Gmail with sender name
      replyTo: email, // So replies go to the user
      to: process.env.EMAIL_USER, // Your Gmail where you receive messages
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.render("index", { success: "Your message has been sent successfully!", error: null });
  } catch (error) {
    console.error("Error sending email:", error);
    res.render("index", { success: null, error: "Failed to send message. Please try again later." });
  }
});

module.exports = router;
