import { useState } from "react";
import "../auth.form.scss";
import { Link } from "react-router";
import { useAuth } from "../hooks/auth.context";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleRegister, handleLogOut, user, loading } =
    useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
  };

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="form-container">
      <form onSubmit={onSubmit}>
        <h1>Welcome Back 👋</h1>
        <p>Login to continue to your account</p>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="button primary-button">Login</button>
        <p className="auth-link">
          Don't have an account?<Link to={"/register"}>Register</Link>
        </p>
      </form>
    </main>
  );
}
