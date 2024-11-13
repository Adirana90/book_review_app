import { Router } from "express";
import {
  addBookController,
  deleteBookController,
  getAllBookController,
  getBookByIdController,
  updateBookController,
} from "./controller";
import { checkAuth, permitAdmin } from "../middleware";
import { getReviewsByBookIdController } from "../review/controller";

function createBookRouter() {
  const router = Router();
  router.get("/", getAllBookController);
  router.get("/:id", getBookByIdController);
  router.post("/add", checkAuth, permitAdmin, addBookController);
  router.post("/:bookId", checkAuth, permitAdmin, updateBookController);
  router.delete("/:bookId", checkAuth, permitAdmin, deleteBookController);

  return router;
}

export const bookRouter = createBookRouter();
