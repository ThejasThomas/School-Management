import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher";

  subjectId?: mongoose.Types.ObjectId;
  experience?: number;
  contactInfo?: string;
  qualification?: string;

  classId?: mongoose.Types.ObjectId;

  status: "pending" | "active" | "blocked";
  isApproved: boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "teacher"],
      default: "teacher",
    },

    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    experience: Number,
    contactInfo: String,
    qualification: String,

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },

    status: {
      type: String,
      enum: ["pending", "active", "blocked"],
      default: "pending",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);