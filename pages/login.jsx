import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  
  const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

  
    if (role === "admin" && password !== "admin123") {
      alert("Invalid admin password");
      return;
    }

    // User & Blogger strong password validation
    if ((role === "user" || role === "blogger") && !strongPassword.test(password)) {
      alert(
        "Password must be at least 8 characters with uppercase, lowercase, number & special character"
      );
      return;
    }

    // Navigation
    if (role === "admin") navigate("/admin");
    if (role === "user") navigate("/user");
    if (role === "blogger") navigate("/blogger");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <p>
          Welcome back to <b>BlogSphere</b>
        </p>

        
        <div className="role-section">
          <label>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => setRole(e.target.value)}
            />
            User
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="blogger"
              checked={role === "blogger"}
              onChange={(e) => setRole(e.target.value)}
            />
            Blogger
          </label>

          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Sign In</button>
      </div>
    </div>
  );
}

