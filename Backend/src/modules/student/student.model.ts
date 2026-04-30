import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  name: string;
  rollNumber: number;
  age: number;
  contactInfo: string;
  classId?: mongoose.Types.ObjectId;
}

const studentSchema = new Schema<IStudent>(
  {
    name: { type: String, required: true },
    rollNumber: { type: Number, required: true },
    age: { type: Number, required: true },
    contactInfo: { type: String, required: true },
     classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

export const Student = mongoose.model<IStudent>("Student", studentSchema);