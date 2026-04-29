import { privateAxiosInstance } from "../api/private.axios";

export const createStudent = async (data: any) => {
  const res = await privateAxiosInstance.post("/students", data);
  return res.data.data;
};

export const getStudents = async () => {
  const res = await privateAxiosInstance.get("/students");
  return res.data.data;
};

export const deleteStudent = async (id: string) => {
  await privateAxiosInstance.delete(`/students/${id}`);
};