import mongoose from "mongoose";
import { User } from "../user/user.model";

export const getTeachers = async ({
  page = 1,
  limit = 5,
  search = "",
  status,
}: any) => {
  const filter: any = { role: "teacher" };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (status) {
    filter.status = status;
  }

  const skip = (page - 1) * limit;

  const [teachers, total] = await Promise.all([
    User.find(filter)
      .populate("classId", "name")
      .populate("subjectId","name")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),

    User.countDocuments(filter),
  ]);

  return {
    teachers,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateTeacher = async (id: string, data: any) => {
  const updateData: any = {
    subjectId: data.subjectId
      ? new mongoose.Types.ObjectId(data.subjectId)
      : undefined,

    classId: data.classId
      ? new mongoose.Types.ObjectId(data.classId)
      : undefined,

    experience: data.experience,
    contactInfo: data.contactInfo,
    qualification: data.qualification,

    isApproved: true,
    status: "active",
  };

  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

export const updateTeacherStatus = async (
  id: string,
  status: "active" | "blocked"
) => {
  return await User.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};

export const deleteTeacher = async (id: string) => {
  return await User.findByIdAndDelete(id);
};