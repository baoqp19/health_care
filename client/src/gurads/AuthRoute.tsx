import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth/authStore";


const AuthRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore((state) => state);

  return isAuthenticated ? <Navigate to="/manager" replace /> : element;
  // return isAuthenticated ? element : <Navigate to="/manager" replace />;
};

export default AuthRoute;