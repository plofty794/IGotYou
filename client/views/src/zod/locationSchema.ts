import { z } from "zod";

export const ZodLocationSchema = z.object({
  address: z
    .string()
    .min(5, { message: "Invalid address" })
    .max(20, { message: "Address must be at least 20 characters" }),
  city: z
    .string()
    .min(3, { message: "Invalid city" })
    .max(20, { message: "City must be at least 20 characters" }),
  state: z
    .string()
    .min(3, { message: "Invalid state" })
    .max(15, { message: "State must be at least 15 characters" }),
  postal_code: z
    .string()
    .min(3, { message: "Invalid postal code" })
    .max(4, { message: "Postal code must be at least 4 characters" }),
});

export type LocationSchema = z.infer<typeof ZodLocationSchema>;
