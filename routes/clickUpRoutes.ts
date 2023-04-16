import express from 'express';

const router = express.Router();

const clickupService = require('../services/clickup');

router.get('/clickup/tasks', async (req, res) => {
  try {
    const tasks = await clickupService.getClickUpTasks();
    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

export default router;
