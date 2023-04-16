const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const getClickUpTasks = async () => {
  const response = await axios.get(`https://api.clickup.com/api/v2/task?assignees[]=utkarsh.mishra@frontify.com`, {
    headers: {
      'Authorization': process.env.CLICKUP_API_KEY
    }
  });
  return response.data.tasks;
};

module.exports = {
  getClickUpTasks
};