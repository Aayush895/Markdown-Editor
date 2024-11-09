import { z } from "zod";

export const userRegisterationSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(7)
})
