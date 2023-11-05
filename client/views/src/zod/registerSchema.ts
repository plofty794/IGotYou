import { z } from "zod";

export const ZodRegisterSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password must contain at least 20 characters" })
      .regex(/^([a-zA-Z0-9])+([\W])+$/, {
        message:
          "Password must contain at least one alphanumeric character (a-z, A-Z, or 0-9) followed by at least one non-word character",
      })
      .trim(),
    confirmPassword: z.string().min(1, { message: "Field required" }).trim(),
  })
  .refine((prop) => prop.password === prop.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof ZodRegisterSchema>;
