import { Request, Response } from "express";
import { createClass } from "./class.service";

export const addClass = async (req: Request, res: Response) => {
  try {
    const newClass = await createClass(req.body);

    res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};