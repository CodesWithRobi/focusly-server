const express = require("express");
const router = express.Router();
const Session = require("../models/Session");

// GET /api/stats/:username
router.get("/:username", async (req, res) => {
  const { username } = req.params;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - 6); // Last 7 days

  try {
    const sessions = await Session.find({
      username,
      date: { $gte: startOfWeek },
    });

    const stats = {
      today: 0,
      yesterday: 0,
      week: 0,
      byDay: Array(7).fill(0), // Monday(0) - Sunday(6)
      byType: {}
    };

    sessions.forEach((s) => {
      const sessionDate = new Date(s.date);
      sessionDate.setHours(0, 0, 0, 0);

      // Day index for graph
      const dayIndex = (sessionDate.getDay() + 6) % 7; // make Monday = 0
      stats.byDay[dayIndex] += s.duration;
      stats.week += s.duration;

      if (sessionDate.getTime() === today.getTime()) {
        stats.today += s.duration;
      }

      if (sessionDate.getTime() === yesterday.getTime()) {
        stats.yesterday += s.duration;
      }

      stats.byType[s.type] = (stats.byType[s.type] || 0) + s.duration;
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


router.post("/", async (req, res) => {
  const { username, duration, type } = req.body;

  if (!username || !duration || !type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newSession = new Session({
      username,
      duration,
      type,
      date: new Date(),
    });

    await newSession.save();
    res.status(201).json({ message: "Session saved", session: newSession });
  } catch (error) {
    console.error("Error saving session:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
