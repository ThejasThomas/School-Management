import { Student, IStudent } from "./student.model";

export const createStudent = async (data: Partial<IStudent>) => {
  return await Student.create(data);
};

export const getStudents = async () => {
  return await Student.find();
};

export const updateStudent = async (id: string, data: Partial<IStudent>) => {
  return await Student.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStudent = async (id: string) => {
  return await Student.findByIdAndDelete(id);
};