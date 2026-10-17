
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "./apiServices";
import "./App.css";

const Profile = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("userdetail") || "null")
  );
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const isLoggedIn = localStorage.getItem("loginStatus") === "success";

  if (!isLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { data: users } = await api.get("/users");

      const duplicate = users.some(
        (u) =>
          u.id !== user.id &&
          (u.email?.toLowerCase() === user.email.trim().toLowerCase() ||
            u.username?.toLowerCase() === user.username.trim().toLowerCase() ||
            String(u.mobile) === user.mobile.trim())
      );

      if (duplicate) {
        alert("That email, username, or mobile number is already in use.");
        return;
      }

      const updatedUser = {
        ...user,
        firstname: user.firstname.trim(),
        lastname: user.lastname.trim(),
        email: user.email.trim(),
        username: user.username.trim(),
        mobile: user.mobile.trim(),
      };

      const { data } = await api.put(`/users/${user.id}`, updatedUser);

      setUser(data);
      localStorage.setItem("userdetail", JSON.stringify(data));
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 1024 * 1024) {
      alert("Choose an image smaller than 1 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, propic: reader.result }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Link to="/dashboard" className="dashboard-brand">
          <span className="brand-mark dashboard-brand-mark">T</span>
          <span>TKA <strong>SOCIAL</strong></span>
        </Link>

        <Link to="/dashboard" className="profile-action">
          ← Back to Dashboard
        </Link>
      </header>

      <section className="profile-page-card">
        <div className="profile-page-banner">
          <p className="eyebrow">ACCOUNT SETTINGS</p>
          <h1>My Profile</h1>
          <p>Manage your personal information.</p>
        </div>

        <form className="profile-page-body" onSubmit={handleSave}>
          <div className="profile-page-avatar">
            {user.propic ? (
              <img src={user.propic} alt="Profile" />
            ) : (
              <span>
                {user.firstname?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>

          {editing && (
            <label className="profile-upload-button">
              Change profile picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}

          <div className="signup-grid profile-edit-grid">
            {[
              ["firstname", "First name"],
              ["lastname", "Last name"],
              ["email", "Email address"],
              ["username", "Username"],
              ["mobile", "Mobile number"],
            ].map(([name, label]) => (
              <div className="form-group" key={name}>
                <label htmlFor={`profile-${name}`}>{label}</label>
                <input
                  id={`profile-${name}`}
                  name={name}
                  type={name === "email" ? "email" : "text"}
                  value={user[name] ?? ""}
                  onChange={handleChange}
                  readOnly={!editing}
                  required
                  pattern={name === "mobile" ? "[0-9]{10}" : undefined}
                  maxLength={name === "mobile" ? 10 : undefined}
                />
              </div>
            ))}
          </div>

          <div className="profile-page-actions">
            {editing ? (
              <>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => {
                    setUser(
                      JSON.parse(localStorage.getItem("userdetail") || "null")
                    );
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="primary-button"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
