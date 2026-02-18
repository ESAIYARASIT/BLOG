import React from "react";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="blog-feed">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}
