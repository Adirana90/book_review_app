import { Router } from "express";
import {
  checkAuth,
  loginController,
  logoutController,
  meController,
  registerController,
} from "./controller";

function createAuthRouter() {
  const router = Router();
  router.post("/register", registerController);
  router.post("/login", loginController);
  router.get("/me", checkAuth, meController);
  router.post("/logout", checkAuth, logoutController);
  return router;
}

export const authRouter = createAuthRouter();
