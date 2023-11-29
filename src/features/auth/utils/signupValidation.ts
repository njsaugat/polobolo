import { z } from "zod";
import { t } from "i18next";
export const signupValidationSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: t("validationMessages.firstName") }),
    lastName: z.string().min(3, { message: t("validationMessages.lastName") }),
    email: z.string().email({
      message: t("validationMessages.validEmail"),
    }),
    password: z
      .string()
      .min(8, { message: t("validationMessages.minPassword") })
      .max(30, { message: t("validationMessages.maxPassword") })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: t("validationMessages.passwordRequirement"),
      }),
    confirmPassword: z
      .string()
      .min(1, { message: t("validationMessages.confPassReq") }),
    terms: z.literal(true, {
      errorMap: () => ({ message: t("validationMessages.acceptTOC") }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: t("validationMessages.matchPassword"),
  });

export type SignupValidationSchema = z.infer<typeof signupValidationSchema>;
