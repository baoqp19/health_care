import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth/authStore";
import { useAccount } from "../api/auth/me";
import { startTransition } from "react";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const setUser = useAuthStore((state) => state.setUser);
    const { isError } = useAccount({
        onSuccess: (data) => {
            startTransition(() => {
                setUser(data);
            });
        },
    });

    if (isError) {
        return <Navigate to="/auth/login" replace />;
    }
    return element;

}

export default PrivateRoute 