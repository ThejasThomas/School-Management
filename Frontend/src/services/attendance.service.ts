import { privateAxiosInstance } from "../api/private.axios";

export const getTeacherStudents = async () => {
  const res = await privateAxiosInstance.get("/attendance/students");
  return res.data.data;
};

export const saveAttendance = async (data: any) => {
  const res = await privateAxiosInstance.post("/attendance", data);
  return res.data.data;
};

export const getAttendanceHistory = async (params: any) => {
  const res = await privateAxiosInstance.get("/attendance/history", {
    params,
  });
  return res.data.data;
};



export const getAttendanceByDate = async (date: string) => {
  const res = await privateAxiosInstance.get("/attendance/by-date", {
    params: { date },
  });

  return res.data.data; 
};


export const getDailyAttendanceStats = async (date: string) => {
  const res = await privateAxiosInstance.get(
    `/attendance/stats?date=${date}`
  );

  return res.data.data;
};
