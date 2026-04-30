import { Request, Response } from "express";
import { getDashboardStats } from "./dashboard.service";

export const fetchDashboard = async (req: Request, res: Response) => {
  try {
    console.log("heyy")
    const data = await getDashboardStats();
    console.log("dataaa",data)

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};