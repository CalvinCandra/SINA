import { Navigate } from "react-router-dom";

const MiddlewareLogin = ({ children }) => {
  const token = sessionStorage.getItem("session");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default MiddlewareLogin;
