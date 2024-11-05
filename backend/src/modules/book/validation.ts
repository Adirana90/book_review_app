import { z } from "zod";

export const addBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string(),
  genres: z.string(),
  published_at: z.string(),
});
export type TaddBookSchema = z.TypeOf<typeof addBookSchema>;

export const reviewUserSchema = z.object({
  bookId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  reviewText: z.string(),
});
export type TreviewUserSchema = z.TypeOf<typeof reviewUserSchema>;
