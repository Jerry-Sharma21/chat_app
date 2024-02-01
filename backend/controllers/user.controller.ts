import { Response } from 'express';

import User from '../models/user.model';
import { CustomRequest } from './message.controller';

/**
 * Controller function to get users for the sidebar, excluding the logged-in user.
 * @param req - Express Request object.
 * @param res - Express Response object.
 */

export const getUsersForSidebar = async (req: CustomRequest, res: Response) => {
  try {
    // Get the ID of the logged-in user
    const loggedInUserId = req.user?._id;

    // Find users excluding the logged-in user, and exclude the password field
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select('-password');

    // Respond with the filtered users
    res.status(200).json(filteredUsers);
  } catch (error: any) {
    // Handle errors
    console.error('Error in getUsersForSidebar: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
