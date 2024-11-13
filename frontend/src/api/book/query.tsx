import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addBook,
  TaddBookInput,
  TaddBookOutput,
  TUpdateBookInput,
  TUpdateBookOutput,
  updateBook,
} from "./fetch";

export const useAddBookMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<TaddBookOutput, Error, TaddBookInput>({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book"] });
    },
  });
};

export function useUpdateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation<TUpdateBookOutput, Error, TUpdateBookInput>({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
