import { APIError } from "../../utils/error";
import { reviewModel } from "./model";
import { TReviewCtx, TreviewUserSchema } from "./validation";

export async function submitReviewService(
  ctx: TReviewCtx,
  input: TreviewUserSchema
) {
  const { rating, reviewText } = input;

  const newReview = new reviewModel({
    bookId: ctx.bookId,
    userId: ctx.userId,
    rating,
    reviewText,
  });
  await newReview.save();
  return newReview;
}

export async function updateReviewServices(
  _id: string,
  input: TreviewUserSchema,
  ctx: TReviewCtx
) {
  const review = await reviewModel.findById(_id);
  if (!review) {
    throw APIError.notFound("Review not found");
  }

  // check whether the review written by the user
  if (review.userId?.toString() !== ctx.userId) {
    throw APIError.unauthorized(
      "You can't update the review, you are not authorized"
    );
  }

  const { reviewText, rating } = input;

  review.reviewText = reviewText;
  review.rating = rating;

  await review.save();

  return review;
}

export async function deleteReviewServices(_id: string, ctx: TReviewCtx) {
  const review = await reviewModel.findById(_id);
  if (!review) {
    throw APIError.notFound("Review not found");
  }

  // check whether the review belong to the user
  if (review.userId?.toString() !== ctx.userId && ctx.userRole === "user") {
    throw APIError.unauthorized(
      "You can't delete this review, you are not auhtorized"
    );
  }

  await reviewModel.deleteOne({ _id: _id });
  return review;
}

export async function getReviewsByBookIdService(bookId: string) {
  const reviews = await reviewModel.find({
    bookId,
  });
  return reviews;
}
