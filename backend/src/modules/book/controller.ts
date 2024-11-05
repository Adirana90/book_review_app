import { NextFunction, Request, Response } from "express";
import { APIError } from "../../utils/error";
import { addBookSchema, reviewUserSchema } from "./validation";
import {
  bookService,
  getAllBookService,
  getBookByIdService,
  submitReviewService,
} from "./service";
import { log } from "console";

export async function addBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const { success, error, data } = addBookSchema.safeParse(body);

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

    const bookData = await bookService(data);
    res.status(200).json({
      message: "Book been added successfully",
      isSuccess: true,
      data: {
        id: bookData._id,
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        genres: bookData.genres,
        publish_at: bookData.published_at,
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

export async function getAllBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getAllBookService();
    res.status(200).json({
      message: "all books",
      isSuccess: true,
      data: result,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

export async function getBookByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    console.log("id:", id);

    if (!id) {
      res.status(400).json({
        message: "id not found",
        data: null,
        isSuccess: false,
      });
      return;
    }

    const result = await getBookByIdService(id);
    console.log("result:", result);

    res.status(200).json({
      message: "book found successfully",
      data: result,
      isSuccess: true,
    });
  } catch (e) {
    if (e instanceof APIError) {
      next(e);
    } else {
      next(new APIError(500, (e as Error).message));
    }
  }
}

// export async function submitReviewController(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   const body = req.body;
//   const { success, error, data } = reviewUserSchema.safeParse(body);
//   if(!success){
//     const errors = error.flatten().fieldErrors;
//       res.status(400).json({
//         message: "Invalid request",
//         data: null,
//         isSuccess: false,
//         errors: errors,
//       });
//       return;
//   }

//   const review = await submitReviewService(data)

//   res.status(200).json({
//     message: "your account has been created successifully",
//     isSuccess: true,
//     data: {
//       id: review._id,
//       userId: review.userId,
//     },
//   });
// }
