import { z } from "zod";

export const signupValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "Firstname should be at least 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "Lastname should be at least 3 characters" }),
    email: z.string().email({
      message: "Must be a valid email",
    }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(30, { message: "Password must be at most 30 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one digit",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept Terms and Conditions" }),
    }),
    // loginPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type SignupValidationSchema = z.infer<typeof signupValidationSchema>;
