const express = require('express');

const router = express.Router();

// --- Mock Data (in-memory) ---
const users = [
  { email: 'admin@weather.iq' },
  { email: 'user1@example.com' },
];

const latestWeatherIraq = {
  country: 'Iraq',
  city: 'Baghdad',
  temperatureC: 44,
  humidity: 22,
  windKph: 15,
  condition: 'Sunny',
  updatedAt: '2026-07-10T12:00:00Z',
};

// --- Endpoints ---

/**
 * GET /api/items
 * Retrieve latest weather data for Iraq.
 */
router.get('/api/items', (req, res) => {
  res.json({
    success: true,
    data: latestWeatherIraq,
  });
});

module.exports = { router, users };