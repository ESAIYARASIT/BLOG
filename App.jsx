import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import UserDashboard from "./pages/UserDashboard";
import BloggerDashboard from "./pages/BloggerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BlogDetail from "./pages/BlogDetail";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/Navbar"  element={<Navbar/>}/>
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/blogger" element={<BloggerDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
    
  );
}


