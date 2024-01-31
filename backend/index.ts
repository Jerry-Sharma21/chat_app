import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import authRoutes from './routes/auth.routes';
import connectToMongoDB from './database/connectToMongoDB';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// To parse the incoming requests with JSON payloads (from req.body)
app.use(express.json());

// Define a simple route for checking server status
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is ready' });
});

// Use authentication routes under the '/api/auth' path
app.use('/api/auth', authRoutes);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
