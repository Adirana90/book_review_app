import { NextFunction, Request, Response } from "express";
import { APIError } from "../../utils/error";
import { reviewUserSchema } from "./validation";
import {
  deleteReviewServices,
  getReviewsByBookIdService,
  submitReviewService,
  updateReviewServices,
} from "./service";
export async function submitReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const bookId = req.params.bookId;
    const userId = req.user.id;
    const { success, error, data } = reviewUserSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }

    const review = await submitReviewService({ bookId, userId }, data);

    res.status(200).json({
      message: "review submit successfully",
      isSuccess: true,
      data: review,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // check ownership
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const body = req.body;

    const { success, error, data } = reviewUserSchema.safeParse(body);

    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }

    const review = await updateReviewServices(reviewId, data, {
      userId,
      bookId: "",
    });
    res.status(200).json({
      message: "review update successfully",
      isSuccess: true,
      data: review,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;
    const userRole = req.user.role;

    const review = await deleteReviewServices(reviewId, {
      userId,
      bookId: "",
      userRole,
    });
    res.status(200).json({
      message: "Review delete successfully",
      isSuccess: true,
      data: review,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function getReviewsByBookIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookId = req.params.bookId;

    const reviews = await getReviewsByBookIdService(bookId);
    res.status(200).json({
      message: "Reviews retrieved successfully",
      isSuccess: true,
      data: reviews,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}
