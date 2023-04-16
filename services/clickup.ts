import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const CLICK_API_PATH = 'https://api.clickup.com/api/v2/task';

const getClickUpTasks = async () => {
  const response = await axios.get(`${CLICK_API_PATH}?assignees[]=utkarsh.mishra@frontify.com`, {
    headers: {
      Authorization: process.env.CLICKUP_API_KEY,
    },
  });
  return response.data.tasks;
};

module.exports = {
  getClickUpTasks,
};
