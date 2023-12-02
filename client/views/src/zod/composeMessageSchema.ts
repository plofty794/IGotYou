import { z } from "zod";

export const ZodSearchUsernameSchema = z.object({
  message: z
    .string()
    .min(1, { message: "Message is required" })
    .max(200, { message: "Message cannot exceed 200 characters" }),
});

export type SearchUsernameSchema = z.infer<typeof ZodSearchUsernameSchema>;
