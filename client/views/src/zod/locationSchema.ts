import { z } from "zod";

export const ZodLocationSchema = z.object({
  address: z.string().min(1, { message: "This field is required" }).max(4, {
    message: "Invalid zip code (eg. 4010 for Pila, 4010 Laguna, Philippines)",
  }),
});

export type LocationSchema = z.infer<typeof ZodLocationSchema>;
