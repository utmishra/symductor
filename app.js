const express = require("express");
const cors = require("cors");
const app = express();

// Require routes
const todoistRoute = require("./routes/todoist");
const clickUpRoute = require("./routes/clickUp");
const rescueTimeRoute = require("./routes/rescueTime");
const githubRoute = require("./routes/github");
const goalsRoute = require("./routes/goals");
var indexRouter = require("./routes/index");
var homeRouter = require("./routes/home");

// Use routes
app.use("/api/todoist", todoistRoute);
app.use("/api/clickup", clickUpRoute);
app.use("/api/rescuetime", rescueTimeRoute);
app.use("/api/github", githubRoute);
app.use("/api/goals", goalsRoute);
app.use("/", indexRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
