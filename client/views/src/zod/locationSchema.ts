import { z } from "zod";

export const ZodLocationSchema = z.object({
  address: z
    .string()
    .min(1, { message: "This field is required" })
    .min(10, { message: "Are you sure your address is that short?" }),
});

export type LocationSchema = z.infer<typeof ZodLocationSchema>;
