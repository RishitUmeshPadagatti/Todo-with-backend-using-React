import { z } from "zod";

const usernameSchema = z
  .string()
  .min(4, "Username must be at least 4 characters long")
  .max(25, "Username cannot exceed 25 characters")
  .regex(/^\S+$/, "Username cannot contain spaces");

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export { usernameSchema, passwordSchema };
