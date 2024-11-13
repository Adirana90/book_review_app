import { useNavigate } from "react-router-dom";
import { useMeUserQuery } from "../../api/auth/query";
import { Logout } from "./logout";

export const User = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useMeUserQuery();

  if (isLoading) {
    return <div>loading....</div>;
  }

  if (!data) {
    return navigate("/login");
    // return <div>data not found</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="text-5xl">{data.data.email}</div>
      <div className="text-3xl">{data.data.username}</div>
      <div>
        <Logout />
      </div>
    </div>
  );
};
