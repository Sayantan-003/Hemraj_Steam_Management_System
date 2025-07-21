import express from 'express';
import dotenv from 'dotenv-flow';
import connectDB from './config/db.js';
import dailyLogRoutes from './routes/dailyLogRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/daily-logs', dailyLogRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
