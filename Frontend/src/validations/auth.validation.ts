import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),

  email: z
    .string()
    .email("Invalid email format"),

 password: z
  .string()
  .min(8, "Password is too short (min 8 characters)")
  .regex(/[A-Z]/, "Password must contain uppercase letter")
  .regex(/[a-z]/, "Password must contain lowercase letter")
  .regex(/[0-9]/, "Password must contain a number")
  .regex(/[@$!%*?&]/, "Password must contain a special character"),
});

export type SignupFormData = z.infer<typeof signupSchema>;