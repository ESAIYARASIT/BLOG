import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu as MenuIcon } from "lucide-react";
import "./Navbar.css";

export default function Navbar({ onSidebarToggle }) {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button
          className="sidebar-toggle"
          aria-label="Open sidebar"
          onClick={() => onSidebarToggle && onSidebarToggle()}
        >
          <MenuIcon size={18} />
        </button>
        <div className="logo" onClick={() => { setMenuOpen(false); navigate("/"); }}>
          BlogSphere
        </div>

        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((s) => !s)}
        >
          {menuOpen ? "✕" : <span className="hamburger" aria-hidden="true"><span></span><span></span><span></span></span>}
        </button>
      </div>

      <div className={`nav-collapse ${menuOpen ? "open" : ""}`}>
        {/* Navigation Links */}
        <div className="nav-links">
          <button className="nav-btn" onClick={() => { setMenuOpen(false); navigate("/"); }}>Home</button>

          {currentUser?.role === "user" && (
            <button className="nav-btn" onClick={() => { setMenuOpen(false); navigate("/user"); }}>Dashboard</button>
          )}

          {currentUser?.role === "blogger" && (
            <button className="nav-btn" onClick={() => { setMenuOpen(false); navigate("/blogger"); }}>
              Blogger Panel
            </button>
          )}

          {currentUser?.role === "admin" && (
            <button className="nav-btn" onClick={() => { setMenuOpen(false); navigate("/admin"); }}>
              Admin Panel
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="nav-right">
          {currentUser ? (
            <>
              <span className="user-email" title={currentUser.email}>
                {currentUser.email.length > 20 ? `${currentUser.email.slice(0,18)}...` : currentUser.email}
              </span>

              <button
                className="nav-btn logout-btn"
                onClick={() => { setMenuOpen(false); handleLogout(); }}
                aria-label="Logout"
              >
                <svg
                  className="logout-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="logout-text">Logout</span>
              </button>
            </>
          ) : (
            <button
              className="nav-btn primary"
              onClick={() => { setMenuOpen(false); navigate("/login"); }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}