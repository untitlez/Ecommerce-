import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});
export type LoginType = z.infer<typeof LoginSchema>;

export function validateLogin(data: unknown) {
  const parsed = LoginSchema.safeParse(data);
  if (!parsed.success) throw parsed.error;
  return parsed.data;
}
