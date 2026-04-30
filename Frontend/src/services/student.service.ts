import { privateAxiosInstance } from "../api/private.axios";
import type { GetStudentsParams } from "../types/getStudentsPayload";

export const createStudent = async (data: any) => {
  const res = await privateAxiosInstance.post("/students", data);
  return res.data.data;
};

export const getStudents = async ({
  page = 1,
  search = "",
  classId = "",
}: GetStudentsParams) => {
  const res = await privateAxiosInstance.get("/students", {
    params: {
      page,
      search,
      classId,
    },
  });

  return res.data.data;
};

export const deleteStudent = async (id: string) => {
  await privateAxiosInstance.delete(`/students/${id}`);
};

export const updateStudent = async (id: string, payload: any) => {
  const res = await privateAxiosInstance.put(`/students/${id}`, payload);
  return res.data.data;
};