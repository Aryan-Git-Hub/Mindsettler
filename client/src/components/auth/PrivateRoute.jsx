import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, roleRequired }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>; // Prevent "flicker" while fetching user
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;