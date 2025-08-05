import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userNumber: number;
  username: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  userNumber: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
