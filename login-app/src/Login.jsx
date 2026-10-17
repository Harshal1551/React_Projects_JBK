
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./apiServices";
import "./App.css";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateMe = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.get("/users");

      const enteredUsername = form.username.trim().toLowerCase();

      const userFound = data.find(
        (u) =>
          u.username?.toLowerCase() === enteredUsername ||
          String(u.mobile) === form.username.trim() ||
          u.email?.toLowerCase() === enteredUsername
      );

      if (!userFound) {
        alert("Account not found. Please sign up first.");
        return;
      }

      if (userFound.password !== form.password) {
        alert("Incorrect password. Please try again.");
        return;
      }

      localStorage.setItem("loginStatus", "success");
      localStorage.setItem("userdetail", JSON.stringify(userFound));

      navigateMe("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="brand-mark">T</div>

        <p className="eyebrow">WELCOME BACK</p>
        <h2 className="auth-title">Sign in to your account</h2>
        <p className="auth-subtitle">
          Connect with your community and pick up where you left off.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username, email or mobile</label>
            <input
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              autoComplete="username"
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">Password</label>
              <Link className="text-link" to="/forgot">
                Forgot password?
              </Link>
            </div>

            <div className="password-field">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />

              <button
                className="password-toggle"
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <span aria-hidden="true"> →</span>}
          </button>
        </form>

        <div className="auth-divider">
          <span>YOUR COMMUNITY AWAITS</span>
        </div>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link className="text-link strong-link" to="/signup">
            Create account
          </Link>
        </p>

        <p className="auth-legal">
          By continuing, you agree to use TKA Social responsibly.
        </p>
      </section>
    </main>
  );
};

export default Login;
