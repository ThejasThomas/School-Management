import { Request, Response } from "express";
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "./student.service";

export const addStudent = async (req: Request, res: Response) => {
  try {
    const student = await createStudent(req.body);

    res.status(201).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchStudents = async (req: Request, res: Response) => {
  try {
    const students = await getStudents();

    res.status(200).json({
      success: true,
      data: students,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const editStudent = async (req: Request, res: Response) => {
  try {
    const student = await updateStudent(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeStudent = async (req: Request, res: Response) => {
  try {
    await deleteStudent(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Student deleted",
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};