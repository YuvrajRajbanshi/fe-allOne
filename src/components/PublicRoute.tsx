import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/userStore";

interface PublicRouteProps {
  children: React.ReactNode;
}

// This route is for pages that should NOT be accessible when logged in
// e.g., Login, Signup pages - redirect to home if already authenticated
const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  if (isAuthenticated) {
    // Redirect to home page if already logged in
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
