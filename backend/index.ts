import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express, { Request, Response } from 'express';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import messageRoutes from './routes/message.routes';
import connectToMongoDB from './database/connectToMongoDB';

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// To parse the incoming requests with JSON payloads (from req.body)
app.use(express.json());

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Define a simple route for checking server status
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is ready' });
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Start the server and connect to MongoDB
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
