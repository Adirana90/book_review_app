import { Router } from "express";
import {
  deleteReviewController,
  getReviewsByBookIdController,
  submitReviewController,
  updateReviewController,
} from "./controller";
import { checkAuth } from "../middleware";

function createReviewRouter() {
  const router = Router();

  router.post("/:bookId", checkAuth, submitReviewController);
  router.post("/update/:reviewId", checkAuth, updateReviewController);
  router.delete("/:reviewId", checkAuth, deleteReviewController);
  router.get("/:bookId", getReviewsByBookIdController);

  return router;
}

export const reviewRouter = createReviewRouter();
