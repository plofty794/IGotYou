import { z } from "zod";

export const ZodRegisterSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username is required" })
      .min(6, { message: "Username is too short" })
      .max(10, { message: "Username must be at least 10 characters" })
      .regex(/^[a-zA-Z]+([-_]?[a-zA-Z0-9]+)$/, {
        message: "Invalid username",
      }),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password is too short" })
      .max(15, { message: "Password must contain atleast 15 characters" })
      .trim(),
    confirmPassword: z.string().min(1, { message: "Field required" }).trim(),
  })
  .refine((prop) => prop.password === prop.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof ZodRegisterSchema>;