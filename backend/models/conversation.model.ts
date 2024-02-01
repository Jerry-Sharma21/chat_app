import { Document, Schema, model, Types } from 'mongoose';

interface IConversation extends Document {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
}

const conversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  { timestamps: true },
);

const Conversation = model<IConversation>('Conversation', conversationSchema);

export default Conversation;
