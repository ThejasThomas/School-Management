import { Request, Response } from "express";

import { AuthRequest } from "../../middleware/auth.middleware";
import { getAttendanceByDate, getAttendanceHistory, getDailyAttendanceStats, getTeacherStudents, markAttendance } from "./attendence.service";

export const fetchStudentsForTeacher = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const students = await getTeacherStudents(req.user.id as string);

    res.json({ success: true, data: students });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const saveAttendance = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const result = await markAttendance(req.user.id, req.body);

    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchAttendanceHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { page, limit, search, date } = req.query;

    const data = await getAttendanceHistory(req.user.id, {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      search: search || "",
      date,
    });

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchAttendanceByDate = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { date } = req.query;

    const data = await getAttendanceByDate(
      req.user.id,
      date as string
    );

    res.json({
      success: true,
      data,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const fetchDailyStats = async (req: AuthRequest, res: Response) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const data = await getDailyAttendanceStats(
      req.user!.id,
      date as string
    );

    res.json({ success: true, data });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};