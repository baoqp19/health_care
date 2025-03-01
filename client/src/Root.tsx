import { useEffect } from "react";
import { useAuthStore } from "./stores/auth/authStore";
import { useAccount } from "./api/auth/me";
import Loader from "./components/Loader";

interface RootProps {
    children: React.ReactNode;
}

const Root: React.FC<RootProps> = ({ children }) => {
    const { isLoaded } = useAuthStore((state) => state);
    const mutation = useAccount();

    useEffect(() => {
        if (!isLoaded) {
            const fetchUser = async () => {
                try {
                    await mutation.mutateAsync();
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            fetchUser();
        }
    }, [isLoaded, mutation]);

    if (!isLoaded) {
        return <Loader />;
    }

    return <>{children}</>;
};

export default Root;