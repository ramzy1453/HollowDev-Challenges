import { z } from "zod";

const userSchema = z.object({
  lastName: z.string().min(1),
  firstName: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["normal", "admin"]),
});
