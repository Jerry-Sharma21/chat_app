import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import User from '../models/user.model';

/**
 * Controller for user registration (signup)
 * @param req - Express Request object
 * @param res - Express Response object
 */

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // Create a new user instance
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();

    // Respond with the created user details
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      profilePic: newUser.profilePic,
    });
  } catch (error: any) {
    console.error('Error in signup controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Controller for user login
 * @param req - Express Request object
 * @param res - Express Response object
 */

export const login = (req: Request, res: Response) => {
  console.log('Login user');
  // Add login logic here
};

/**
 * Controller for user logout
 * @param req - Express Request object
 * @param res - Express Response object
 */

export const logout = (req: Request, res: Response) => {
  console.log('Logout user');
  // Add logout logic here
};
