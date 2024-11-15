import { z } from "zod";

export const documentCreationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name cannot be longer than 100 characters" })
    .regex(/^[A-Za-z0-9 ]+$/, {
      message: "Name can only contain letters, numbers, and spaces",
    }),
});
