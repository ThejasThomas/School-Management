import mongoose from "mongoose";
import { Class } from "./class.model";
import { AppError } from "../../utils/AppError";

export const createClass = async (data: {
  name: string;
  teacher?: string;
}) => {
  const existing = await Class.findOne({ name: data.name });

  if (existing) {
    throw new AppError("Class already exists",400);
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

export const getClasses = async () => {
  return await Class.find().sort({ createdAt: -1 });
};