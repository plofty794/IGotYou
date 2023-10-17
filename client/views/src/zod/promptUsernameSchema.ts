import { z } from "zod";

export const ZodPromptUsernameSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Invalid username" })
    .min(4, { message: "Username too short" })
    .max(10, { message: "Username must be at least 10 characters" }),
});

export type PromptUsernameSchema = z.infer<typeof ZodPromptUsernameSchema>;
