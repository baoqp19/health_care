import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth/authStore";

const PrivateRoute = ({ element  }: { element : JSX.Element }) => {
    const { user, isAuthenticated, isLoaded } = useAuthStore((state) => state);

    if (isLoaded) {
        if (user) {
            if (!isAuthenticated) {
                return <Navigate to="/auth/login" replace={true} />;
            }
            return element ;
        }else{
         console.log("user không tồn tại!")
        }
    } else {
        return <Navigate to="/auth/login" replace={true} />;
    }

}

export default PrivateRoute