import { z } from "zod";

export const createPostValidationSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Post Content should be at least 3 characters." }),
});

export type CreatePostValidationSchema = z.infer<
  typeof createPostValidationSchema
>;
