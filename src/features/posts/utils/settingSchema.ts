import { t } from "i18next";
import { z } from "zod";

export const settingsValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: t("validationMessages.firstName") })
    .max(255, { message: t("validationMessages.maxFirstName") }),
  lastName: z
    .string()
    .min(3, { message: t("validationMessages.lastName") })
    .max(255, { message: t("validationMessages.maxLastName") }),
  bio: z
    .string()
    .min(10, { message: t("validationMessages.bio") })
    .max(255, { message: t("validationMessages.maxBio") }),
  location: z.string().max(100).min(1),
  dob: z.string(),
  phoneNumber: z.string().regex(/^\d{9,15}$/),
});

export type SettingsValidationSchema = z.infer<typeof settingsValidationSchema>;
