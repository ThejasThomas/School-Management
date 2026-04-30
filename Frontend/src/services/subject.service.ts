import { privateAxiosInstance } from "../api/private.axios";

interface GetSubjectsParams {
  page?: number;
  search?: string;
}

export const createSubject = async (name: string) => {
  const res = await privateAxiosInstance.post("/subjects", { name });
  return res.data.data;
};

export const getSubjects = async ({
  page = 1,
  search = "",
}: GetSubjectsParams) => {
  const res = await privateAxiosInstance.get("/subjects", {
    params: {
      page,
      search,
    },
  });

  return res.data.data; 
};

export const deleteSubject = async (id: string) => {
  await privateAxiosInstance.delete(`/subjects/${id}`);
};

export const updateSubject = async (id: string, name: string) => {
  const res = await privateAxiosInstance.put(`/subjects/${id}`, { name });
  return res.data.data;
};