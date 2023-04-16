import express from 'express';

const router = express.Router();
const githubService = require('../services/github');

// A route which returns github contribution activity for last N days for a requested user

router.get('/github/contributions', async (req, res) => {
  try {
    const { username, days } = req.query;
    const contributions = await githubService.getUserContributions(username, days);
    res.status(200).json({
      contributions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

export default router;
