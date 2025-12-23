import WorkerProfile from "./WorkerDashboard";
import CustomerProfile from "./CustomerDashboard";
import useAuth from "../../auth/useAuth";
import { Navigate } from "react-router-dom";

const ProfileRouter = () => {
  const { isAuth, role, loading } = useAuth();

  if (loading) return null;

  if (!isAuth) {
    return <Navigate to="/logincustomer" replace />;
  }

  if (role === "worker") return <WorkerProfile />;

  return <CustomerProfile />;
};

export default ProfileRouter;
