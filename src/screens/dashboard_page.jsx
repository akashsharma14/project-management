import { useState } from "react";
import { NAV_ITEMS } from "../navItems";
import { useNavigate, useLocation } from "react-router-dom";
import dashboardImg1 from "../assets/dashboard_img1.png";
import dashboardImg2 from "../assets/dashboard_img2.png";
import dashboardImg3 from "../assets/dashboard_img3.png";
import dashboardImg4 from "../assets/dashboard_img4.png";
import dashboardImg5 from "../assets/dashboard_img5.png";
import dashboardImg6 from "../assets/dashboard_img6.png";
import dashboardImg7 from "../assets/dashboard_img7.png";


const PRIMARY = "#7c3bed";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mso {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-weight: normal;
    font-style: normal;
    font-size: 22px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-smoothing: antialiased;
  }
  .mso-filled {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }

  .dash-root {
    font-family: 'Inter', sans-serif;
    background: #f7f6f8;
    display: flex;
    height: 100vh;
    overflow: hidden;
    color: #0f172a;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px;
    min-width: 240px;
    background: white;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
  }

  .sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px 24px;
  }
  .brand-icon {
    width: 40px; height: 40px;
    background: ${PRIMARY};
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: white;
    flex-shrink: 0;
  }
  .brand-icon .mso { font-size: 20px; }
  .brand-title { font-size: 14px; font-weight: 700; color: #0f172a; line-height: 1.2; }
  .brand-sub { font-size: 11px; color: #94a3b8; margin-top: 2px; }

  .sidebar-nav {
    flex: 1;
    padding: 8px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow-y: auto;
  }
  .nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: #475569;
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
  }
  .nav-link:hover { background: #f8fafc; color: #0f172a; }
  .nav-link.active {
    background: rgba(124,59,237,0.08);
    color: ${PRIMARY};
    font-weight: 600;
  }
  .nav-link .mso { font-size: 20px; flex-shrink: 0; }

  .sidebar-upgrade {
    padding: 16px;
    border-top: 1px solid #e2e8f0;
  }
  .upgrade-card {
    background: rgba(124,59,237,0.05);
    border-radius: 12px;
    padding: 16px;
  }
  .upgrade-label {
    font-size: 11px;
    font-weight: 700;
    color: ${PRIMARY};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 6px;
  }
  .upgrade-desc {
    font-size: 12px;
    color: #475569;
    line-height: 1.5;
    margin-bottom: 12px;
  }
  .upgrade-btn {
    width: 100%;
    background: ${PRIMARY};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 0;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .upgrade-btn:hover { background: #6b2ed6; transform: translateY(-1px); }

  /* ── MAIN ── */
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
  }

  /* TOP BAR */
  .topbar {
    height: 64px;
    background: white;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px;
    flex-shrink: 0;
    gap: 16px;
  }
  .search-wrap {
    position: relative;
    flex: 1;
    max-width: 380px;
  }
  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #94a3b8;
    font-size: 18px;
    pointer-events: none;
  }
  .search-input {
    width: 100%;
    background: #f1f5f9;
    border: none;
    border-radius: 8px;
    padding: 9px 14px 9px 38px;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    color: #0f172a;
    outline: none;
    transition: box-shadow 0.2s;
  }
  .search-input::placeholder { color: #94a3b8; }
  .search-input:focus { box-shadow: 0 0 0 3px rgba(124,59,237,0.12); }

  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .btn-create {
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${PRIMARY};
    color: white;
    border: none;
    border-radius: 8px;
    padding: 9px 18px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: box-shadow 0.2s, transform 0.15s;
  }
  .btn-create .mso { font-size: 18px; }
  .btn-create:hover { box-shadow: 0 4px 14px rgba(124,59,237,0.35); transform: translateY(-1px); }
  .btn-create:active { transform: translateY(0); }

  .divider-v { width: 1px; height: 32px; background: #e2e8f0; margin: 0 4px; }

  .notif-btn {
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    color: #475569;
    transition: background 0.15s;
    display: flex; align-items: center; justify-content: center;
  }
  .notif-btn:hover { background: #f1f5f9; }
  .notif-dot {
    position: absolute;
    top: 8px; right: 8px;
    width: 8px; height: 8px;
    background: #ef4444;
    border-radius: 50%;
    border: 2px solid white;
  }

  .avatar-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    transition: opacity 0.15s;
  }
  .avatar-btn:hover { opacity: 0.85; }
  .topbar-avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #e2e8f0;
    display: block;
  }

  /* ── CONTENT ── */
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .page-head { }
  .page-title { font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px; }
  .page-sub { font-size: 14px; color: #64748b; margin-top: 4px; }

  /* STAT CARDS */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .stat-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    transition: box-shadow 0.2s, transform 0.2s;
  }
  .stat-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .stat-top { display: flex; align-items: flex-start; justify-content: space-between; }
  .stat-label { font-size: 13px; color: #64748b; font-weight: 500; }
  .stat-value { font-size: 32px; font-weight: 800; color: #0f172a; margin-top: 6px; letter-spacing: -1px; }
  .stat-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .stat-icon .mso { font-size: 22px; }
  .stat-footer { margin-top: 16px; display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 500; }

  .icon-blue { background: #eff6ff; color: #3b82f6; }
  .icon-green { background: #f0fdf4; color: #22c55e; }
  .icon-amber { background: #fffbeb; color: #f59e0b; }
  .icon-purple { background: rgba(124,59,237,0.08); color: ${PRIMARY}; }

  .trend-up { color: #16a34a; }
  .trend-neutral { color: #64748b; }

  .avatar-stack { display: flex; margin-top: 16px; }
  .stack-avatar {
    width: 24px; height: 24px;
    border-radius: 50%;
    border: 2px solid white;
    object-fit: cover;
    margin-left: -6px;
    background: #e2e8f0;
  }
  .stack-avatar:first-child { margin-left: 0; }
  .stack-more {
    width: 24px; height: 24px;
    border-radius: 50%;
    border: 2px solid white;
    background: ${PRIMARY};
    color: white;
    font-size: 9px;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    margin-left: -6px;
  }

  /* BOTTOM GRID */
  .bottom-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  /* ACTIVITY */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  .section-title { font-size: 17px; font-weight: 700; color: #0f172a; }
  .view-all-btn {
    font-size: 13px;
    font-weight: 600;
    color: ${PRIMARY};
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity 0.15s;
  }
  .view-all-btn:hover { opacity: 0.75; }

  .activity-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    overflow: hidden;
  }
  .activity-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    border-bottom: 1px solid #f1f5f9;
    transition: background 0.15s;
    cursor: default;
  }
  .activity-item:last-child { border-bottom: none; }
  .activity-item:hover { background: #f8fafc; }

  .act-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    background: #e2e8f0;
  }
  .act-avatar-icon {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: rgba(124,59,237,0.12);
    color: ${PRIMARY};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .act-avatar-icon .mso { font-size: 18px; }

  .act-body { flex: 1; min-width: 0; }
  .act-text { font-size: 13px; color: #0f172a; line-height: 1.5; }
  .act-text .bold { font-weight: 600; }
  .act-text .italic { font-style: italic; font-weight: 500; }
  .act-text .link { color: ${PRIMARY}; font-weight: 500; cursor: pointer; }
  .act-time-sub { font-size: 11px; color: #94a3b8; margin-top: 3px; }
  .act-time { font-size: 12px; color: #94a3b8; font-weight: 500; flex-shrink: 0; }

  /* DEADLINES */
  .deadlines-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .deadline-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 8px;
  }
  .deadline-item.urgent {
    background: #fef2f2;
    border: 1px solid #fee2e2;
  }
  .deadline-item.normal {
    background: #f8fafc;
    border: 1px solid transparent;
  }
  .deadline-item .mso { font-size: 20px; flex-shrink: 0; }
  .deadline-name { font-size: 13px; font-weight: 600; color: #0f172a; }
  .deadline-due { font-size: 11px; margin-top: 2px; font-weight: 500; }
  .due-urgent { color: #dc2626; }
  .due-normal { color: #64748b; }

  .calendar-btn {
    width: 100%;
    background: none;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;
    font-size: 13px;
    font-weight: 700;
    color: #475569;
    cursor: pointer;
    margin-top: 4px;
    transition: background 0.15s, border-color 0.15s;
  }
  .calendar-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
`;

const TEAM_AVATARS = [
    dashboardImg2,
    dashboardImg3,
    dashboardImg4
];

const ACTIVITIES = [
  {
    avatar: dashboardImg5,
    text: [
      { type: "bold", value: "Mufulul Islam Tapadar" },
      { type: "text", value: " updated the project " },
      { type: "link", value: '"SaaS Design System"' },
    ],
    sub: "2 hours ago",
    time: "Just now",
  },
  {
    avatar: dashboardImg6,
    text: [
      { type: "bold", value: "Sarah Chen" },
      { type: "text", value: " completed task " },
      { type: "italic", value: '"Review User Flows"' },
      { type: "text", value: " in " },
      { type: "link", value: '"Mobile App Refresh"' },
    ],
    sub: "4 hours ago",
    time: "4h ago",
  },
  {
    avatar: dashboardImg7,
    text: [
      { type: "bold", value: "Marcus" },
      { type: "text", value: " added " },
      { type: "bold", value: "2 new files" },
      { type: "text", value: " to the project " },
      { type: "link", value: '"Internal Dashboard"' },
    ],
    sub: "Yesterday at 5:30 PM",
    time: "1d ago",
  },
  {
    icon: "rocket",
    text: [
      { type: "text", value: "Project " },
      { type: "link", value: '"Marketing Q4"' },
      { type: "text", value: " was officially launched." },
    ],
    sub: "2 days ago",
    time: "2d ago",
  },
];

const DEADLINES = [
  { urgent: true, icon: "warning", iconColor: "#ef4444", name: "Final UI Review", due: "Due in 2 hours", urgent_text: true },
  { urgent: false, icon: "event", iconColor: "#94a3b8", name: "API Integration Docs", due: "Due tomorrow, 10:00 AM" },
  { urgent: false, icon: "event", iconColor: "#94a3b8", name: "Q3 Budget Approval", due: "Due Oct 24, 2023" },
];

function renderText(parts) {
  return parts.map((p, i) => {
    if (p.type === "bold") return <span key={i} className="bold">{p.value}</span>;
    if (p.type === "italic") return <span key={i} className="italic">{p.value}</span>;
    if (p.type === "link") return <span key={i} className="link">{p.value}</span>;
    return <span key={i}>{p.value}</span>;
  });
}

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dash-root">
      <style>{css}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="mso">rocket_launch</span>
          </div>
          <div>
            <div className="brand-title">Smart Project</div>
            <div className="brand-sub">Management SaaS</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ icon, label, path }) => {
  const isActive = location.pathname === path;

  return (
    <button
      key={label}
      className={`nav-link${isActive ? " active" : ""}`}
      onClick={() => navigate(path)}
    >
      <span className={`mso${isActive ? " mso-filled" : ""}`}>
        {icon}
      </span>
      {label}
    </button>
  );
})}
        </nav>

        <div className="sidebar-upgrade">
          <div className="upgrade-card">
            <div className="upgrade-label">Upgrade Pro</div>
            <div className="upgrade-desc">Get unlimited projects and advanced analytics.</div>
            <button className="upgrade-btn">Upgrade Now</button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="search-wrap">
            <span className="mso search-icon">search</span>
            <input
              className="search-input"
              type="text"
              placeholder="Global search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="topbar-right">
            <button className="btn-create">
              <span className="mso">add</span>
              Create Project
            </button>
            <div className="divider-v" />
            <button className="notif-btn">
              <span className="mso">notifications</span>
              <span className="notif-dot" />
            </button>
            <button className="avatar-btn">
              <img
                className="topbar-avatar"
                src={dashboardImg1}
                alt="User Avatar"
              />
            </button>
          </div>
        </header>

        {/* SCROLLABLE CONTENT */}
        <div className="content">
          {/* PAGE HEAD */}
          <div className="page-head">
            <h2 className="page-title">Dashboard Overview</h2>
            <p className="page-sub">Welcome back, here's what's happening with your projects today.</p>
          </div>

          {/* STAT CARDS */}
          <div className="stat-grid">
            {/* Total Projects */}
            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <div className="stat-label">Total Projects</div>
                  <div className="stat-value">4</div>
                </div>
                <div className="stat-icon icon-blue">
                  <span className="mso">folder</span>
                </div>
              </div>
              <div className="stat-footer trend-up">
                <span className="mso" style={{ fontSize: 14 }}>trending_up</span>
                <span>+1 this month</span>
              </div>
            </div>

            {/* Tasks Completed */}
            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <div className="stat-label">Tasks Completed</div>
                  <div className="stat-value">12</div>
                </div>
                <div className="stat-icon icon-green">
                  <span className="mso">check_circle</span>
                </div>
              </div>
              <div className="stat-footer trend-up">
                <span className="mso" style={{ fontSize: 14 }}>trending_up</span>
                <span>82% success rate</span>
              </div>
            </div>

            {/* Pending Tasks */}
            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <div className="stat-label">Pending Tasks</div>
                  <div className="stat-value">8</div>
                </div>
                <div className="stat-icon icon-amber">
                  <span className="mso">pending_actions</span>
                </div>
              </div>
              <div className="stat-footer trend-neutral">
                <span className="mso" style={{ fontSize: 14 }}>schedule</span>
                <span>3 due today</span>
              </div>
            </div>

            {/* Team Members */}
            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <div className="stat-label">Team Members</div>
                  <div className="stat-value">5</div>
                </div>
                <div className="stat-icon icon-purple">
                  <span className="mso">groups</span>
                </div>
              </div>
              <div className="avatar-stack">
                {TEAM_AVATARS.map((src, i) => (
                  <img key={i} className="stack-avatar" src={src} alt="team member" />
                ))}
                <div className="stack-more">+2</div>
              </div>
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className="bottom-grid">
            {/* Recent Activity */}
            <div>
              <div className="section-header">
                <div className="section-title">Recent Activity</div>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="activity-card">
                {ACTIVITIES.map((item, i) => (
                  <div key={i} className="activity-item">
                    {item.avatar ? (
                      <img className="act-avatar" src={item.avatar} alt="user" />
                    ) : (
                      <div className="act-avatar-icon">
                        <span className="mso">{item.icon}</span>
                      </div>
                    )}
                    <div className="act-body">
                      <div className="act-text">{renderText(item.text)}</div>
                      <div className="act-time-sub">{item.sub}</div>
                    </div>
                    <div className="act-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div>
              <div className="section-header">
                <div className="section-title">Upcoming Deadlines</div>
              </div>
              <div className="deadlines-card">
                {DEADLINES.map((d, i) => (
                  <div key={i} className={`deadline-item ${d.urgent ? "urgent" : "normal"}`}>
                    <span className="mso" style={{ color: d.iconColor }}>{d.icon}</span>
                    <div>
                      <div className="deadline-name">{d.name}</div>
                      <div className={`deadline-due ${d.urgent ? "due-urgent" : "due-normal"}`}>{d.due}</div>
                    </div>
                  </div>
                ))}
                <button className="calendar-btn">View Full Calendar</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}