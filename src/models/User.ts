import mongoose, { model, Schema } from "mongoose";

export interface IUser {
  _id: string;
  login: string;
  password: string;
  is_admin: boolean;
}

export const SUser = new Schema<IUser>({
  _id: { type: mongoose.Types.ObjectId, auto: true },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    hide: true,
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
});

export const User = model<IUser>("User", SUser);
