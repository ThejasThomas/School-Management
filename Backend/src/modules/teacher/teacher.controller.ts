import { Request, Response } from "express";
import {
  getTeachers,
  updateTeacher,
  updateTeacherStatus,
  deleteTeacher,
} from "./teacher.service";

export const fetchTeachers = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, status } = req.query;

    const result = await getTeachers({
      page: Number(page) || 1,
      limit: Number(limit) || 5,
      search: search || "",
      status,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const editTeacher = async (req: Request, res: Response) => {
  try {
    const teacher = await updateTeacher(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const changeTeacherStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.body;

    const teacher = await updateTeacherStatus(
      req.params.id as string,
      status
    );

    res.status(200).json({
      success: true,
      data: teacher,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeTeacher = async (req: Request, res: Response) => {
  try {
    await deleteTeacher(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Teacher deleted",
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};