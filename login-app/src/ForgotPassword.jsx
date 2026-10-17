
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./apiServices";
import "./App.css";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [securityans, setSecurityans] = useState("");
  const [match, setMatch] = useState(false);
  const [newpass, setNewpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigateMe = useNavigate();

  const clearAll = () => {
    setUsername("");
    setUser(null);
    setSecurityans("");
    setMatch(false);
    setNewpass("");
    setShowPassword(false);
  };

  const handleUsername = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUser(null);
    setMatch(false);
    setSecurityans("");
    setNewpass("");

    try {
      const { data } = await api.get("/users");
      const identifier = username.trim().toLowerCase();

      const userFound = data.find(
        (u) =>
          u.username?.toLowerCase() === identifier ||
          u.email?.toLowerCase() === identifier ||
          String(u.mobile) === username.trim()
      );

      if (!userFound) {
        alert("No account found with those details.");
        return;
      }

      setUser(userFound);
    } catch (error) {
      console.error("Account lookup error:", error);
      alert("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = (e) => {
    e.preventDefault();

    if (
      securityans.trim().toLowerCase() ===
      user.securityanswer?.trim().toLowerCase()
    ) {
      setMatch(true);
    } else {
      setSecurityans("");
      alert("Security answer does not match.");
    }
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();

    if (!newpass.trim()) {
      alert("Please enter a new password.");
      return;
    }

    setLoading(true);

    try {
      await api.patch(`/users/${user.id}`, {
        password: newpass,
      });

      alert("Password updated successfully!");
      clearAll();
      navigateMe("/");
    } catch (error) {
      console.error("Password update error:", error);
      alert("Unable to update your password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card recovery-card">
        <Link to="/" className="back-link">
          <span>←</span> Back to login
        </Link>

        <div className="recovery-icon">↻</div>

        <p className="eyebrow">ACCOUNT RECOVERY</p>
        <h2 className="auth-title">Forgot your password?</h2>
        <p className="auth-subtitle">
          {match
            ? "Your answer has been verified. Choose a new password."
            : user
              ? "Answer your security question to continue."
              : "Enter your account details to begin recovering your account."}
        </p>

        {!user && (
          <form className="auth-form" onSubmit={handleUsername}>
            <div className="form-group">
              <label htmlFor="recovery-username">
                Username, email or mobile
              </label>
              <input
                id="recovery-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your account details"
                autoComplete="username"
                required
              />
            </div>

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "Checking account..." : "Find My Account →"}
            </button>
          </form>
        )}

        {user && !match && (
          <form className="auth-form" onSubmit={checkAnswer}>
            <div className="recovery-account">
              <span className="recovery-account-avatar">
                {user.firstname?.[0]?.toUpperCase() || "U"}
              </span>
              <div>
                <strong>{user.firstname} {user.lastname}</strong>
                <p>@{user.username}</p>
              </div>
            </div>

            <div className="security-question-box">
              <span className="security-label">YOUR SECURITY QUESTION</span>
              <p>{user.securityquestion}</p>
            </div>

            <div className="form-group">
              <label htmlFor="security-answer">Your answer</label>
              <input
                id="security-answer"
                type="text"
                value={securityans}
                onChange={(e) => setSecurityans(e.target.value)}
                placeholder="Enter your answer"
                required
              />
            </div>

            <button className="primary-button" type="submit">
              Verify Answer →
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={clearAll}
            >
              Try another account
            </button>
          </form>
        )}

        {user && match && (
          <form className="auth-form" onSubmit={handleNewPassword}>
            <div className="form-group">
              <label htmlFor="new-password">New password</label>
              <div className="password-field">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newpass}
                  onChange={(e) => setNewpass(e.target.value)}
                  placeholder="Enter a new password"
                  autoComplete="new-password"
                  minLength={6}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "Updating password..." : "Reset Password →"}
            </button>
          </form>
        )}

        <p className="auth-footer recovery-footer">
          Remember your password?{" "}
          <Link to="/" className="text-link strong-link">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default ForgotPassword;
