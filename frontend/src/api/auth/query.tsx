import { useMutation, useQuery } from "@tanstack/react-query";
import {
  loginUser,
  logoutUser,
  meUser,
  registerUser,
  TLoginUserInput,
  TLoginUserOutput,
  TLogoutOutput,
  TmeOutput,
  TRegisterUserInput,
  TRegisterUserOutput,
} from "./fetch";

// for register api
export function useRegisterUserMutation() {
  return useMutation<TRegisterUserOutput, Error, TRegisterUserInput>({
    mutationFn: registerUser,
  });
}

// for login api
export function useLoginUserMutation() {
  return useMutation<TLoginUserOutput, Error, TLoginUserInput>({
    mutationFn: loginUser,
  });
}

// for me api
export function useMeUserQuery() {
  return useQuery<TmeOutput, Error>({
    queryKey: ["meUser"],
    queryFn: meUser,
  });
}

// for logout api
export function useLogoutMutation() {
  return useMutation<TLogoutOutput, Error, object>({
    mutationFn: logoutUser,
  });
}
