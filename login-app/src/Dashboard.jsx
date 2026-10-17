
import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import Logout from "./Logout";
import "./App.css";

const Dashboard = () => {
  const userInfo = JSON.parse(
    localStorage.getItem("userdetail") || "null"
  );

  const isLoggedIn = localStorage.getItem("loginStatus") === "success";

  if (!isLoggedIn || !userInfo) {
    return <Navigate to="/" replace />;
  }

  const fullName =
    `${userInfo.firstname || ""} ${userInfo.lastname || ""}`.trim();

  const initials =
    `${userInfo.firstname?.[0] || ""}${userInfo.lastname?.[0] || ""}`
      .toUpperCase() || "U";

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <NavLink to="/dashboard" className="dashboard-brand">
          <span className="brand-mark dashboard-brand-mark">T</span>
          <span>TKA <strong>SOCIAL</strong></span>
        </NavLink>

        <div className="dashboard-header-right">
          <span className="online-indicator">
            <span /> Online
          </span>
          <Logout />
        </div>
      </header>

      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <p className="sidebar-label">MENU</p>

          <NavLink to="/dashboard" className="sidebar-link">
            <span>⌂</span> Dashboard
          </NavLink>

          <NavLink to="/profile" className="sidebar-link">
            <span>♙</span> My Profile
          </NavLink>

          <NavLink to="/message" className="sidebar-link">
            <span>✉</span> Messages
          </NavLink>

          <div className="sidebar-note">
            <span className="sidebar-note-icon">✦</span>
            <h4>Your space, your people.</h4>
            <p>Stay connected with your community.</p>
          </div>
        </aside>

        <section className="dashboard-content">
          <div className="dashboard-welcome">
            <div>
              <p className="eyebrow">YOUR PERSONAL SPACE</p>
              <h1>Welcome back, {userInfo.firstname}! 👋</h1>
              <p>Here's your profile at a glance.</p>
            </div>

            <div className="welcome-badge">✦ Community member</div>
          </div>

          <div className="dashboard-stats">
            <article className="stat-card">
              <span className="stat-icon purple">♙</span>
              <div>
                <p>Account status</p>
                <h3>Active</h3>
              </div>
              <span className="stat-check">✓</span>
            </article>

            <article className="stat-card">
              <span className="stat-icon blue">✉</span>
              <div>
                <p>Account type</p>
                <h3>Member</h3>
              </div>
            </article>

            <article className="stat-card">
              <span className="stat-icon green">✓</span>
              <div>
                <p>Profile</p>
                <h3>{userInfo.propic ? "Picture added" : "No picture"}</h3>
              </div>
            </article>
          </div>

          <section className="profile-card">
            <div className="profile-card-heading">
              <div>
                <h2>My Profile</h2>
                <p>Your personal account information</p>
              </div>

              <NavLink to="/profile" className="profile-action">
                View profile →
              </NavLink>
            </div>

            <div className="profile-identity">
              {userInfo.propic ? (
                <img
                  className="dashboard-avatar"
                  src={userInfo.propic}
                  alt={`${fullName}'s profile`}
                />
              ) : (
                <div className="dashboard-avatar avatar-fallback">
                  {initials}
                </div>
              )}

              <div className="profile-identity-info">
                <h3>{fullName || userInfo.username}</h3>
                <p>@{userInfo.username}</p>
                <span className="member-tag">● Active member</span>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-icon">♙</span>
                <div>
                  <p>First name</p>
                  <strong>{userInfo.firstname || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">♙</span>
                <div>
                  <p>Last name</p>
                  <strong>{userInfo.lastname || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">✉</span>
                <div>
                  <p>Email address</p>
                  <strong>{userInfo.email || "Not provided"}</strong>
                </div>
              </div>

              <div className="detail-item">
                <span className="detail-icon">▤</span>
                <div>
                  <p>Username</p>
                  <strong>{userInfo.username || "Not provided"}</strong>
                </div>
              </div>
            </div>

            <div className="profile-card-footer">
              <span>✦ &nbsp; Welcome to TKA Social</span>
              <NavLink to="/message">Explore messages →</NavLink>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
