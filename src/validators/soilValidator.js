import { z } from "zod";

export const soilSchema = z.object({
  ph: z.number().min(0).max(14),

  moisture: z.number(),

  nitrogen: z.number(),

  phosphorus: z.number(),

  potassium: z.number(),

  location: z.string().min(2)
});