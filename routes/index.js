import * as dotenv from 'dotenv'
import {
  express
} from 'express';
const router = express.router();

import * as Services from '../services/interfaces/service';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/services', (req, res) => {

})

module.exports = router;
