import { error } from "console";
import { APIError } from "../../utils/error";
import { bookModel, reviewModel } from "./model";
import { TaddBookSchema, TreviewUserSchema } from "./validation";

export async function bookService(input: TaddBookSchema) {
  const { title, author, description, published_at, genres } = input;
  const book = await bookModel.findOne({ title });
  if (book) {
    throw APIError.conflict("Book already exist");
  }

  const newBook = new bookModel({
    title,
    author,
    description,
    published_at,
    genres,
  });
  await newBook.save();
  return newBook;
}

export async function getAllBookService() {
  const book = await bookModel.find();
  return book;
}

export async function getBookByIdService(_id: string) {
  const book = await bookModel.findById(_id);
  return book;
}

export async function submitReviewService(input: TreviewUserSchema) {
  const { userId, bookId, rating, reviewText } = input;
  const review = await reviewModel.findOne({ bookId });
}
