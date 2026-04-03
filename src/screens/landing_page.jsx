import { useState } from "react";
import { useNavigate } from "react-router-dom";
import landingImg1 from "../assets/landing_img1.png";
import landingImg2 from "../assets/landing_img2.png";
import landingImg3 from "../assets/landing_img3.png";

const PRIMARY = "#7c3bed";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  .smartpm-root {
    font-family: 'Inter', sans-serif;
    background-color: #f7f6f8;
    color: #0f172a;
    min-height: 100vh;
  }

  /* NAV */
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    width: 100%;
    border-bottom: 1px solid rgba(124,59,237,0.1);
    background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
  }
  .nav-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
  }
  .nav-logo {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .nav-logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: ${PRIMARY};
    color: white;
  }
  .nav-logo-text {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #0f172a;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
  }
  .nav-links a {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: ${PRIMARY}; }
  .nav-actions { display: flex; align-items: center; gap: 16px; }
  .btn-login {
    font-size: 14px;
    font-weight: 700;
    background: none;
    border: none;
    cursor: pointer;
    color: #0f172a;
    transition: color 0.2s;
  }
  .btn-login:hover { color: ${PRIMARY}; }
  .btn-signup {
    border-radius: 8px;
    background: ${PRIMARY};
    color: white;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(124,59,237,0.25);
    transition: background 0.2s;
  }
  .btn-signup:hover { background: #6b2ed6; }

  /* HERO */
  .hero {
    position: relative;
    overflow: hidden;
    padding: 80px 24px 96px;
  }
  @media (min-width: 1024px) { .hero { padding-top: 128px; } }
  .hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; }
  }
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 9999px;
    background: rgba(124,59,237,0.1);
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 600;
    color: ${PRIMARY};
    width: fit-content;
  }
  .hero-badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${PRIMARY};
    flex-shrink: 0;
  }
  .hero-title {
    font-size: clamp(40px, 6vw, 72px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -1.5px;
    color: #0f172a;
  }
  .hero-title span { color: ${PRIMARY}; }
  .hero-desc {
    font-size: 18px;
    line-height: 1.7;
    color: #475569;
    max-width: 540px;
  }
  .hero-btns { display: flex; flex-wrap: wrap; gap: 16px; }
  .btn-primary {
    border-radius: 12px;
    background: ${PRIMARY};
    color: white;
    font-size: 18px;
    font-weight: 700;
    padding: 16px 32px;
    border: none;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(124,59,237,0.3);
    transition: transform 0.2s;
  }
  .btn-primary:hover { transform: scale(1.05); }
  .btn-outline {
    border-radius: 12px;
    border: 2px solid #e2e8f0;
    background: white;
    color: #0f172a;
    font-size: 18px;
    font-weight: 700;
    padding: 16px 32px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-outline:hover { background: #f8fafc; }

  .hero-img-wrap { position: relative; }
  .hero-img-card {
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    background: white;
    padding: 8px;
    box-shadow: 0 25px 60px rgba(0,0,0,0.12);
  }
  .hero-img {
    width: 100%;
    aspect-ratio: 4/3;
    border-radius: 12px;
    object-fit: cover;
    background: #f1f5f9;
    display: block;
  }
  .hero-stat {
    position: absolute;
    bottom: -24px;
    left: -24px;
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    border: 1px solid rgba(124,59,237,0.1);
    display: flex;
    align-items: center;
    gap: 12px;
  }
  @media (max-width: 900px) { .hero-stat { display: none; } }
  .hero-stat-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(34,197,94,0.15);
    color: #16a34a;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hero-stat-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
  .hero-stat-value { font-size: 20px; font-weight: 900; color: #0f172a; }
  .hero-content { display: flex; flex-direction: column; gap: 32px; }

  /* FEATURES */
  .features { background: white; padding: 96px 24px; }
  .features-inner { max-width: 1280px; margin: 0 auto; }
  .section-tag {
    color: ${PRIMARY};
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 13px;
    margin-bottom: 16px;
    text-align: center;
  }
  .section-title {
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 900;
    color: #0f172a;
    text-align: center;
    margin-bottom: 64px;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
  @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr; } }
  .feature-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid #f1f5f9;
    background: white;
    padding: 32px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: default;
  }
  .feature-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
  .feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 12px;
    background: rgba(124,59,237,0.1);
    color: ${PRIMARY};
    margin-bottom: 24px;
    font-size: 30px;
    transition: background 0.3s, color 0.3s;
  }
  .feature-card:hover .feature-icon { background: ${PRIMARY}; color: white; }
  .feature-title { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
  .feature-desc { color: #475569; line-height: 1.6; font-size: 15px; }

  /* BROWSER MOCKUP */
  .mockup-section { padding: 96px 24px; background: #f7f6f8; }
  .mockup-inner { max-width: 1280px; margin: 0 auto; }
  .browser-window {
    background: #1e293b;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 30px 80px rgba(0,0,0,0.2);
  }
  @media (min-width: 1024px) { .browser-window { padding: 32px; } }
  .browser-dots { display: flex; gap: 8px; margin-bottom: 16px; }
  .dot { width: 14px; height: 14px; border-radius: 50%; }
  .dot-red { background: #ef4444; }
  .dot-yellow { background: #f59e0b; }
  .dot-green { background: #22c55e; }
  .browser-content {
    border-radius: 12px;
    overflow: hidden;
    background: #0f172a;
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .workflow-label {
    color: #94a3b8;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    padding: 32px;
  }
  .workflow-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }
  .workflow-table th {
    background: #1e293b;
    color: #94a3b8;
    font-weight: 600;
    padding: 10px 16px;
    text-align: left;
    font-size: 12px;
    letter-spacing: 0.5px;
  }
  .workflow-table td {
    padding: 10px 16px;
    color: #cbd5e1;
    border-bottom: 1px solid #1e293b;
  }
  .workflow-table tr:hover td { background: rgba(255,255,255,0.03); }
  .status-bar {
    display: inline-block;
    height: 8px;
    border-radius: 4px;
    background: rgba(124,59,237,0.4);
  }
  .status-bar.done { background: #22c55e; }
  .status-bar.in-progress { background: ${PRIMARY}; }
  .status-bar.pending { background: #f59e0b; }
  .workflow-tag {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 600;
  }
  .tag-done { background: rgba(34,197,94,0.15); color: #22c55e; }
  .tag-prog { background: rgba(124,59,237,0.15); color: ${PRIMARY}; }
  .tag-pend { background: rgba(245,158,11,0.15); color: #f59e0b; }

  /* LOGOS */
  .logos-section { padding: 64px 24px; background: white; }
  .logos-inner { max-width: 1280px; margin: 0 auto; text-align: center; }
  .logos-label { font-size: 14px; color: #64748b; margin-bottom: 32px; }
  .logos-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
  }
  .logo-name {
    font-size: 18px;
    font-weight: 800;
    color: #94a3b8;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* PRICING */
  .pricing-section { padding: 96px 24px 112px; background: #f7f6f8; }
  .pricing-inner { max-width: 1280px; margin: 0 auto; }
  .pricing-header { text-align: center; margin-bottom: 64px; }
  .pricing-subtitle { color: #64748b; margin-top: 8px; font-size: 16px; }
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    align-items: start;
    padding-top: 24px;
  }
  @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr; } }

  /* Base card — smooth transitions for transform + shadow + border */
  .pricing-card {
    position: relative;
    border-radius: 16px;
    border: 1px solid #e8ecf0;
    background: white;
    padding: 32px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    transform: translateY(0) scale(1);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                box-shadow 0.3s ease,
                border-color 0.3s ease;
    cursor: default;
  }

  /* Standard & Advance hover — lift up */
  .pricing-card:not(.popular):hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 24px 48px rgba(0,0,0,0.12);
    border-color: rgba(124,59,237,0.3);
  }

  /* Popular card — elevated baseline, lift further on hover */
  .pricing-card.popular {
    border: 2px solid ${PRIMARY};
    box-shadow: 0 20px 50px rgba(124,59,237,0.18);
    transform: translateY(-8px) scale(1.04);
    z-index: 10;
  }
  .pricing-card.popular:hover {
    transform: translateY(-18px) scale(1.06);
    box-shadow: 0 32px 64px rgba(124,59,237,0.28);
    border-color: ${PRIMARY};
  }

  .popular-badge {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    background: ${PRIMARY};
    color: white;
    font-size: 13px;
    font-weight: 700;
    padding: 4px 16px;
    border-radius: 9999px;
    white-space: nowrap;
    box-shadow: 0 4px 12px rgba(124,59,237,0.4);
  }
  .plan-name { font-size: 20px; font-weight: 700; color: #0f172a; }
  .plan-price { margin-top: 16px; display: flex; align-items: baseline; gap: 4px; }
  .price-amount { font-size: 40px; font-weight: 900; color: #0f172a; }
  .price-period { color: #64748b; font-size: 15px; }
  .plan-desc { margin-top: 16px; color: #475569; font-size: 15px; line-height: 1.5; }
  .plan-features { margin-top: 32px; display: flex; flex-direction: column; gap: 16px; list-style: none; }
  .plan-feature { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #334155; }
  .plan-feature .material-symbols-outlined { color: ${PRIMARY}; font-size: 22px; }
  .btn-plan-primary {
    margin-top: 40px;
    width: 100%;
    border-radius: 12px;
    background: ${PRIMARY};
    color: white;
    font-size: 16px;
    font-weight: 700;
    padding: 14px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(124,59,237,0.3);
    transition: background 0.2s;
  }
  .btn-plan-primary:hover { background: #6b2ed6; }
  .btn-plan-outline {
    margin-top: 40px;
    width: 100%;
    border-radius: 12px;
    border: 2px solid ${PRIMARY};
    background: transparent;
    color: ${PRIMARY};
    font-size: 16px;
    font-weight: 700;
    padding: 14px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .btn-plan-outline:hover { background: ${PRIMARY}; color: white; }

  /* TESTIMONIALS */
  .testimonials-section { padding: 96px 24px; background: #f7f6f8; }
  .testimonials-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    gap: 48px;
    align-items: center;
  }
  @media (max-width: 900px) { .testimonials-inner { flex-direction: column; } }
  .testimonials-left { flex: 0 0 33%; }
  .testimonials-heading { font-size: clamp(28px, 3vw, 40px); font-weight: 900; color: #0f172a; line-height: 1.2; }
  .testimonials-sub { margin-top: 16px; color: #475569; font-size: 15px; line-height: 1.6; }
  .testimonials-right { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 600px) { .testimonials-right { grid-template-columns: 1fr; } }
  .testimonial-card { border-radius: 12px; background: white; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.06); }
  .testimonial-quote { color: #475569; font-style: italic; line-height: 1.6; font-size: 15px; }
  .testimonial-author { margin-top: 24px; display: flex; align-items: center; gap: 12px; }
  .author-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    background: #e2e8f0;
  }
  .author-name { font-size: 14px; font-weight: 700; color: #0f172a; }
  .author-title { font-size: 12px; color: #64748b; }

  /* FOOTER */
  .footer { background: #0f172a; padding: 48px 24px; color: #94a3b8; }
  .footer-inner {
  width: 100%;
  margin: 0 auto;
  padding-left: clamp(16px, 4vw, 80px);
  padding-right: clamp(16px, 4vw, 80px);
}
  .footer-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 48px; }
  @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr; } }
  .footer-logo { display: flex; align-items: center; gap: 8px; color: white; margin-bottom: 16px; font-size: 20px; font-weight: 800; }
  .footer-desc { font-size: 13px; line-height: 1.6; }
  .footer-col-title { font-size: 14px; font-weight: 700; color: white; margin-bottom: 16px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .footer-links a { font-size: 13px; color: #94a3b8; text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: ${PRIMARY}; }
  .subscribe-desc { font-size: 13px; margin-bottom: 16px; }
  .subscribe-form { display: flex; gap: 8px; }
  .subscribe-input {
    flex: 1;
    border-radius: 8px;
    border: none;
    background: #1e293b;
    color: white;
    padding: 10px 16px;
    font-size: 13px;
    outline: none;
  }
  .subscribe-input:focus { box-shadow: 0 0 0 2px ${PRIMARY}; }
  .subscribe-btn {
    border-radius: 8px;
    background: ${PRIMARY};
    color: white;
    border: none;
    padding: 10px 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.2s;
  }
  .subscribe-btn:hover { background: #6b2ed6; }
  .footer-bottom {
    margin-top: 48px;
    border-top: 1px solid #1e293b;
    padding-top: 24px;
    text-align: center;
    font-size: 12px;
  }
`;

const workflowRows = [
  { task: "Design System Setup", assignee: "Alex K.", status: "done", progress: 100, label: "Done" },
  { task: "API Integration", assignee: "Sarah M.", status: "in-progress", progress: 65, label: "In Progress" },
  { task: "User Testing", assignee: "Jordan T.", status: "in-progress", progress: 40, label: "In Progress" },
  { task: "Performance Audit", assignee: "Marcus C.", status: "pending", progress: 20, label: "Pending" },
  { task: "Launch Checklist", assignee: "Riley P.", status: "pending", progress: 10, label: "Pending" },
  { task: "Release Notes", assignee: "Sam W.", status: "pending", progress: 5, label: "Pending" },
];

const tagClass = { done: "tag-done", "in-progress": "tag-prog", pending: "tag-pend" };

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="smartpm-root">
      <style>{styles}</style>

      {/* NAV */}
      <header className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="nav-logo-icon">
              <span className="material-symbols-outlined" style={{ fontSize: 22 }}>rocket_launch</span>
            </div>
            <span className="nav-logo-text">SmartPM</span>
          </div>
          <nav>
            <ul className="nav-links">
              {["Features", "Pricing", "Testimonials", "About"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </nav>
          <div className="nav-actions">
            <button
  className="btn-login"
  onClick={() => {
    console.log("clicked");
    navigate("/login");
  }}
>
  Login
</button>
            <button className="btn-signup">Sign Up</button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                New: AI-Powered Resource Allocation
              </div>
              <h1 className="hero-title">
                Smart Project Management for{" "}
                <span>High-Performance</span> Teams.
              </h1>
              <p className="hero-desc">
                Streamline your workflow, collaborate in real-time, and deliver projects faster
                with our intuitive platform designed for the modern workplace.
              </p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => navigate("/login")}>
  Get Started
</button>
                <button className="btn-outline">Watch Demo</button>
              </div>
            </div>
            <div className="hero-img-wrap">
              <div className="hero-img-card">
                <img
                  className="hero-img"
                  src={landingImg1}
                  alt="SmartPM Dashboard"
                />
              </div>
              <div className="hero-stat">
                <div className="hero-stat-icon">
                  <span className="material-symbols-outlined" style={{ fontSize: 22 }}>check_circle</span>
                </div>
                <div>
                  <p className="hero-stat-label">Tasks Completed</p>
                  <p className="hero-stat-value">1,284</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="features-inner">
            <p className="section-tag">Powerful Features</p>
            <h2 className="section-title">Everything you need to succeed</h2>
            <div className="features-grid">
              {[
                { icon: "view_kanban", title: "Kanban Board", desc: "Visualize your workflow and move tasks to completion with our drag-and-drop intuitive interface." },
                { icon: "groups", title: "Team Collaboration", desc: "Keep everyone on the same page with real-time updates, integrated chat, and shared file storage." },
                { icon: "monitoring", title: "Insightful Analytics", desc: "Gain deep insights into project health and team productivity with automated performance reports." },
              ].map(f => (
                <div className="feature-card" key={f.title}>
                  <div className="feature-icon">
                    <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{f.icon}</span>
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BROWSER MOCKUP */}
        <section className="mockup-section">
          <div className="mockup-inner">
            <div className="browser-window">
              <div className="browser-dots">
                <div className="dot dot-red" />
                <div className="dot dot-yellow" />
                <div className="dot dot-green" />
              </div>
              <div className="browser-content" style={{ padding: "0" }}>
                <div style={{ width: "100%", overflowX: "auto" }}>
                  <div style={{ padding: "24px 24px 8px", color: "#94a3b8", fontSize: 13 }}>
                    Interactive Workflow Designer
                  </div>
                  <table className="workflow-table">
                    <thead>
                      <tr>
                        <th>Task</th>
                        <th>Assignee</th>
                        <th>Progress</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {workflowRows.map((r, i) => (
                        <tr key={i}>
                          <td>{r.task}</td>
                          <td style={{ color: "#64748b" }}>{r.assignee}</td>
                          <td>
                            <div style={{ background: "#1e293b", borderRadius: 4, height: 8, width: 120 }}>
                              <div
                                className={`status-bar ${r.status}`}
                                style={{ width: `${r.progress}%`, height: 8 }}
                              />
                            </div>
                          </td>
                          <td>
                            <span className={`workflow-tag ${tagClass[r.status]}`}>{r.label}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOGOS */}
        <section className="logos-section">
          <div className="logos-inner">
            <p className="logos-label">Trusted by 20,000+ high-performance teams globally</p>
            <div className="logos-row">
              {["TECHCORP", "INNOVATE", "CLOUDSOFT", "NEXUS", "QUANTUM"].map(l => (
                <span className="logo-name" key={l}>{l}</span>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="pricing-section">
          <div className="pricing-inner">
            <div className="pricing-header">
              <h2 className="section-title" style={{ marginBottom: 8 }}>Simple, Transparent Pricing</h2>
              <p className="pricing-subtitle">Choose the plan that fits your team's growth.</p>
            </div>
            <div className="pricing-grid">
              {/* Standard */}
              <div className="pricing-card">
                <h3 className="plan-name">Standard</h3>
                <div className="plan-price">
                  <span className="price-amount">$24</span>
                  <span className="price-period">/mo</span>
                </div>
                <p className="plan-desc">Perfect for small teams just getting started.</p>
                <ul className="plan-features">
                  {["Up to 10 users", "Kanban boards", "5GB Storage"].map(f => (
                    <li className="plan-feature" key={f}>
                      <span className="material-symbols-outlined">check_circle</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="btn-plan-outline">Start Free Trial</button>
              </div>

              {/* Medium - Popular */}
              <div className="pricing-card popular">
                <div className="popular-badge">Most Popular</div>
                <h3 className="plan-name">Medium</h3>
                <div className="plan-price">
                  <span className="price-amount">$86</span>
                  <span className="price-period">/mo</span>
                </div>
                <p className="plan-desc">Advanced features for growing organizations.</p>
                <ul className="plan-features">
                  {["Unlimited users", "Advanced Analytics", "50GB Storage", "Priority Support"].map(f => (
                    <li className="plan-feature" key={f}>
                      <span className="material-symbols-outlined">check_circle</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="btn-plan-primary">Get Started</button>
              </div>

              {/* Advance */}
              <div className="pricing-card">
                <h3 className="plan-name">Advance</h3>
                <div className="plan-price">
                  <span className="price-amount">$199</span>
                  <span className="price-period">/mo</span>
                </div>
                <p className="plan-desc">Custom solutions for large scale operations.</p>
                <ul className="plan-features">
                  {["Dedicated Manager", "Custom Integrations", "Unlimited Storage", "Enterprise Security"].map(f => (
                    <li className="plan-feature" key={f}>
                      <span className="material-symbols-outlined">check_circle</span> {f}
                    </li>
                  ))}
                </ul>
                <button className="btn-plan-outline">Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="testimonials-section">
          <div className="testimonials-inner">
            <div className="testimonials-left">
              <h2 className="testimonials-heading">Loved by teams everywhere.</h2>
              <p className="testimonials-sub">Read how we've helped teams scale their impact and streamline their delivery.</p>
            </div>
            <div className="testimonials-right">
              {[
                {
                  quote: "\"SmartPM transformed our development cycle. We've seen a 30% increase in sprint velocity within just two months.\"",
                  name: "Sarah Jenkins",
                  title: "Head of Product, TechStream",
                  avatar: landingImg2
                },
                {
                  quote: "\"The analytics are unparalleled. I can finally see where our bottlenecks are and fix them before they become issues.\"",
                  name: "Marcus Chen",
                  title: "COO, GlobalOps",
                  avatar: landingImg3
                }
              ].map(t => (
                <div className="testimonial-card" key={t.name}>
                  <p className="testimonial-quote">{t.quote}</p>
                  <div className="testimonial-author">
                    <img className="author-avatar" src={t.avatar} alt={t.name} />
                    <div>
                      <p className="author-name">{t.name}</p>
                      <p className="author-title">{t.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">
                <span className="material-symbols-outlined" style={{ fontSize: 22 }}>rocket_launch</span>
                SmartPM
              </div>
              <p className="footer-desc">
                Building the future of project management, one task at a time.
                Empowering teams to do their best work.
              </p>
            </div>
            <div>
              <h4 className="footer-col-title">Product</h4>
              <ul className="footer-links">
                {["Features", "Integrations", "Roadmap", "Changelog"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-links">
                {["About Us", "Careers", "Privacy Policy", "Terms of Service"].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="footer-col-title">Subscribe</h4>
              <p className="subscribe-desc">Get the latest updates directly in your inbox.</p>
              <div className="subscribe-form">
                <input
                  className="subscribe-input"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button className="subscribe-btn">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                </button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2024 Smart Project Management Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}