import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import User, { IUser } from '../models/user.model';

/**
 * Middleware to protect routes by verifying the JWT token.
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Retrieve the JWT token from the request cookies
    const token = req.cookies.jwt;

    // Check if the token is not provided
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Unauthorized - No Token Provided' });
    }

    // Verify the JWT token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // Check if the token is invalid
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }

    // Find the user by the user ID from the decoded token (excluding the password field)
    const user = await User.findById(decoded.userId).select('-password');

    // Check if the user is not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach the user object to the request for use in subsequent middleware/routes
    req.user = user;

    // Continue to the next middleware or route
    next();
  } catch (error: any) {
    // Handle errors and send an internal server error response
    console.log('Error in protectRoute middleware:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default protectRoute;
