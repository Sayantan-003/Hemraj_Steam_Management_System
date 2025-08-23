import express from 'express';
import dotenv from 'dotenv-flow';
import connectDB from './config/db.js';
import dailyLogRoutes from './routes/dailyLogRoutes.js';
import solventRoutes from './routes/solvent.routes.js';
import prepRoutes from './routes/prep.routes.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/daily-logs', dailyLogRoutes);
app.use('/api/solvent', solventRoutes);
app.use('/api/prep', prepRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start server only after DB connection
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB connected successfully`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});