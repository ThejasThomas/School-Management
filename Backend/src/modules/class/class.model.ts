import mongoose, { Document, Schema } from "mongoose";

export interface IClass extends Document {
  name: string;
  teacher?: mongoose.Types.ObjectId;
  students: mongoose.Types.ObjectId[];
}

const classSchema = new Schema<IClass>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  { timestamps: true }
);

export const Class = mongoose.model<IClass>("Class", classSchema);