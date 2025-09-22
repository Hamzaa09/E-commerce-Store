import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { authCheck, screenLoading } = useSelector((state) => state.userSlice);

  if (!authCheck) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
