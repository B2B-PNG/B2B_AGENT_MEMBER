import { SplashScreen } from "@/components/loading";
import { CONFIG } from "@/config-global";
import { useUser } from "@/hooks/actions/useAuth";
import { useIsLoggedIn, useUserStore } from "@/zustand/useUserStore";
import { useEffect } from "react";

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
    useUser();
    const isLoggedIn = useIsLoggedIn();
    const isLoading = useUserStore((state) => state.isLoading);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            window.location.href = `${CONFIG.serverUrl}auth/login`;
        }
    }, [isLoading, isLoggedIn]);

    if (isLoading) return <SplashScreen />;

    return children;
};