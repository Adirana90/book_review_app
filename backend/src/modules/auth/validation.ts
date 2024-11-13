import { z } from "zod";

export const userRegisterSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(15),
  password: z.string().min(6).max(15),
  role: z.enum(["admin", "user"]).default("user"),
});
export type TuserRegisterSchema = z.TypeOf<typeof userRegisterSchema>;

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(15),
});
export type TuserLoginSchema = z.TypeOf<typeof userLoginSchema>;

export const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.string(),
});
export type TupdateRoleSchema = z.TypeOf<typeof updateRoleSchema>;
