import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rollNumber: z.number().min(1, "Roll number must be positive"),
  age: z.number().min(3).max(100),
  contactInfo: z.string().min(5, "Contact required"),
});

export type StudentFormData = z.infer<typeof studentSchema>;