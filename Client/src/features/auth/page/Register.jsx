import { useEffect } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/auth.context";

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { handleRegister, loading, user } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const onSubmit = async (data) => {
    console.log(data);
    const result = await handleRegister(data);
    if (result?.success) {
      navigate("/login");
    }
  };

  return (
    <main className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Register Your Account</h1>
        <p>Create your account to continue to our platform</p>

        {/* Email */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className={errors.email ? "input-error" : ""}
            disabled={loading}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && (
            <span className="error-message">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Username */}
        <div className="input-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            placeholder="Enter your username"
            className={errors.userName ? "input-error" : ""}
            disabled={loading}
            {...register("userName", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username cannot exceed 20 characters",
              },
            })}
          />
          {errors.userName && (
            <span className="error-message">
              {errors.userName.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className={errors.password ? "input-error" : ""}
            disabled={loading}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must contain at least one letter and one number",
              },
            })}
          />
          {errors.password && (
            <span className="error-message">
              {errors.password.message}
            </span>
          )}
        </div>

        <button 
          className="button primary-button"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
