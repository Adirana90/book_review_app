import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../api/auth/query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorToast, successToast } from "../toaster";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(25),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const loginUserMutation = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = (data) => {
    try {
      loginUserMutation.mutateAsync(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess(data) {
            successToast(data.message);
            reset();
            navigate("/");
          },
          onError(error) {
            console.error("error", error);
            errorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      errorToast("something went wrong");
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white w-[400px] p-10 rounded-xl border-2 border-black">
          <h2 className="mb-5 text-3xl">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 m-2">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 m-2">{errors.password.message}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                {loginUserMutation.isPending ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <p className="mt-2 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
