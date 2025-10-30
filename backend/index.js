import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/', (req, res) => {
  res.send('Server is running...')
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is now running on http://localhost:${PORT}`);
});