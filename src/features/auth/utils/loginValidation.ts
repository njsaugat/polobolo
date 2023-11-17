import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email({
    message: "Must be a valid email",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginValidationSchema = z.infer<typeof loginValidationSchema>;
