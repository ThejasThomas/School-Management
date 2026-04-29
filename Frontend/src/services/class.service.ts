import { privateAxiosInstance } from "../api/private.axios";

export const createClass = async (name: string) => {
  const res = await privateAxiosInstance.post("/classes", { name });
  return res.data.data;
};

export const getClasses = async () => {
  const res = await privateAxiosInstance.get("/classes");
  return res.data.data;
};