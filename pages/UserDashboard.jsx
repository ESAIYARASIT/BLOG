import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import "./userDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { blogs, likeBlog, addComment } = useContext(BlogContext) || { blogs: [], likeBlog: () => {}, addComment: () => {} };
  const { currentUser } = useAuth();

 const safeBlogs = Array.isArray(blogs) ? blogs : [];

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);

 
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [commentText, setCommentText] = useState("");

  const tags = ["article", "blogger", "post", "wordpress", "news", "theme"];
  const popularFilters = [
    "Discover",
    "Animation",
    "Branding",
    "Illustration",
    "Mobile",
    "Print",
    "Product Design",
    "Typography",
    "Web Design",
  ];

 const filteredBlogs = safeBlogs.filter((b) => {
    const title = (b.title || "").toString();
    return (
      (activeCategory === "All" || b.category === activeCategory) &&
      title.toLowerCase().includes(search.toLowerCase())
    );
  });

 
  const staticTrendingBlogs = [
    { title: "Minimal Blog — Untitled UI", author: "Jordan Hughes®", views: "276k", likes: "549", type: "text" },
    { title: "Blog Page - iPullRank", author: "Heyo", views: "44.6k", likes: "80", type: "text" },
    { title: "Travel Guider — Blog Design", author: "woop", views: "337k", likes: "567", type: "text" },
    { title: "SoftQA - Blog Page", author: "Dipa Inhouse", views: "71.2k", likes: "204", type: "text" },
    { title: "Blog - Personal Website", author: "Dwinawan", views: "710k", likes: "1900", type: "text" },
    { title: "Blog Redesign", author: "UXTC Studio", views: "66.3k", likes: "104", type: "text" },
  ];

  const trendingBlogs = [...safeBlogs]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 6)
    .map((b) => ({ ...b, type: b.type || "text" }));

  
  useEffect(() => {
    let rec;
    if (activeCategory === "All") {
      rec = safeBlogs.slice(-3).reverse();
    } else {
      rec = safeBlogs.filter((b) => b.category === activeCategory).slice(-3).reverse();
    }
    setRecommendedBlogs(rec);
  }, [activeCategory, blogs]);

  // Update selectedBlog when blogs change (handles likes/comments updates)
  useEffect(() => {
    if (selectedBlog && safeBlogs.length > 0) {
      const updated = safeBlogs.find((b) => b.id === selectedBlog.id);
      if (updated) {
        console.log("Updated selected blog with likes:", updated.likes, "comments:", updated.comments?.length);
        setSelectedBlog(updated);
      }
    }
  }, [safeBlogs, selectedBlog?.id]);

  const getImage = (blog, idx) => {
    if (blog.type === "text") return blog.img || `https://picsum.photos/40${idx}/260`;
    return blog.img || "/default-blog-img.jpg";
  };

  const handleLike = () => {
    if (!selectedBlog) {
      console.warn("No blog selected");
      return;
    }
    console.log("Liking blog:", selectedBlog.id);
    likeBlog(selectedBlog.id);
  };

  const handleAddComment = () => {
    if (!selectedBlog) {
      console.warn("No blog selected");
      return;
    }
    if (!commentText.trim()) {
      console.warn("Comment text is empty");
      return;
    }
    console.log("Adding comment to blog:", selectedBlog.id, "Comment:", commentText);
    addComment(selectedBlog.id, commentText.trim());
    setCommentText("");
  };

  const renderCard = (blog, idx) => (
    <div className="card" key={blog.id || idx}>
      <img src={getImage(blog, idx)} alt={blog.title} />
      <div className="overlay">
      
        <button onClick={() => setSelectedBlog(blog)}>Read More</button>
      </div>
      <h3>{blog.title}</h3>
      <p>By {blog.author}</p>
      <div className="stats">
        <span>👁 {blog.views || 0}</span>
        <span>❤️ {blog.likes || 0}</span>
      </div>
      {blog.tags && (
        <div className="tags">
          {blog.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Navbar />

  
      <section className="dashboard-search">
        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

     
      <section className="filters">
        {popularFilters.map((filter, idx) => (
          <button
            key={idx}
            className={activeCategory === filter ? "active" : ""}
            onClick={() => setActiveCategory(filter)}
          >
            {filter}
          </button>
        ))}
      </section>

     
      <section className="recommend-section">
        <h2>Recommended for you</h2>
        <div className="recommend-grid">
          {recommendedBlogs.length === 0 ? <p>No recommendations yet</p> : recommendedBlogs.map(renderCard)}
        </div>
      </section>

    
      <section className="trending-section">
        <h2>Trending Blogs</h2>
        <div className="trending-grid">
          {trendingBlogs.map(renderCard)}
          {staticTrendingBlogs.map(renderCard)}
        </div>
      </section>

   
      <h2 className="feed-title">User Feed</h2>
      <div className="blog-grid">
        {filteredBlogs.length === 0 ? (
          <p className="empty-text">No blogs found</p>
        ) : (
          filteredBlogs.map(renderCard)
        )}
      </div>

      
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBlog(null)}>
              ×
            </button>

            <h2>{selectedBlog.title}</h2>
            <p><strong>By {selectedBlog.author}</strong></p>

            {selectedBlog.img && (
              <img
                src={selectedBlog.img}
                alt={selectedBlog.title}
                style={{ width: "100%", marginBottom: "15px" }}
              />
            )}

            <p>{selectedBlog.content || "No content available"}</p>

            <div className="stats">
              <span>👁 {selectedBlog.views || 0}</span>
              <button className="like-btn" onClick={handleLike}>❤️ {selectedBlog.likes || 0}</button>
            </div>

            {selectedBlog.tags && (
              <div className="tags">
                {selectedBlog.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            )}

            {/* Comments Section */}
            <div className="comments-section">
              <h4>Comments</h4>
              {selectedBlog.comments?.length === 0 ? (
                <p>No comments yet</p>
              ) : (
                <ul>
                  {selectedBlog.comments.map((c) => (
                    <li key={c.id}><strong>{c.author || 'Anonymous'}</strong>: {c.text}</li>
                  ))}
                </ul>
              )}

              <div className="comment-form">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={currentUser ? "Write a comment..." : "Login to comment"}
                />
                <button onClick={handleAddComment} disabled={!currentUser}>Post Comment</button>
              </div>

              {/* Likers List */}
              <div className="likers">
                <h4>Liked by</h4>
                {selectedBlog.likesBy?.length > 0 ? (
                  <div className="liker-list">
                    {selectedBlog.likesBy.map((l) => (
                      <span key={l} className="liker">{l}</span>
                    ))}
                  </div>
                ) : (
                  <p>No likes yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
