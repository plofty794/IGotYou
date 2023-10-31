import { z } from "zod";

export const ZodEmailSchema = z.object({
  email: z.string().min(1, { message: "This field is required" }).email(),
});

export type EmailSchema = z.infer<typeof ZodEmailSchema>;
