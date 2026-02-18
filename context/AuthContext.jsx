import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ToastContext";

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Demo users
  const [users, setUsers] = useState([
    { name: "Admin Demo", email: "admin@demo.com", password: "Admin@123", role: "admin", status: "approved" },
    { name: "User Demo", email: "user@demo.com", password: "User@123", role: "user", status: "approved" },
    { name: "Blogger Demo", email: "blogger@demo.com", password: "Blogger@123", role: "blogger", status: "approved" }, // already approved blogger
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  const { addToast } = useToast();

  // LOGIN FUNCTION
  const login = ({ email, password, role }) => {
    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!user) {
      addToast({ type: "error", message: "Invalid credentials" });
      return false;
    }

    if (user.role === "blogger" && user.status === "pending") {
      addToast({ type: "warning", message: "Your blogger account is pending admin approval" });
      return false;
    }

    setCurrentUser(user);
    addToast({ type: "success", message: `Login successful! Welcome ${user.name}` });

    // Redirect based on role
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "user":
        navigate("/user/dashboard");
        break;
      case "blogger":
        navigate("/blogger/dashboard");
        break;
      default:
        navigate("/");
    }

    return true;
  };

  // REGISTER FUNCTION
  const register = (newUser) => {
    setUsers([...users, newUser]);
    addToast({ type: "success", message: "Registration successful" });
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setCurrentUser(null);
    addToast({ type: "info", message: "Logged out" });
    navigate("/login");
  };

  // ADMIN: Approve Blogger
  const approveBlogger = (email) => {
    setUsers(
      users.map((u) =>
        u.email === email && u.role === "blogger" ? { ...u, status: "approved" } : u
      )
    );
    addToast({ type: "success", message: `Blogger ${email} approved successfully!` });
  };

  const value = {
    users,
    currentUser,
    login,
    logout,
    register,
    approveBlogger,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};