import { z } from "zod";

export const ZodRegisterSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .max(15, { message: "Password must contain atleast 15 characters" })
      .trim(),
    confirmPassword: z.string().min(1, { message: "Field required" }).trim(),
  })
  .refine((prop) => prop.password === prop.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof ZodRegisterSchema>;
