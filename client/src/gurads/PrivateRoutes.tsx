import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth/authStore";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated, isLoaded } = useAuthStore((state) => state);

    if (isLoaded) {
        if (!isAuthenticated) {
            return <Navigate to="/auth/login" replace={true} />;
        }
        return element;
    } else {
        return <Navigate to="/auth/login" replace={true} />;
    }

}

export default PrivateRoute