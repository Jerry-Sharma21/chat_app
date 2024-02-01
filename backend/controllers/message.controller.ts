import { Request, Response } from 'express';

import Message from '../models/message.model.';
import Conversation from '../models/conversation.model';

/**
 * Controller function to send a message.
 * @param req - Express Request object.
 * @param res - Express Response object.
 */

export const sendMessage = async (req: Request, res: Response) => {
  try {
    // Extract message and receiverId from request body and params
    const { message } = req.body;
    const { id: receiverId } = req.params;

    // Get senderId from authenticated user
    const senderId = req.user?._id;

    // Find or create a conversation between sender and receiver
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      // Create a new conversation if not exists
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create a new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add the message to the conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // Use Promise.all to parallelize saving both the conversation and the new message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Respond with the created message
    res.status(201).json(newMessage);
  } catch (error: any) {
    // Handle errors
    console.error('Error in sendMessage controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Controller function to get messages (placeholder, needs implementation).
 * @param req - Express Request object.
 * @param res - Express Response object.
 */

export const getMessages = async (req: Request, res: Response) => {
  try {
    // Implementation for getting messages will be added here
  } catch (error: any) {
    // Handle errors
    console.error('Error in getMessages controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
