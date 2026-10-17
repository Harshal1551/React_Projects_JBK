
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./apiServices";
import "./App.css";

const initialForm = {
  firstname: "",
  lastname: "",
  email: "",
  mobile: "",
  username: "",
  password: "",
  securityquestion: "What is Your Pet Name?",
  securityanswer: "",
  propic: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const navigateMe = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Please select an image smaller than 1 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        propic: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: users } = await api.get("/users");

      const emailExists = users.some(
        (u) => u.email?.toLowerCase() === form.email.trim().toLowerCase()
      );

      const usernameExists = users.some(
        (u) => u.username?.toLowerCase() === form.username.trim().toLowerCase()
      );

      const mobileExists = users.some(
        (u) => String(u.mobile) === form.mobile.trim()
      );

      if (emailExists || usernameExists || mobileExists) {
        alert(
          emailExists
            ? "This email is already registered."
            : usernameExists
              ? "This username is already taken."
              : "This mobile number is already registered."
        );
        return;
      }

      await api.post("/users", {
        ...form,
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim(),
        username: form.username.trim(),
        mobile: form.mobile.trim(),
      });

      alert("Account created successfully!");
      navigateMe("/");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page signup-page">
      <section className="auth-card signup-card">
        <div className="brand-mark">T</div>

        <p className="eyebrow">JOIN THE COMMUNITY</p>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Set up your profile and start connecting with people.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="profile-upload">
            <button
              className="avatar-picker"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Choose profile picture"
            >
              {form.propic ? (
                <img src={form.propic} alt="Profile preview" />
              ) : (
                <span className="avatar-placeholder">+</span>
              )}
            </button>

            <div className="upload-description">
              <strong>Profile picture</strong>
              <span>Choose a photo (max 1 MB)</span>
              <button
                className="text-link upload-link"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload photo
              </button>
            </div>

            <input
              ref={fileInputRef}
              className="file-input-hidden"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!form.propic}
            />
          </div>

          <div className="signup-grid">
            <div className="form-group">
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                placeholder="First name"
                autoComplete="given-name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                placeholder="Last name"
                autoComplete="family-name"
                required
              />
            </div>

            <div className="form-group signup-full">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="username-signup">Username</label>
              <input
                id="username-signup"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose username"
                autoComplete="username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobile">Mobile number</label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile number"
                autoComplete="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                title="Enter a 10-digit mobile number"
                required
              />
            </div>

            <div className="form-group signup-full">
              <label htmlFor="password-signup">Password</label>
              <div className="password-field">
                <input
                  id="password-signup"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            <div className="form-group signup-full">
              <label htmlFor="securityquestion">Security question</label>
              <select
                id="securityquestion"
                name="securityquestion"
                value={form.securityquestion}
                onChange={handleChange}
                required
              >
                <option>What is Your Pet Name?</option>
                <option>What is Your Best Friend Name?</option>
                <option>What is Your Teacher Name?</option>
                <option>What is Your Hobby?</option>
              </select>
            </div>

            <div className="form-group signup-full">
              <label htmlFor="securityanswer">Security answer</label>
              <input
                id="securityanswer"
                name="securityanswer"
                value={form.securityanswer}
                onChange={handleChange}
                placeholder="Enter your answer"
                required
              />
            </div>
          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
            {!loading && <span aria-hidden="true"> →</span>}
          </button>
        </form>

        <p className="auth-footer signup-footer">
          Already have an account?{" "}
          <Link className="text-link strong-link" to="/">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Signup;
