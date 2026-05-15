// MAIN SERVER FILE
// Express server with MongoDB integration

import express from 'express';
import dotenv from 'dotenv';
import Database from './src/config/database.js';
import routes from './src/routes/index.js';
import ApiResponse from './src/utils/apiResponse.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/v1', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json(ApiResponse.error('Route not found', 404));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json(ApiResponse.error('Internal server error', 500));
});

// Start server
async function startServer() {
  try {
    // Connect to database
    await Database.connect();

    app.listen(PORT, () => {
      console.log('\n=================================');
      console.log('🚀 Professional REST API with MongoDB');
      console.log(`📍 http://localhost:${PORT}`);
      console.log(`📚 Database: MongoDB with Mongoose`);
      console.log('=================================\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🔌 Shutting down gracefully...');
  await Database.disconnect();
  process.exit(0);
});