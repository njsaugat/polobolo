import { t } from "i18next";
import { z } from "zod";
export const createPostValidationSchema = z.object({
  content: z.string().min(3, { message: t("validationMessages.postContent") }),
});

export type CreatePostValidationSchema = z.infer<
  typeof createPostValidationSchema
>;
