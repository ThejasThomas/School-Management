import { Student } from "../student/student.model";
import { User } from "../user/user.model";
import { Class } from "../class/class.model";

export const getDashboardStats = async () => {
  console.log("brooo")
  const [totalStudents, totalTeachers, totalClasses] =
    await Promise.all([
      Student.countDocuments(),
      User.countDocuments({ role: "teacher" }),
      Class.countDocuments(),
    ]);
console.log("heyyy")
  const studentsPerClass = await Student.aggregate([
    {
      $group: {
        _id: "$classId",
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "classes",
        localField: "_id",
        foreignField: "_id",
        as: "class",
      },
    },
    {
      $unwind: "$class",
    },
    {
      $project: {
        className: "$class.name",
        count: 1,
      },
    },
  ]);
  console.log("students",studentsPerClass)

  const teacherStatus = await User.aggregate([
    {
      $match: { role: "teacher" },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    stats: {
      totalStudents,
      totalTeachers,
      totalClasses,
    },
    charts: {
      studentsPerClass,
      teacherStatus,
    },
  };
};