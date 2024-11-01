import { Router } from "express";
import {
  addBookController,
  getAllBookController,
  getBookByIdController,
} from "./controller";

function createBookRouter() {
  const router = Router();
  router.post("/add", addBookController);
  router.get("/", getAllBookController);
  router.get("/:id", getBookByIdController);
  return router;
}

export const bookRouter = createBookRouter();
