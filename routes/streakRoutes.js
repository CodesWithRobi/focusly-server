const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Adjust path if needed

router.post("/update/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));

    let user = await User.findOne({ username });

    if (!user) {
      // If user doesn't exist, create one
      user = await User.create({
        username,
        streak: 1,
        lastActive: startOfToday,
      });
    } else {
      const lastActive = new Date(user.lastActive);
      const diffDays = Math.floor((startOfToday - lastActive) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        user.streak += 1; // Continue streak
      } else if (diffDays > 1) {
        user.streak = 1; // Reset streak
      }
      user.lastActive = startOfToday;
      await user.save();
    }

    return res.status(200).json({
      message: "Streak updated successfully",
      streak: user.streak,
    });
  } catch (error) {
    console.error("Streak update error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
