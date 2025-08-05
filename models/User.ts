import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId; // Explicitly declare _id
  userNumber: number;
  username: string;
  password: string;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  userNumber: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
