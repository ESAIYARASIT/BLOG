import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    register(email, password, role);

    if (role === "blogger") {
      alert("Registered! Waiting for admin approval.");
    } else {
      alert("Registered successfully!");
    }

    navigate("/login");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Create Account</h2>
        <p>Join <b>BlogSphere</b></p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="blogger">Blogger</option>
        </select>

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
