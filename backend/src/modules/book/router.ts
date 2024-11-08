import { Router } from "express";
import {
  addBookController,
  getAllBookController,
  getBookByIdController,
} from "./controller";
import { checkAuth, permitAdmin } from "../auth/controller";

function createBookRouter() {
  const router = Router();
  router.post("/add", checkAuth, permitAdmin, addBookController);
  router.get("/", getAllBookController);
  router.get("/:id", getBookByIdController);

  return router;
}

export const bookRouter = createBookRouter();
