import { useState, useEffect } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/auth.context";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const { handleLogin, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    
    if (!email.trim() || !password.trim()) {
      setValidationError("Please fill in all fields.");
      return;
    }
    
    const result = await handleLogin({ email, password });
    if (result?.success) {
      navigate("/");
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={onSubmit}>
        <h1>Welcome Back 👋</h1>
        <p>Login to continue to your account</p>

        {validationError && (
          <div className="error-message" style={{ textAlign: "center", marginBottom: "15px" }}>
            ⚠️ {validationError}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            disabled={loading}
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
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          className="button primary-button" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <p className="auth-link">
          Don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </form>
    </main>
  );
}
