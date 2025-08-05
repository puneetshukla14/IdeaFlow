import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  fullName?: string;
  affiliation?: string;
  fieldOfResearch?: string;
  username?: string;
  avatar?: string;
  bio?: string;
  keywords?: string;
  orcid?: string;
  website?: string;
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    fullName: String,
    affiliation: String,
    fieldOfResearch: String,
    username: String,
    avatar: String,
    bio: String,
    keywords: String,
    orcid: String,
    website: String,
  },
  { timestamps: true }
);

export default models.User || mongoose.model<IUser>("User", UserSchema);
