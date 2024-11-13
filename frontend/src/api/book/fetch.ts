import { env } from "../../config";

export type TBook = {
  _id: string;
  title: string;
  author: string;
  genres: string;
  description: string;
  published_at: string;
  created_at: string;
};

export type TaddBookInput = {
  title: string;
  author: string;
  genres: string;
  description: string;
  published_at: string;
};

export type TaddBookOutput = {
  isSuccess: boolean;
  message: string;
  data: TBook;
};

export async function addBook(input: TaddBookInput): Promise<TaddBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: input.title,
      author: input.author,
      genres: input.genres,
      description: input.description,
      published_at: input.published_at,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export type TUpdateBookInput = {
  bookId: string;
  title: string;
  author: string;
  genres: string;
  description: string;
  published_at: string;
};

export type TUpdateBookOutput = {
  message: string;
  isSuccess: boolean;
  data: TBook;
};

export async function updateBook(
  input: TUpdateBookInput
): Promise<TUpdateBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/${input.bookId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
