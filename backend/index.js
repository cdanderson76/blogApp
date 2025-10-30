import express from 'express';

const app = express();
const PORT = 5000;

app.use('/', (req, res) => {
  res.send('Server is running...')
});

app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
})