const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getRescueTimeData = async () => {
  const response = await axios.get(`https://www.rescuetime.com/anapi/daily_summary_feed?key=${process.env.RESCUETIME_API_KEY}`);
  const summary = response.data[0];
  const productivityScoreToday = await axios.get(`https://www.rescuetime.com/anapi/data?key=${process.env.RESCUETIME_API_KEY}&perspective=interval&restrict_kind=productivity&interval=hour&restrict_end=now&restrict_begin=today`);
  const productivityScoreThisWeek = await axios.get(`https://www.rescuetime.com/anapi/data?key=${process.env.RESCUETIME_API_KEY}&perspective=interval&restrict_kind=productivity&interval=day&restrict_end=now&restrict_begin=${summary.date}`);
  const activitiesLastHour = await axios.get(`https://www.rescuetime.com/anapi/data?key=${process.env.RESCUETIME_API_KEY}&perspective=interval&interval=minute&restrict_end=now&restrict_begin=${new Date(Date.now() - 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ')}&restrict_kind=category`);
  const activitiesToday = await axios.get(`https://www.rescuetime.com/anapi/data?key=${process.env.RESCUETIME_API_KEY}&perspective=interval&interval=minute&restrict_end=now&restrict_begin=today&restrict_kind=category`);
  return {
    summary,
    productivityScoreToday: productivityScoreToday.data.rows[0][3],
    productivityScoreThisWeek: productivityScoreThisWeek.data.rows[0][3],
    activitiesLastHour: activitiesLastHour.data.rows,
    activitiesToday: activitiesToday.data.rows
  };
};

module.exports = {
  getRescueTimeData
};