import { useState } from "react";
import tasksImg1 from "./assets/tasks_img1.png";
import tasksImg2 from "./assets/tasks_img2.png";


const PRIMARY = "#7c3bed";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mso {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-weight: normal; font-style: normal;
    font-size: 22px; line-height: 1;
    letter-spacing: normal; text-transform: none;
    display: inline-block; white-space: nowrap;
    direction: ltr; -webkit-font-smoothing: antialiased;
    user-select: none;
  }
  .mso-xs  { font-size: 14px; }
  .mso-sm  { font-size: 18px; }
  .mso-lg  { font-size: 26px; }
  .mso-filled { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

  .task-root {
    font-family: 'Inter', sans-serif;
    background: #f7f6f8;
    display: flex;
    height: 100vh;
    overflow: hidden;
    color: #0f172a;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: 240px; min-width: 240px;
    background: white;
    border-right: 1px solid rgba(124,59,237,0.1);
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden; flex-shrink: 0;
  }
  .sidebar-brand {
    display: flex; align-items: center; gap: 10px;
    padding: 20px 24px 16px;
  }
  .brand-icon {
    background: ${PRIMARY}; border-radius: 8px;
    padding: 6px; color: white;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .brand-icon .mso { font-size: 20px; }
  .brand-name { font-size: 16px; font-weight: 800; color: #0f172a; letter-spacing: -0.3px; }

  .sidebar-nav {
    flex: 1; padding: 4px 16px;
    display: flex; flex-direction: column; gap: 2px; overflow-y: auto;
  }
  .nav-link {
    display: flex; align-items: center; gap: 12px;
    padding: 9px 12px; border-radius: 8px;
    font-size: 14px; font-weight: 500; color: #475569;
    cursor: pointer; background: none; border: none;
    width: 100%; text-align: left;
    transition: background 0.15s, color 0.15s;
  }
  .nav-link:hover { background: rgba(124,59,237,0.05); color: #0f172a; }
  .nav-link:hover .mso { color: ${PRIMARY}; }
  .nav-link.active { background: rgba(124,59,237,0.08); color: ${PRIMARY}; font-weight: 600; }
  .nav-link .mso { font-size: 22px; flex-shrink: 0; color: #94a3b8; }
  .nav-link.active .mso { color: ${PRIMARY}; }

  .sidebar-footer {
    padding: 12px 16px 20px;
    border-top: 1px solid rgba(124,59,237,0.08);
  }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }

  /* TOPBAR */
  .topbar {
    height: 64px; background: rgba(255,255,255,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(124,59,237,0.08);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; flex-shrink: 0; gap: 16px;
    position: sticky; top: 0; z-index: 10;
  }
  .breadcrumb {
    display: flex; align-items: center; gap: 6px;
    font-size: 13px;
  }
  .bc-item { color: #94a3b8; cursor: pointer; transition: color 0.15s; }
  .bc-item:hover { color: #475569; }
  .bc-sep { color: #cbd5e1; font-size: 14px; }
  .bc-current { color: #0f172a; font-weight: 600; }

  .topbar-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
  .search-wrap { position: relative; }
  .search-icon {
    position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
    color: #94a3b8; font-size: 17px; pointer-events: none;
  }
  .search-input {
    background: rgba(124,59,237,0.05); border: none; border-radius: 8px;
    padding: 8px 14px 8px 34px;
    font-size: 13px; font-family: 'Inter', sans-serif; color: #0f172a;
    outline: none; width: 240px; transition: box-shadow 0.2s;
  }
  .search-input::placeholder { color: #94a3b8; }
  .search-input:focus { box-shadow: 0 0 0 2px rgba(124,59,237,0.2); }
  .share-btn {
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(124,59,237,0.1); color: ${PRIMARY};
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s;
  }
  .share-btn:hover { background: rgba(124,59,237,0.18); }

  /* ── CONTENT ── */
  .content { flex: 1; overflow-y: auto; padding: 32px; }
  .content-inner { max-width: 1024px; margin: 0 auto; }

  /* PAGE HEADER */
  .page-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 20px; margin-bottom: 32px;
  }
  .task-title { font-size: 28px; font-weight: 900; letter-spacing: -0.5px; color: #0f172a; margin-bottom: 12px; }
  .task-badges { display: flex; flex-wrap: wrap; gap: 10px; }
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 5px 12px; border-radius: 99px;
    font-size: 12px; font-weight: 700;
  }
  .badge .mso { font-size: 13px; }
  .badge-red    { background: #fee2e2; color: #dc2626; }
  .badge-purple { background: rgba(124,59,237,0.1); color: ${PRIMARY}; }

  .btn-edit {
    background: ${PRIMARY}; color: white;
    border: none; border-radius: 10px;
    padding: 10px 24px; font-size: 14px; font-weight: 700;
    cursor: pointer; white-space: nowrap; flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(124,59,237,0.3);
    transition: background 0.2s, transform 0.15s;
  }
  .btn-edit:hover { background: #6b2ed6; transform: translateY(-1px); }

  /* GRID */
  .detail-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 28px;
    align-items: start;
  }
  .left-col { display: flex; flex-direction: column; gap: 24px; }
  .right-col { display: flex; flex-direction: column; gap: 20px; }

  /* CARDS */
  .card {
    background: white;
    border: 1px solid rgba(124,59,237,0.08);
    border-radius: 14px; padding: 24px;
  }
  .card-label {
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1.2px;
    color: #94a3b8; margin-bottom: 16px;
  }

  /* DESCRIPTION */
  .desc-text {
    font-size: 14px; color: #475569; line-height: 1.75;
  }

  /* DISCUSSION */
  .discussion-section { display: flex; flex-direction: column; gap: 16px; }

  /* Comment input */
  .comment-input-card {
    background: white;
    border: 1px solid rgba(124,59,237,0.08);
    border-radius: 14px; padding: 16px;
  }
  .comment-textarea {
    width: 100%; border: none; outline: none; resize: none;
    font-size: 13px; font-family: 'Inter', sans-serif;
    color: #0f172a; background: transparent; line-height: 1.6;
  }
  .comment-textarea::placeholder { color: #94a3b8; }
  .comment-toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 10px; padding-top: 10px;
    border-top: 1px solid rgba(124,59,237,0.05);
  }
  .toolbar-icons { display: flex; gap: 6px; }
  .toolbar-icon-btn {
    background: none; border: none; cursor: pointer;
    color: #94a3b8; padding: 4px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.15s, background 0.15s;
  }
  .toolbar-icon-btn:hover { color: ${PRIMARY}; background: rgba(124,59,237,0.06); }
  .btn-comment {
    background: rgba(124,59,237,0.1); color: ${PRIMARY};
    border: none; border-radius: 8px;
    padding: 6px 16px; font-size: 12px; font-weight: 700;
    cursor: pointer; transition: background 0.15s;
  }
  .btn-comment:hover { background: rgba(124,59,237,0.18); }

  /* Comment items */
  .comments-list { display: flex; flex-direction: column; gap: 14px; }
  .comment-row { display: flex; gap: 14px; }
  .comment-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    flex-shrink: 0; overflow: hidden; object-fit: cover;
  }
  .comment-avatar-initials {
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(124,59,237,0.15); color: ${PRIMARY};
    font-size: 13px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .comment-bubble {
    flex: 1;
    background: white;
    border: 1px solid rgba(124,59,237,0.08);
    border-radius: 14px; padding: 14px 16px;
  }
  .comment-meta {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 6px;
  }
  .comment-author { font-size: 12px; font-weight: 700; color: #0f172a; }
  .comment-time   { font-size: 10px; color: #94a3b8; }
  .comment-text   { font-size: 13px; color: #475569; line-height: 1.55; }

  /* RIGHT PANEL META CARD */
  .meta-section { display: flex; flex-direction: column; gap: 20px; }
  .meta-block { }
  .meta-label {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.2px; color: #94a3b8; margin-bottom: 10px;
  }
  .assignee-row { display: flex; align-items: center; gap: 12px; }
  .assignee-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    overflow: hidden; flex-shrink: 0;
  }
  .assignee-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .assignee-name { font-size: 14px; font-weight: 700; color: #0f172a; }
  .assignee-role { font-size: 12px; color: #64748b; margin-top: 1px; }

  .due-date-row { display: flex; align-items: center; gap: 8px; }
  .due-date-row .mso { color: ${PRIMARY}; font-size: 20px; }
  .due-date-text { font-size: 14px; font-weight: 600; color: #0f172a; }

  .divider-h { border: none; border-top: 1px solid rgba(124,59,237,0.06); margin: 4px 0; }

  .progress-row-top {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px;
  }
  .progress-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #94a3b8; }
  .progress-pct   { font-size: 12px; font-weight: 700; color: ${PRIMARY}; }
  .progress-track {
    width: 100%; height: 8px; background: rgba(124,59,237,0.1);
    border-radius: 99px; overflow: hidden;
  }
  .progress-fill { height: 100%; background: ${PRIMARY}; border-radius: 99px; }

  /* ACTIVITY */
  .activity-list { display: flex; flex-direction: column; }
  .activity-item {
    display: flex; gap: 12px;
    position: relative; padding-bottom: 20px;
  }
  .activity-item:last-child { padding-bottom: 0; }
  .activity-item:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 6px; top: 18px;
    width: 1px; bottom: 0;
    background: rgba(124,59,237,0.1);
  }
  .activity-dot {
    width: 14px; height: 14px; border-radius: 50%;
    flex-shrink: 0; margin-top: 2px; z-index: 1;
  }
  .dot-primary { background: ${PRIMARY}; }
  .dot-gray    { background: #e2e8f0; }
  .activity-text {
    font-size: 12px; color: #475569; line-height: 1.55;
  }
  .activity-text strong { color: #0f172a; font-weight: 600; }
  .activity-time { font-size: 10px; color: #94a3b8; margin-top: 3px; }
`;

const NAV = [
  { icon: "dashboard",     label: "Dashboard" },
  { icon: "folder",        label: "Projects", active: true, filled: true },
  { icon: "checklist",     label: "Tasks" },
  { icon: "group",         label: "Team" },
  { icon: "notifications", label: "Notifications" },
];

const ACTIVITY = [
  { dot: "dot-primary", text: <><strong>Sarah Jenkins</strong> moved task to <strong>In Progress</strong></>, time: "Today at 10:45 AM" },
  { dot: "dot-gray",    text: <><strong>Alex Rivera</strong> attached <strong>StyleGuide_v2.pdf</strong></>,  time: "Oct 18 at 03:12 PM" },
  { dot: "dot-gray",    text: <><strong>System</strong> created the task</>,                                  time: "Oct 15 at 09:00 AM" },
];

export default function SmartPMTaskDetail() {
  const [comment, setComment] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="task-root">
      <style>{css}</style>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="mso">rocket_launch</span>
          </div>
          <span className="brand-name">SmartProject</span>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(({ icon, label, active, filled }) => (
            <button key={label} className={`nav-link${active ? " active" : ""}`}>
              <span className={`mso${active && filled ? " mso-filled" : ""}`}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-link">
            <span className="mso">settings</span>
            Settings
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <nav className="breadcrumb">
            <span className="bc-item">Projects</span>
            <span className="mso mso-xs bc-sep">chevron_right</span>
            <span className="bc-item">UI Design</span>
            <span className="mso mso-xs bc-sep">chevron_right</span>
            <span className="bc-current">Final UI Review</span>
          </nav>

          <div className="topbar-right">
            <div className="search-wrap">
              <span className="mso search-icon">search</span>
              <input
                className="search-input"
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="share-btn">
              <span className="mso mso-sm">share</span>
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">
          <div className="content-inner">

            {/* PAGE HEADER */}
            <div className="page-header">
              <div>
                <h1 className="task-title">Final UI Review</h1>
                <div className="task-badges">
                  <span className="badge badge-red">
                    <span className="mso">priority_high</span>
                    High Priority
                  </span>
                  <span className="badge badge-purple">
                    <span className="mso">sync</span>
                    In Progress
                  </span>
                </div>
              </div>
              <button className="btn-edit">Edit Task</button>
            </div>

            {/* DETAIL GRID */}
            <div className="detail-grid">

              {/* ── LEFT ── */}
              <div className="left-col">

                {/* Description */}
                <div className="card">
                  <div className="card-label">Description</div>
                  <p className="desc-text">
                    Complete the comprehensive audit of all dashboard elements and button states.
                    Ensure color contrast meets accessibility standards and hover states are
                    consistent across the library.
                  </p>
                </div>

                {/* Discussion */}
                <div className="discussion-section">
                  <div className="card-label" style={{ paddingLeft: 4 }}>Discussion</div>

                  {/* Comment input */}
                  <div className="comment-input-card">
                    <textarea
                      className="comment-textarea"
                      placeholder="Write a comment..."
                      rows={3}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <div className="comment-toolbar">
                      <div className="toolbar-icons">
                        <button className="toolbar-icon-btn">
                          <span className="mso mso-sm">attach_file</span>
                        </button>
                        <button className="toolbar-icon-btn">
                          <span className="mso mso-sm">sentiment_satisfied</span>
                        </button>
                      </div>
                      <button className="btn-comment">Comment</button>
                    </div>
                  </div>

                  {/* Comments list */}
                  <div className="comments-list">
                    {/* Marcus J. */}
                    <div className="comment-row">
                      <div className="comment-avatar-initials">MJ</div>
                      <div className="comment-bubble">
                        <div className="comment-meta">
                          <span className="comment-author">Marcus J.</span>
                          <span className="comment-time">2 hours ago</span>
                        </div>
                        <p className="comment-text">
                          I've uploaded the latest button variants in the shared Figma file. Please check page 3.
                        </p>
                      </div>
                    </div>

                    {/* Sarah Jenkins */}
                    <div className="comment-row">
                      <img
                        className="comment-avatar"
                        src={tasksImg1}
                        alt="Sarah Jenkins"
                      />
                      <div className="comment-bubble">
                        <div className="comment-meta">
                          <span className="comment-author">Sarah Jenkins</span>
                          <span className="comment-time">Just now</span>
                        </div>
                        <p className="comment-text">Thanks Marcus! Starting the review now.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── RIGHT ── */}
              <div className="right-col">

                {/* Meta card */}
                <div className="card">
                  <div className="meta-section">

                    {/* Assigned To */}
                    <div className="meta-block">
                      <div className="meta-label">Assigned To</div>
                      <div className="assignee-row">
                        <div className="assignee-avatar">
                          <img
                            src={tasksImg2}
                            alt="Sarah Jenkins"
                          />
                        </div>
                        <div>
                          <div className="assignee-name">Sarah Jenkins</div>
                          <div className="assignee-role">UI Designer</div>
                        </div>
                      </div>
                    </div>

                    {/* Due Date */}
                    <div className="meta-block">
                      <div className="meta-label">Due Date</div>
                      <div className="due-date-row">
                        <span className="mso">calendar_today</span>
                        <span className="due-date-text">Oct 24, 2023</span>
                      </div>
                    </div>

                    <hr className="divider-h" />

                    {/* Task Progress */}
                    <div className="meta-block">
                      <div className="progress-row-top">
                        <span className="progress-label">Task Progress</span>
                        <span className="progress-pct">65%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: "65%" }} />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Activity card */}
                <div className="card">
                  <div className="card-label">Activity</div>
                  <div className="activity-list">
                    {ACTIVITY.map((item, i) => (
                      <div key={i} className="activity-item">
                        <div className={`activity-dot ${item.dot}`} />
                        <div>
                          <div className="activity-text">{item.text}</div>
                          <div className="activity-time">{item.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}