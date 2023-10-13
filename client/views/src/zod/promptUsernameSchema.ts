import { z } from "zod";

export const ZodPromptUsernameSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z]+([-_]?[a-zA-Z0-9]+)$/, {
      message: "Invalid username",
    })
    .min(1, { message: "Username is required" })
    .min(6, { message: "Username is too short" })
    .max(10, { message: "Username must be at least 10 characters" }),
});

export type PromptUsernameSchema = z.infer<typeof ZodPromptUsernameSchema>;
