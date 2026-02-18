import { useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./BloggerDashboard.css";
import { Trash2, Edit, Heart, MessageSquare } from "lucide-react";

export default function BloggerDashboard() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useContext(BlogContext);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [media, setMedia] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [tags, setTags] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setMedia(URL.createObjectURL(file));
  };

  const publish = () => {
    if (!title) return alert("Title is required");

    const blogData = {
      id: editingId || Date.now(),
      title,
      content,
      type,
      media,
      author: "Blogger",
      likes: 0,
      comments: [],
      tags: tags.split(",").map((t) => t.trim()),
      createdAt: new Date().toISOString(),
    };

    editingId ? updateBlog(blogData) : addBlog(blogData);

    
    setTitle("");
    setContent("");
    setMedia(null);
    setEditingId(null);
    setType("text");
    setTags("");
  };

  const editBlog = (blog) => {
    setTitle(blog.title);
    setContent(blog.content || "");
    setType(blog.type);
    setMedia(blog.media || null);
    setTags(blog.tags?.join(", ") || "");
    setEditingId(blog.id);
  };

  const myBlogs = blogs.filter((b) => b.author === "Blogger");

  return (
    <>
      <Navbar onSidebarToggle={() => setMobileOpen((s) => !s)} />
      <div className={`dashboard-layout ${darkMode ? "dark" : ""}`}>
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div className="blogger-container">
        <h2>{editingId ? "Edit Blog" : "Create Blog"}</h2>

        {/* Blog Type Selector */}
        <div className="blog-type-selector">
          {["text", "image", "video"].map((t) => (
            <button
              key={t}
              className={type === t ? "active" : ""}
              onClick={() => setType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        
        <div className="form-grid">
          <div className="form-left">
            <input
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            {type === "text" && (
              <textarea
                placeholder="Write your blog..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
          </div>

          <div className="form-right">
            {["image", "video"].includes(type) && (
              <>
                <input type="file" accept={`${type}/*`} onChange={handleFile} />
                {media && (
                  <div className="media-preview">
                    {type === "image" ? (
                      <img src={media} alt="preview" />
                    ) : (
                      <video src={media} controls />
                    )}
                  </div>
                )}
                <textarea
                  placeholder={`Enter ${type} description`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </>
            )}
          </div>
        </div>

        <button className="publish-btn" onClick={publish}>
          {editingId ? "Update Blog" : "Publish"}
        </button>

        <hr />

        <h3>My Blogs</h3>
        <div className="blog-grid">
          {myBlogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <span className="status-badge">
                {new Date(blog.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  ? "New"
                  : "Trending"}
              </span>

              <h4>{blog.title}</h4>

              {blog.tags?.length > 0 && (
                <div className="tags">
                  {blog.tags.map((t) => (
                    <span key={t}>#{t}</span>
                  ))}
                </div>
              )}

              {blog.type === "text" && <p>{blog.content}</p>}
              {blog.type === "image" && (
                <>
                  <img src={blog.media} alt="" />
                  <p>{blog.content}</p>
                </>
              )}
              {blog.type === "video" && (
                <>
                  <video src={blog.media} controls />
                  <p>{blog.content}</p>
                </>
              )}

              <div className="actions">
                <button>
                  <Heart size={18} /> {blog.likes || 0}
                </button>
                <button>
                  <MessageSquare size={18} /> {blog.comments?.length || 0}
                </button>
              </div>
                {/* Interaction lists for blogger to see who liked/commented */}
                <div className="mt-3 text-sm">
                  <strong>Liked by:</strong>
                  {blog.likesBy && blog.likesBy.length > 0 ? (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 6 }}>
                      {blog.likesBy.map((l) => (
                        <span key={l} style={{ background: '#eef2ff', padding: '4px 8px', borderRadius: 999 }}>{l}</span>
                      ))}
                    </div>
                  ) : (
                    <div style={{ color: '#6b7280' }}>No likes yet</div>
                  )}

                  <div style={{ marginTop: 8 }}>
                    <strong>Comments:</strong>
                    {blog.comments && blog.comments.length > 0 ? (
                      <ul style={{ marginTop: 6 }}>
                        {blog.comments.map((c) => (
                          <li key={c.id} style={{ marginBottom: 6 }}><strong>{c.author || 'Anonymous'}</strong>: {c.text}</li>
                        ))}
                      </ul>
                    ) : (
                      <div style={{ color: '#6b7280' }}>No comments yet</div>
                    )}
                  </div>
                </div>

              <div className="edit-delete">
                <button className="edit-btn" onClick={() => editBlog(blog)}>
                  <Edit size={16} /> Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this blog?"))
                      deleteBlog(blog.id);
                  }}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </>
  );
}
