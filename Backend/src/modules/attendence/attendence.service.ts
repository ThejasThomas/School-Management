import { User } from "../user/user.model";
import { Attendance } from "./attendence.model";

export const getTeacherStudents = async (teacherId: string) => {
  const teacher = await User.findById(teacherId);

  if (!teacher || !teacher.classId) {
    throw new Error("Teacher has no class assigned");
  }

  const students = await (
    await import("../student/student.model")
  ).Student.find({ classId: teacher.classId });

  return students;
};

export const markAttendance = async (
  teacherId: string,
  data: {
    date: string;
    records: {
      studentId: string;
      status: "present" | "absent";
    }[];
  }
) => {
  const teacher = await User.findById(teacherId);

  if (!teacher?.classId) {
    throw new Error("No class assigned");
  }

  const operations = data.records.map((rec) => ({
    updateOne: {
      filter: {
        studentId: rec.studentId,
        date: data.date,
      },
      update: {
        studentId: rec.studentId,
        classId: teacher.classId,
        status: rec.status,
        date: data.date,
      },
      upsert: true, 
    },
  }));

  await Attendance.bulkWrite(operations);

  return { message: "Attendance saved" };
};


export const getAttendanceHistory = async (
  teacherId: string,
  {
    page = 1,
    limit = 10,
    search = "",
    date,
  }: any
) => {
  const teacher = await User.findById(teacherId);

  if (!teacher?.classId) {
    throw new Error("No class assigned");
  }

  const filter: any = {
    classId: teacher.classId,
  };

  if (date) {
    filter.date = date;
  }

  const skip = (page - 1) * limit;

  let query = Attendance.find(filter)
    .populate("studentId", "name rollNumber")
    .sort({ date: -1 });

  const records = await query.skip(skip).limit(limit);

  const filtered = search
    ? records.filter((r: any) =>
        r.studentId?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : records;

  const total = await Attendance.countDocuments(filter);

  return {
    records: filtered,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getAttendanceByDate = async (
  teacherId: string,
  date: string
) => {
  const teacher = await User.findById(teacherId);

  if (!teacher?.classId) {
    throw new Error("No class assigned");
  }

  return await Attendance.find({
    classId: teacher.classId,
    date: date,
  }).populate("studentId");
};


export const getDailyAttendanceStats = async (
  teacherId: string,
  date: string
) => {
  const teacher = await User.findById(teacherId);

  if (!teacher?.classId) {
    throw new Error("Teacher has no class assigned");
  }

  const records = await Attendance.find({
    classId: teacher.classId,
    date,
  });

  const total = records.length;
  const present = records.filter(r => r.status === "present").length;
  const absent = total - present;

  return {
    date,
    total,
    present,
    absent,
    percentage: total ? ((present / total) * 100).toFixed(2) : "0",
  };
};