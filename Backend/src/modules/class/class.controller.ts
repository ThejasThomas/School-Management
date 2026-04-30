import { Request, Response } from "express";
import { createClass, getClasses } from "./class.service";

export const addClass = async (req: Request, res: Response) => {
  try {
    console.log("datas",req.body)
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

export const fetchClasses = async (req: Request, res: Response) => {
  try {
    const classes = await getClasses();

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};