import * as z from "zod";

export const SignUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  password: z.string(),
  confirmPassword: z.string(),
});
