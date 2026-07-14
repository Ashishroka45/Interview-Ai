import { createContext, useEffect, useState } from "react";
import { getMe } from "../services/auth.api";
import { useToast } from "../../components/Toast/ToastContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showError } = useToast();

    useEffect(() => {
        const getMeAndSet = async () => {
            try {
                const data = await getMe();
                setUser(data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        getMeAndSet();
    }, []);

    useEffect(() => {
        const handleSessionExpired = (e) => {
            setUser(null);
            showError("Your session has expired. Please log in again.");
        };

        window.addEventListener("auth:session-expired", handleSessionExpired);
        return () => {
            window.removeEventListener("auth:session-expired", handleSessionExpired);
        };
    }, [showError]);

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};