import { env } from "../../config";

export type TReview = {
  username: string;
  user: string;
  _id: string;
  rating: number;
  reviewText: string;
};

export type TAddReviewInput = {
  bookId: string;
  rating: number;
  reviewText: string;
};

export type TAddReviewOutput = {
  message: string;
  isSuccess: boolean;
  data: TReview;
};

export async function addReview(
  input: TAddReviewInput
): Promise<TAddReviewOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/Reviews/${input.bookId}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rating: input.rating,
      reviewText: input.reviewText,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export type TUpdateReviewInput = {
  ReviewId: string;
  rating: number;
  reviewText: string;
};

export type TUpdateReviewOutput = {
  message: string;
  isSuccess: boolean;
  data: TReview;
};

export async function updateReview(
  input: TUpdateReviewInput
): Promise<TUpdateReviewOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/Reviews/update/${input.ReviewId}`,
    {
      method: "Post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export type TDeleteReviewInput = {
  ReviewId: string;
};

export type TDeleteReviewOutput = {
  message: string;
  isSuccess: boolean;
};

export async function deleteReview(
  input: TDeleteReviewInput
): Promise<TDeleteReviewOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/Reviews/${input.ReviewId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export type TGetReviewByIdInput = {
  bookId: string;
};

export type TGetReviewByIdOutput = {
  message: string;
  isSuccess: boolean;
  data: TReview[];
};

export async function getReviewById(
  input: TGetReviewByIdInput
): Promise<TGetReviewByIdOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/Reviews/${input.bookId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}
