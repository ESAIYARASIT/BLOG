import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";

export default function AdminDashboard() {
  const { users, approveBlogger } = useAuth();

  const pendingBloggers = users.filter(
    (u) => u.role === "blogger" && u.status === "pending"
  );

  return (
    <>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <h2>Admin Dashboard</h2>
        <StatsCards />

        <h3>Pending Blogger Requests</h3>

        {pendingBloggers.length === 0 ? (
          <p>No pending bloggers</p>
        ) : (
          pendingBloggers.map((b) => (
            <div
              key={b.email}
              style={{
                background: "#fff",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            >
              <p><b>{b.email}</b></p>
              <button onClick={() => approveBlogger(b.email)}>
                Approve
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
