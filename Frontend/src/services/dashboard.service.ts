import { privateAxiosInstance } from "../api/private.axios";

export const getDashboard = async () => {
  const res = await privateAxiosInstance.get("/admin/dashboard");
  console.log("ressss",res)
  return res.data.data;
};