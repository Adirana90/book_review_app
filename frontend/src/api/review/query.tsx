import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReview,
  deleteReview,
  getReviewById,
  TAddReviewInput,
  TAddReviewOutput,
  TDeleteReviewInput,
  TDeleteReviewOutput,
  TGetReviewByIdOutput,
  TUpdateReviewInput,
  TUpdateReviewOutput,
  updateReview,
} from "./fetch";

export function useAddReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation<TAddReviewOutput, Error, TAddReviewInput>({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
  });
}

export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation<TUpdateReviewOutput, Error, TUpdateReviewInput>({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
  });
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation<TDeleteReviewOutput, Error, TDeleteReviewInput>({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
  });
}

export function useGetReviewByIdQuery(bookId: string) {
  return useQuery<TGetReviewByIdOutput, Error>({
    queryKey: ["Reviews", bookId],
    queryFn: () => getReviewById({ bookId }),
  });
}
