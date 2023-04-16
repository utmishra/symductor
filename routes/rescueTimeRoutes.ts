import { Request, Response } from 'express';

let express = require('express');
let router = express.Router();

const rescueTimeService = require('../services/rescueTimeService');

router.get('/rescueTime', async (req: Request, res: Response) => {
  res.json(await rescueTimeService.getRescueTimeData());
});

export default router;
