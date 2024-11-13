import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../api/auth/query";
import { errorToast, successToast } from "../toaster";

export const Logout = () => {
  const logoutUserMutatuon = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logoutUserMutatuon.mutateAsync(
        {},
        {
          onSuccess(data) {
            successToast(data.message);
            // window.location.href = '/login'
            navigate("/login");
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
    <div className="flex items-center justify-center">
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300"
      >
        Logout
      </button>
    </div>
  );
};
