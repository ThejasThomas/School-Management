import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  rollNumber: z.number().min(1, "Roll number must be positive"),
  age: z.number().min(3).max(100),

  contactInfo: z
    .string()
    .min(5, "Contact required")
    .refine((val) => {
      const isEmail = z.string().email().safeParse(val).success;
      const isPhone = /^[0-9]{10}$/.test(val); // 10 digits
      return isEmail || isPhone;
    }, "Enter valid email or 10-digit phone number"),

  classId: z.string().optional(),
});

export type StudentFormData = z.infer<typeof studentSchema>;