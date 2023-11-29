import { z } from "zod";
import { t } from "i18next";

export const loginValidationSchema = z.object({
  email: z.string().email({
    message: t("validationMessages.validEmail"),
  }),
  password: z
    .string()
    .min(1, { message: t("validationMessages.requirePassword") }),
});

export type LoginValidationSchema = z.infer<typeof loginValidationSchema>;
