import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./blogDetail.css";

export default function BlogDetail() {
  const { id } = useParams();
  const { blogs, likeBlog, addComment } = useContext(BlogContext);
  const { currentUser } = useAuth();
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  const blogId = id;

  // Try to find by id (string/number), then fall back to numeric index lookups
  const blog =
    blogs.find((b) => String(b.id) === String(blogId)) ||
    (Number.isFinite(Number(blogId)) && (blogs[Number(blogId)] || blogs[Number(blogId) - 1]));

  if (!blog)
    return (
      <>
        <Navbar />
        <p style={{ padding: "2rem", textAlign: "center" }}>Blog not found</p>
      </>
    );

  const handleLike = () => {
    likeBlog(blog.id);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(blog.id, commentText.trim());
    setCommentText("");
  };

  return (
    <>
      <Navbar />
      <section className="blog-detail">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        <h1>{blog.title}</h1>
        {blog.img && <img src={blog.img} alt={blog.title} />}
        <p className="full-content">{blog.content}</p>

        <div className="stats">
          <span>👁 {blog.views || 0}</span>
          <button className="like-btn" onClick={handleLike}>❤️ {blog.likes || 0}</button>
        </div>

        {blog.tags && (
          <div className="tags">
            {blog.tags.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
        )}

        <div className="comments-section">
          <h3>Comments</h3>
          {blog.comments?.length === 0 ? (
            <p>No comments yet</p>
          ) : (
            <ul>
              {blog.comments.map((c) => (
                <li key={c.id}><strong>{c.author || 'Anonymous'}:</strong> {c.text}</li>
              ))}
            </ul>
          )}

          <div className="comment-form">
            <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder={currentUser ? "Write a comment..." : "Login to comment"} />
            <button onClick={handleAddComment} disabled={!currentUser}>Post Comment</button>
          </div>

          <div className="likers">
            <h4>Liked by</h4>
            {blog.likesBy?.length ? (
              <div className="liker-list">
                {blog.likesBy.map((l) => (
                  <span key={l} className="liker">{l}</span>
                ))}
              </div>
            ) : (
              <p>No likes yet</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
