import mongoose, { Schema, Document, Model } from "mongoose";
export interface IUserData extends Document {
  username: string;
  profile: {
    fullName: string;
    email: string;
    bio: string;
    avatar: string;
    keywords: string;
    orcid: string;
    website: string;
    affiliation: string;
    fieldOfResearch: string;
    
  };
}
const UserDataSchema: Schema<IUserData> = new Schema(
  {
    username: { type: String, required: true, unique: true },
    profile: {
      fullName: { type: String, default: "" },
      email: { type: String, default: "" },
      bio: { type: String, default: "" },
      avatar: { type: String, default: "" },
      keywords: { type: String, default: "" },
      orcid: { type: String, default: "" },
      website: { type: String, default: "" },
      affiliation: { type: String, default: "" },
      fieldOfResearch: { type: String, default: "" },
    },
  },
  { timestamps: true }
);
const UserData: Model<IUserData> =
  mongoose.models.UserData || mongoose.model<IUserData>("UserData", UserDataSchema);
export default UserData;
vsssso