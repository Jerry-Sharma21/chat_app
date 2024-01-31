import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import User from '../models/user.model';
import generateToken from '../utils/generateToken';

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

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      // Respond with the created user details
      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(500).json({ error: 'Invalid User Data' });
    }
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

export const login = async (req: Request, res: Response) => {
  try {
    const { userName, password } = req.body;

    // Finding user by username in the database
    const user = await User.findOne({ userName });

    // Checking if the user exists and comparing the passwords
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || '',
    );

    // Handling invalid username or password
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid Username or Password' });
    }

    // Generating and setting JWT token in the cookie
    generateToken(user._id, res);

    // Sending a success response with relevant user information
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    // Handling errors and sending an internal server error response
    console.error('Error in login controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Controller for user logout
 * @param req - Express Request object
 * @param res - Express Response object
 */

export const logout = (req: Request, res: Response) => {
  try {
    // Clearing the JWT cookie by setting its maxAge to 0
    res.cookie('jwt', '', { maxAge: 0 });

    // Sending a success response for successful logout
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    // Handling errors and sending an internal server error response
    console.error('Error in logout controller:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
