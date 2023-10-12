import { z } from "zod";

export const createPostValidationSchema = z.object({
  //   tag: z
  //     .string()
  //     .min(3, { message: "Tag should be at least 3 characters." })
  //     .max(25, { message: "Tag should be at mst 25 characters." }),
  content: z
    .string()
    .min(3, { message: "Post Content should be at least 3 characters." }),
  //   formData: z.unknown(),
  // formData: z.object({
  // }),
});

export type CreatePostValidationSchema = z.infer<
  typeof createPostValidationSchema
>;
