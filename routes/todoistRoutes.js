const express = require('express');
const router = express.Router();
const todoistService = require('../services/todoist');

router.get('/today', async (req, res) => {
  const tasks = await todoistService.getTasksToday();
  res.json(tasks);
});

router.get('/overdue', async (req, res) => {
  const tasks = await todoistService.getOverdueTasks();
  res.json(tasks);
});

router.get('/personal', async (req, res) => {
  const tasks = await todoistService.getPersonalTasks();
  res.json(tasks);
});

router.get('/work', async (req, res) => {
  const tasks = await todoistService.getWorkTasks();
  res.json(tasks);
});

module.exports = router;
