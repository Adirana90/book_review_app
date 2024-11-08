import { z } from "zod";

export const reviewUserSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string(),
});
export type TreviewUserSchema = z.TypeOf<typeof reviewUserSchema>;

/*
 * You don't need updateSchema you can use reviewSchema.
 * But if you want you can create updateSchema.
 */
// export const updateReviewSchema = z.object({
//   rating: z.number().min(1).max(5),
//   reviewText: z.string(),
// });
// export type TupdateReviewSchema = z.TypeOf<typeof reviewUserSchema>;

export type TReviewCtx = {
  userId: string;
  bookId: string;
};
