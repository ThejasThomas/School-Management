import { privateAxiosInstance } from "../api/private.axios";

export const getTeachers = async ({
  page,
  search,
  status,
}: any) => {
  const res = await privateAxiosInstance.get("/teachers", {
    params: { page, search, status },
  });

  return res.data.data;
};

export const updateTeacher = async (id: string, data: any) => {
  const res = await privateAxiosInstance.put(`/teachers/${id}`, data);
  return res.data.data;
};

export const updateTeacherStatus = async (
  id: string,
  status: string
) => {
  const res = await privateAxiosInstance.patch(
    `/teachers/${id}/status`,
    { status }
  );
  return res.data.data;
};

export const deleteTeacher = async (id: string) => {
  await privateAxiosInstance.delete(`/teachers/${id}`);
};