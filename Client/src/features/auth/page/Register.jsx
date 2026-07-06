import "../auth.form.scss";
import {Link} from "react-router"
export function Register() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="form-container">
      <form onSubmit={onSubmit}>
        <h1>Register Your Account</h1>
        <p>Create your account to continue to our platform</p>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>

         <div className="input-group">
          <label htmlFor="userName">UserName</label>
          <input
            type="text"
            id="userName"
            placeholder="Enter your userName"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <button className="button primary-button">
          Register
        </button>
      <p className="auth-link" >Already have an account?<Link to={"/login"} >Login</Link></p>
      </form>
    </main>
  );
}