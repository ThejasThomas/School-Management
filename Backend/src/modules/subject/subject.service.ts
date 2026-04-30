import mongoose from "mongoose";
import { Subject } from "./subject.model";

export const createSubject = async (data: { name: string }) => {
  const exists = await Subject.findOne({ name: data.name.trim() });

  if (exists) throw new Error("Subject already exists");

  return await Subject.create({
    name: data.name.trim(),
  });
};

export const getSubjects = async ({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const filter: any = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const [subjects, total] = await Promise.all([
    Subject.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Subject.countDocuments(filter),
  ]);

  return {
    subjects,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateSubject = async (
  id: string,
  data: { name?: string }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid subject id");
  }

  if (data.name) {
    const exists = await Subject.findOne({
      name: data.name.trim(),
      _id: { $ne: id },
    });

    if (exists) throw new Error("Subject already exists");
  }

  return await Subject.findByIdAndUpdate(
    id,
    {
      ...(data.name && { name: data.name.trim() }),
    },
    { new: true }
  );
};

export const deleteSubject = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid subject id");
  }

  return await Subject.findByIdAndDelete(id);
};