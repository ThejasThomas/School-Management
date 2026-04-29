import mongoose from "mongoose";
import { Class } from "./class.model";

export const createClass = async (data: {
  name: string;
  teacher?: string;
}) => {
  const existing = await Class.findOne({ name: data.name });

  if (existing) {
    throw new Error("Class already exists");
  }

  const newClass = await Class.create({
    name: data.name,
   teacher: data.teacher
      ? new mongoose.Types.ObjectId(data.teacher)
      : undefined, 
    students: [],
  });

  return newClass;
};