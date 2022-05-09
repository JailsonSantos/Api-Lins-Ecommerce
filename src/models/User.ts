import { Schema, model, Document } from 'mongoose';

interface UserProps extends Document {
  username: string;
  occupation: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  img: string;
  _doc?: any;
}

const userSchema = new Schema<UserProps>(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    occupation: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String
    },
  }, { timestamps: true }
);

export const User = model<UserProps>('User', userSchema);