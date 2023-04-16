import express from 'express';

const googleCalendarService = require('../services/googleCalendarService');

const router = express.Router();

router.get('/googleCalendar', async (req, res) => {
  return await googleCalendarService.getEvents();
});

export default router;
