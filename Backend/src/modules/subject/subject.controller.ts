import { Request, Response } from "express";
import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} from "./subject.service";
import {
  createSubjectSchema,
  updateSubjectSchema,
} from "./subject.validation";

export const addSubject = async (req: Request, res: Response) => {
  try {
    const parsed = createSubjectSchema.parse(req.body);

    const subject = await createSubject(parsed);

    res.status(201).json({
      success: true,
      data: subject,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const fetchSubjects = async (req: Request, res: Response) => {
  try {
    const { page, limit, search } = req.query;

    const result = await getSubjects({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search: (search as string) || "",
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const editSubject = async (req: Request, res: Response) => {
  try {
    const parsed = updateSubjectSchema.parse(req.body);

    const subject = await updateSubject(req.params.id as string, parsed);

    res.status(200).json({
      success: true,
      data: subject,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeSubject = async (req: Request, res: Response) => {
  try {
    await deleteSubject(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Subject deleted",
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};