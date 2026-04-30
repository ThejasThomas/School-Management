import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = ({ children }: any) => {
  const { user } = useAuth();

  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin" : "/home"}
        replace
      />
    );
  }

  return children;
};