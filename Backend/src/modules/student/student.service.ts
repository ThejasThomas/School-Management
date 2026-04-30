import mongoose from "mongoose";
import { Student, IStudent } from "./student.model";

export const createStudent = async (data: Partial<IStudent>) => {
  return await Student.create({
    ...data,
    classId: data.classId
      ? new mongoose.Types.ObjectId(data.classId as any)
      : undefined,
  });
};


export const getStudents = async ({
  page = 1,
  limit = 5,
  search = "",
  classId,
}: any) => {
  const filter: any = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (classId) {
    filter.classId = classId;
  }

  const skip = (page - 1) * limit;

  const [students, total] = await Promise.all([
    Student.find(filter)
      .populate("classId", "name")
      .skip(skip)
      .limit(limit),
    Student.countDocuments(filter),
  ]);

  return {
    students,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateStudent = async (id: string, data: Partial<IStudent>) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudent = async (id: string) => {
  return await Student.findByIdAndDelete(id);
};