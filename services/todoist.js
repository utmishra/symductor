const axios = require('axios');
require('dotenv').config();

const todoistAPIKey = process.env.TODOIST_API_KEY;

const getTasks = async () => {
  try {
    const todayTasks = await axios.get(`https://api.todoist.com/rest/v1/tasks?filter=today`, {
      headers: {
        Authorization: `Bearer ${todoistAPIKey}`, 
      },
    });
    const overdueTasks = await axios.get(`https://api.todoist.com/rest/v1/tasks?filter=overdue`, {
      headers: {
        Authorization: `Bearer ${todoistAPIKey}`, 
      },
    });
    const personalTasks = await axios.get(`https://api.todoist.com/rest/v1/tasks?filter=folder:${process.env.TODOIST_PERSONAL_FOLDER_ID}`, {
      headers: {
        Authorization: `Bearer ${todoistAPIKey}`, 
      },
    });
    const workTasks = await axios.get(`https://api.todoist.com/rest/v1/tasks?filter=folder:${process.env.TODOIST_WORK_FOLDER_ID}`, {
      headers: {
        Authorization: `Bearer ${todoistAPIKey}`, 
      },
    });
    return {
      today: todayTasks.data,
      overdue: overdueTasks.data,
      personal: personalTasks.data,
      work: workTasks.data,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getTasks,
};
