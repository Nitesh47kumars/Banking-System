import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = () => {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.systemUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;