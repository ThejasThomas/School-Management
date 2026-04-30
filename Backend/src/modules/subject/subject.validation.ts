import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(2, "Subject name must be at least 2 characters"),
});

export const updateSubjectSchema = z.object({
  name: z.string().min(2).optional(),
});