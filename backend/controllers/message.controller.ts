import { Request as ExpressRequest, Response } from 'express';

import { IUser } from '../models/user.model';
import Message from '../models/message.model.';
import Conversation from '../models/conversation.model';

// Extend the Request object to include the entire User object in the user property
export interface CustomRequest extends ExpressRequest {
  user?: IUser;
}

/**
 * Controller function to send a message.
 * @param req - Express Request object.
 * @param res - Express Response object.
 */

export const sendMessage = async (req: CustomRequest, res: Response) => {
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
 * Controller function to get messages.
 * @param req - Express Request object.
 * @param res - Express Response object.
 */

export const getMessages = async (req: CustomRequest, res: Response) => {
  try {
    // Extract userToChatId from request params and senderId from authenticated user
    const { id: userToChatId } = req.params;
    const senderId = req.user?._id;

    // Find the conversation between sender and userToChatId and populate messages
    const conversation = await Conversation.findOne({
      participants: [senderId, userToChatId],
    }).populate('messages');

    // If no conversation exists, respond with an empty array
    if (!conversation) {
      return res.status(200).json([]);
    }

    // Extract messages from the conversation
    const messages = conversation.messages;

    // Respond with the messages
    res.status(200).json(messages);
  } catch (error: any) {
    // Handle errors
    console.error('Error in getMessages controller: ', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
