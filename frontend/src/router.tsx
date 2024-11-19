import {
  createBrowserRouter,
  RouterProvider as RouterProviderD,
} from "react-router-dom";
import { LoginPage } from "./pages/login";
import { HomePage } from "./pages/Home";
import { RegisterPage } from "./pages/register";
import { DashboardPage } from "./pages/dashboard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {},
]);

export function RouterProvider() {
  return <RouterProviderD router={router} />;
}
