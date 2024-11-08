import { error } from "console";
import { APIError } from "../../utils/error";
import { bookModel } from "./model";
import { TaddBookSchema } from "./validation";

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

export async function updateBookServices(
  bookId: string,
  input: TaddBookSchema
) {
  const { title, author, description, genres, published_at } = input;
  const book = await bookModel.findById(bookId);
  if (!book) {
    throw APIError.notFound("book does not exist");
  }
  book.title = title;
  book.author = author;
  book.description = description;
  book.genres = genres;
  book.published_at = published_at;

  // await book.replaceOne({ _id: bookId });
  await book.save();
  return book;
}

export async function deleteBookServices(id: string) {
  const book = await bookModel.findByIdAndDelete(id);
  if (!book) {
    throw APIError.notFound("book not found");
  }
  return book;
}
