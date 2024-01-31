import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  fullName: string;
  userName: string;
  password: string;
  gender: 'male' | 'female';
  profilePic: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
