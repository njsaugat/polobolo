import { z } from "zod";

export const settingsValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Firstname should be at least 3 characters" })
    .max(255, { message: "Firstname should be at most 255 characters" }),
  lastName: z
    .string()
    .min(3, { message: "Lastname should be at least 3 characters" })
    .max(255, { message: "Lastname should be at most 255 characters" }),
  bio: z
    .string()
    .min(10, { message: "Bio should be at least 10 characters" })
    .max(255, { message: "Lastname should be at most 255 characters" }),
  location: z.string().max(100).min(1),
  //   countryCode: z.string().regex(/^\+\d{1,4}$/),
  //   dob: z.coerce.date().refine((date) => date <= new Date(), {
  //     message: "Date of Birth cannot be in the future",
  //   }),
  dob: z.string(),
  phoneNumber: z.string().regex(/^\d{9,15}$/),
});

export type SettingsValidationSchema = z.infer<typeof settingsValidationSchema>;
