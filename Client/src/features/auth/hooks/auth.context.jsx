import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register } from "../../services/auth.api";
import { useToast } from "../../../components/Toast/ToastContext";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const { showSuccess, showError } = useToast();

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      showSuccess("Welcome back! Logged in successfully.");
      return { success: true };
    } catch (error) {
      showError(error.message || "Login failed.");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, userName, password }) => {
    setLoading(true);
    try {
      const data = await register({ email, userName, password });
      setUser(data.user);
      showSuccess("Account registered successfully.");
      return { success: true };
    } catch (error) {
      showError(error.message || "Registration failed.");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      showSuccess("Logged out successfully.");
    } catch (error) {
      showError(error.message || "Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, handleLogOut, user, loading };
};
