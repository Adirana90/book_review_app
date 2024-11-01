import { z } from "zod";

export const addBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  genres: z.string(),
  published_at: z.string(),
});
export type TaddBookSchema = z.TypeOf<typeof addBookSchema>;
