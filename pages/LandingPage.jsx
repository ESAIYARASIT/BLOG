import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const navigate = useNavigate();

  const tags = [];
  const popularFilters = ["Discover", "Animation", "Branding", "Illustration", "Mobile", "Print", "Product Design", "Typography", "Web Design"];

  const trendingBlogs = [
    { title: "Minimal Blog — Untitled UI", author: "Jordan Hughes®", views: "276k", likes: "549" },
    { title: "Blog Page - iPullRank", author: "Heyo", views: "44.6k", likes: "80" },
    { title: "Travel Guider — Blog Design", author: "woop", views: "337k", likes: "567" },
    { title: "SoftQA - Blog Page", author: "Dipa Inhouse", views: "71.2k", likes: "204" },
    { title: "Blog - Personal Website", author: "Dwinawan", views: "710k", likes: "1900" },
    { title: "Blog Redesign", author: "UXTC Studio", views: "66.3k", likes: "104" },
     { title: "Minimal Blog — Untitled UI", author: "Jordan Hughes®", views: "276k", likes: "549" },
    { title: "Blog Page - iPullRank", author: "Heyo", views: "44.6k", likes: "80" },
    { title: "Travel Guider — Blog Design", author: "woop", views: "337k", likes: "567" },
    { title: "SoftQA - Blog Page", author: "Dipa Inhouse", views: "71.2k", likes: "204" },
    { title: "Blog - Personal Website", author: "Dwinawan", views: "710k", likes: "1900" },
    { title: "Blog Redesign", author: "UXTC Studio", views: "66.3k", likes: "104" },
  ];

  return (
    <div className="landing">

     
      <header className="navbar">
        <div className="logo" onClick={() => navigate("/")}>BlogSphere</div>
        <div className="nav-actions">
         
        </div>
      </header>

   
      <section className="hero">
        <h1>Blog</h1>
        <p>Inspirational blog designs
          created by the best designers
        </p>
        <div className="tags">
          {tags.map((tag, idx) => (
            <span key={idx}>{tag}</span>
          ))}
        </div>
      </section>

      
      <section className="filters">
        {popularFilters.map((filter, idx) => (
          <button key={idx} className={idx === 0 ? "active" : ""}>{filter}</button>
        ))}
      </section>

    
      <section className="grid">
        {trendingBlogs.map((blog, idx) => (
          <div className="card" key={idx}>
            <img src={`https://picsum.photos/40${idx}/260`} alt={blog.title} />
            
           
            <div className="overlay">
              <button onClick={() => navigate(`/blog/${idx}`)}>Read more</button>
            </div>

            <h3>{blog.title}</h3>
            <p>By {blog.author}</p>
            <div className="stats">
              <span>👁 {blog.views}</span>
              <span>❤️ {blog.likes}</span>
            </div>
          </div>
        ))}
      </section>

     
      <section className="ta">
        <h1>BLOGSPHERE</h1>
        learn and earn here easy working and find the best way to improve .Start now and earn a good  a way to relax <p>
          Enjoy bye blogging  helps to earn good and make your day happy and fulfilled with joy share the special events with others
        </p>
        <p>BLOGSPHERE app for professional publishers to create ,share,and grow business around their oun content</p>
        HAPPY BLOGGING  <button onClick={() => navigate("/login")}>Get Started Now </button>
     
      </section>
         
      <section className="cta">
        <h2>Start Your Blogging Journey</h2>
        <p>Join as a User or Blogger today</p>

        <button onClick={() => navigate("/login")}>Login / Sign Up</button>
      </section>
      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 BlogSphere. All rights reserved.</p>
      </footer>

    </div>
  );
}
