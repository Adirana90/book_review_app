import { useMeUserQuery } from "../api/auth/query";
import { AppShell } from "../components/appshell";
import { CreateBook } from "../components/book/create-book";
import { Navigate } from "react-router-dom";
import { errorToast } from "../components/toaster";
import { AdminListBook } from "../components/book/admin-list-Book";

export function DashboardPage() {
  // const navigate = useNavigate()
  const { data, isLoading } = useMeUserQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.data.role !== "admin") {
    // If the user is not an admin, redirect to home or another page
    errorToast("You are not allow to access this page");
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppShell>
        <div className="relative w-full max-w-2xl mx-auto mt-0 pt-0 px-6">
          <div className="min-h-[6rem] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-[#232423] mb-8 font-mono">
                Welcome to Book Review App
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-10">
          <div>
            <CreateBook />
          </div>
        </div>
        <AdminListBook />
      </AppShell>
    </div>
  );
}
