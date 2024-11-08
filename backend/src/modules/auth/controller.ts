import { NextFunction, Request, Response } from "express";
import { userLoginSchema, userRegisterSchema } from "./validation";
import {
  createUserservice,
  getUserById,
  loginService,
  updateUserRoleservice,
} from "./service";
import { APIError } from "../../utils/error";
import { TTokenPayload, verifyToken } from "../../utils/auth";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { success, error, data } = userRegisterSchema.safeParse(req.body);
    // console.log("data:", data);
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
    const userData = await createUserservice(data);

    res.status(200).json({
      message: "your account has been created successifully",
      isSuccess: true,
      data: {
        id: userData._id,
        email: userData.email,
        username: userData.username,
        role: userData.role,
      },
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    console.log("body:", body);
    const { success, error, data } = userLoginSchema.safeParse(body);
    console.log("data:", data);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Data not found",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }
    const loginOutput = await loginService(data);

    res.cookie("token", loginOutput.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "developer",
    });

    res.status(200).json({
      message: "User logged in successfully",
      isSuccess: true,
      data: loginOutput,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function meController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "User not found",
        isSuccess: false,
        data: null,
      });
      return;
    }

    const user = await getUserById(req.user.id);
    console.log("user", user);

    res.status(200).json({
      message: "User retrieved successfully",
      isSuccess: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
      isSuccess: true,
      data: null,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function updateRoleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const role = req.body.role;
    const userId = req.body.userId;

    const userData = await updateUserRoleservice({
      userId: userId || "",
      role: role || "user",
    });

    res.status(200).json({
      message: "role has been updated",
      isSuccess: true,
      data: null,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}
