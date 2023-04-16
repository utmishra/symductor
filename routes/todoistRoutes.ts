import express from 'express';
const router = express.Router();
import { getTasks } from '../services/todoist';

router.get('/today', async (req, res) => {
  const tasks = await getTasks();
  res.json(tasks);
});

export default router;
