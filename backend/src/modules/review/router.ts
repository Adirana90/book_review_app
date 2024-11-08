import { Router } from "express";
import { checkAuth, permitAdmin } from "../auth/controller";
import {
  deleteReviewController,
  submitReviewController,
  updateReviewController,
} from "./controller";

function createReviewRouter() {
  const router = Router();

  router.post("/:bookId", checkAuth, submitReviewController);
  router.post("/update/:reviewId", checkAuth, updateReviewController);
  router.delete("/:reviewId", checkAuth, deleteReviewController);
  return router;
}

export const reviewRouter = createReviewRouter();
