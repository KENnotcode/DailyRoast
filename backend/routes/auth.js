// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

//store SIGNUP data to 'users' in mongodb
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// @desc    Authenticate user for LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Set an HTTP-only cookie
    res.cookie("session", user._id, {
      httpOnly: true,
      sameSite: "Strict", // Adjust as needed
      maxAge: 24 * 60 * 60 * 1000, // 1 day, adjust if needed
    });

    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get User Profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving profile" });
  }
});

// Update Profile
router.put("/profile", authMiddleware, async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, email },
    { new: true }
  );
  res.json(updatedUser);
});

// Logout route
router.post("/logout", (req, res) => {
  try {
    // If using cookies to store authentication tokens or session IDs
    res.clearCookie("session");

    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ msg: "Failed to log out" });
        } else {
          return res.status(200).json({ msg: "Logout successful" });
        }c
      });
    } else {
      res.status(200).json({ msg: "Logout successful" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Failed to log out" });
  }
});

router.get("/session", (req, res) => {
  try {
    // Check if the session cookie exists
    const sessionId = req.cookies.session;

    if (!sessionId) {
      return res.status(200).json({ sessionId: null });
    }

    // If session cookie exists, return the session ID
    res.status(200).json({ sessionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
