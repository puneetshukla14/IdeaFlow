import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  clerkId: string;
  fullName: string;
  affiliation?: string;
  fieldOfResearch: string;
  username: string;
  avatar: string;
  bio?: string;
  keywords?: string;
  orcid?: string;
  website?: string;
}

const AccountSchema: Schema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    affiliation: { type: String, default: "" }, // Optional
    fieldOfResearch: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    bio: { type: String, default: "" },
    keywords: { type: String, default: "" }, // Optional
    orcid: { type: String, default: "" },
    website: { type: String, default: "" }, // Optional
  },
  { timestamps: true }
);

export default mongoose.models.Account ||
  mongoose.model<IAccount>("Account", AccountSchema);
