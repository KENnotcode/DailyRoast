//middleware/authMiddleware.js
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.cookies.session;
    if (!userId) {
      return res.status(401).json({ msg: "No session found, please log in" });
    }

    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(401).json({ msg: "Invalid session, please log in" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = authMiddleware;
