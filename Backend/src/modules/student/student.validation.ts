import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  rollNumber: z.number().min(1, "Roll number must be positive"),
  age: z.number().min(3).max(100),
  contactInfo: z.string().min(5, "Contact info required"),
});

export const updateStudentSchema = z.object({
  name: z.string().min(2).optional(),
  rollNumber: z.number().min(1).optional(),
  age: z.number().min(3).max(100).optional(),
  contactInfo: z.string().optional(),
});