import express from 'express';

let app = express();

import todoistRoutes from './routes/todoistRoutes';

app.use('/api', todoistRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;
