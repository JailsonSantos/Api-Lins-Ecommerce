import { Schema, model, Document } from 'mongoose';

interface UserProps extends Document {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  _doc?: any;
}

const userSchema = new Schema<UserProps>(
  {
    username: {
      type: String,
      required: true,
      unique: true
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
  }, { timestamps: true }
);

export const User = model<UserProps>('User', userSchema);