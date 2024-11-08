import { NextFunction, Request, Response } from "express";
import { TTokenPayload, verifyToken } from "../utils/auth";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.headers["cookie"];

  if (!cookie || !cookie.includes("token") || !cookie.includes("=")) {
    res.status(401).json({
      message: "cookie not found or invalid",
      data: null,
      isSuccess: false,
    });
    return;
  }

  const token = cookie.split("=")[1];

  if (!token) {
    res.status(401).json({
      message: "token not found or invalid",
      data: null,
      isSuccess: false,
    });
    return;
  }
  // validate the cookie token
  const verifyTokenOutput = verifyToken(token);

  if (!verifyTokenOutput.isValid) {
    res.status(401).json({
      error: verifyTokenOutput.message,
      isSuccess: false,
      data: null,
    });
    return;
  }
  //   console.log("verifyTokenOutput", verifyTokenOutput);

  if (!verifyTokenOutput.payload) {
    res.status(401).json({
      message: "Invalid token",
      isSuccess: false,
      data: null,
    });
    return;
  }
  const payload = verifyTokenOutput.payload as TTokenPayload;

  req.user = {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    role: payload.role,
  };
  next();
}

export async function permitAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== "admin") {
    res.status(401).json({
      message: "Access denial, You need to be admin to get access",
    });
    return;
  }
  next();
}
