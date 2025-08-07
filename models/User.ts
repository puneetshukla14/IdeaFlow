import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  userNumber: number;
  username: string;
  password: string;
  isPremium: boolean;
  premiumExpiresAt: Date;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
  userNumber: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isPremium: { type: Boolean, default: true },
  premiumExpiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // 30 days from now
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
