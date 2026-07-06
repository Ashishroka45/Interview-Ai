import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register } from "../../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ email, userName, password }) => {
    setLoading(true);
    try {
      const data = await register({ email, userName, password });
      setUser(data.user);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleRegister, handleLogOut, user, loading };
};
