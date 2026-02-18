import { useState } from "react";
import {
  LayoutDashboard,
  PlusSquare,
  FileText,
  Send,
  Moon,
  Sun,
  Menu,
  X
} from "lucide-react";
import "./sidebar.css";

export default function Sidebar({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen
}) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "create", label: "Create Blog", icon: <PlusSquare size={18} /> },
    { id: "draft", label: "Drafts", icon: <FileText size={18} /> },
    { id: "published", label: "Published", icon: <Send size={18} /> }
  ];

  return (
    <>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen && setMobileOpen(false)} />}

      <div className={`sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-active" : ""}`}>
      <div className="sidebar-top">
        <h2 className="logo">Blog Studio</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {mobileOpen && (
            <button className="collapse-btn" onClick={() => setMobileOpen && setMobileOpen(false)} aria-label="Close sidebar">
              <X size={16} />
            </button>
          )}
          <button
            className="collapse-btn"
            onClick={() => setCollapsed && setCollapsed((s) => !s)}
            aria-label="Toggle sidebar"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>

      <div className="menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeTab === item.id ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="theme-label">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </div>
    </>
  );
}