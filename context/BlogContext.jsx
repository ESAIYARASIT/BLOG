import { createContext, useState } from "react";
import { useAuth } from "./AuthContext";

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const { currentUser } = useAuth();

  // Initialize with demo blogs
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with React Hooks",
      author: "Blogger",
      content: "Learn how to use React Hooks to manage state and side effects in your functional components.",
      type: "text",
      likes: 0,
      likesBy: [],
      comments: [],
      tags: ["react", "hooks", "javascript"],
      views: 234,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      title: "CSS Grid vs Flexbox",
      author: "Blogger",
      content: "A comprehensive comparison of CSS Grid and Flexbox for modern layout design.",
      type: "text",
      likes: 0,
      likesBy: [],
      comments: [],
      tags: ["css", "layout", "design"],
      views: 567,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 3,
      title: "Web Performance Optimization",
      author: "Blogger",
      content: "Tips and tricks to optimize your website for better performance and user experience.",
      type: "text",
      likes: 0,
      likesBy: [],
      comments: [],
      tags: ["performance", "optimization", "web"],
      views: 890,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const addBlog = (blog) => {
    setBlogs([...blogs, { ...blog, likes: 0, likesBy: [], comments: [] }]);
  };

  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      )
    );
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  // ❤️ Like
  const likeBlog = (id) => {
    if (!currentUser) {
      alert("Please login to like posts");
      return;
    }

    setBlogs(
      blogs.map((b) => {
        if (b.id !== id) return b;
        const likesBy = Array.isArray(b.likesBy) ? [...b.likesBy] : [];
        const already = likesBy.find((l) => l === currentUser.email);
        if (already) {
          // unlike
          const next = likesBy.filter((l) => l !== currentUser.email);
          return { ...b, likesBy: next, likes: next.length };
        } else {
          const next = [...likesBy, currentUser.email];
          return { ...b, likesBy: next, likes: next.length };
        }
      })
    );
  };

  // 💬 Comment
  const addComment = (id, commentText) => {
    if (!currentUser) {
      alert("Please login to comment");
      return;
    }

    setBlogs(
      blogs.map((b) =>
        b.id === id
          ? {
              ...b,
              comments: [
                ...b.comments,
                { id: Date.now(), text: commentText, author: currentUser.email }
              ]
            }
          : b
      )
    );
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        addBlog,
        updateBlog,
        deleteBlog,
        likeBlog,
        addComment
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}
