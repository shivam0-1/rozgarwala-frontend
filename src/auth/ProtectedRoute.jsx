import { Navigate } from "react-router-dom";
import { getToken } from "../utils/authStorage";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/logincustomer" replace />;
  }

  return children; // 🔥 THIS LINE WAS MISSING
};

export default ProtectedRoute;
