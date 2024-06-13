import "./protectedRoutes.scss";
import { ReactNode } from "react";
import { isExpired } from "react-jwt";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

type ProtectedRoutesProps = {
  children: ReactNode;
};

function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const currentUser = useAppSelector((state) => state.currentUser);

  return !currentUser.token || isExpired(currentUser.token) ? (
    <Navigate to="/login" />
  ) : (
    children
  );
}

export default ProtectedRoutes;
