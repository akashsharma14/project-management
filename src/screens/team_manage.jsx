import { useState } from "react";
import teamImg1 from "../assets/team_img1.png";
import teamImg2 from "../assets/team_img2.png";
import teamImg3 from "../assets/team_img3.png";
import teamImg4 from "../assets/team_img4.png";
import teamImg5 from "../assets/team_img5.png";

const PRIMARY = "#7c3bed";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mso {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-weight: normal; font-style: normal; font-size: 22px; line-height: 1;
    letter-spacing: normal; text-transform: none;
    display: inline-block; white-space: nowrap;
    direction: ltr; -webkit-font-smoothing: antialiased; user-select: none;
  }
  .mso-xs   { font-size: 14px; }
  .mso-sm   { font-size: 18px; }
  .mso-filled { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }

  .team-root {
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
    border-right: 1px solid #e8e4f0;
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden; flex-shrink: 0;
  }
  .sidebar-brand {
    display: flex; align-items: center; gap: 11px;
    padding: 20px 20px 18px;
  }
  .brand-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: ${PRIMARY}; color: white;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .brand-icon .mso { font-size: 20px; }
  .brand-name { font-size: 15px; font-weight: 800; color: #0f172a; line-height: 1.2; }
  .brand-sub  { font-size: 11px; color: #94a3b8; font-weight: 500; }

  .sidebar-nav {
    flex: 1; padding: 4px 14px;
    display: flex; flex-direction: column; gap: 2px;
  }
  .nav-link {
    display: flex; align-items: center; gap: 12px;
    padding: 9px 12px; border-radius: 8px;
    font-size: 14px; font-weight: 500; color: #475569;
    cursor: pointer; background: none; border: none;
    width: 100%; text-align: left;
    transition: background 0.15s, color 0.15s;
    position: relative;
  }
  .nav-link:hover { background: rgba(124,59,237,0.05); color: #0f172a; }
  .nav-link:hover .nav-icon { color: ${PRIMARY}; }
  .nav-link.active { color: ${PRIMARY}; font-weight: 700; background: transparent; }
  .nav-link.active::before {
    content: '';
    position: absolute; left: -14px; top: 4px; bottom: 4px;
    width: 3px; background: ${PRIMARY}; border-radius: 0 3px 3px 0;
  }
  .nav-icon { font-size: 22px; flex-shrink: 0; color: #94a3b8; }
  .nav-link.active .nav-icon { color: ${PRIMARY}; }

  .sidebar-footer {
    padding: 14px; border-top: 1px solid #f0edf8;
  }
  .pro-plan-card {
    background: rgba(124,59,237,0.07); border-radius: 12px; padding: 12px 14px;
    display: flex; align-items: center; gap: 10px;
  }
  .pro-icon {
    width: 32px; height: 32px; border-radius: 50%;
    background: ${PRIMARY}; color: white;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .pro-icon .mso { font-size: 16px; }
  .pro-label { font-size: 13px; font-weight: 700; color: #0f172a; }
  .pro-bar-bg { width: 90px; height: 4px; background: #e2d9f3; border-radius: 99px; margin-top: 5px; overflow: hidden; }
  .pro-bar-fill { height: 100%; background: ${PRIMARY}; border-radius: 99px; width: 60%; }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }

  /* TOPBAR */
  .topbar {
    height: 64px; background: white;
    border-bottom: 1px solid #e8e4f0;
    display: flex; align-items: center;
    padding: 0 28px; flex-shrink: 0; gap: 0;
  }
  .topbar-search { position: relative; flex: 1; max-width: 480px; }
  .topbar-search-icon {
    position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
    color: #94a3b8; font-size: 18px; pointer-events: none;
  }
  .topbar-search-input {
    width: 100%; background: transparent; border: none; outline: none;
    padding: 9px 14px 9px 38px;
    font-size: 13px; font-family: 'Inter', sans-serif; color: #0f172a;
  }
  .topbar-search-input::placeholder { color: #94a3b8; }

  .topbar-right {
    display: flex; align-items: center; gap: 16px;
    flex-shrink: 0; margin-left: auto;
  }
  .btn-invite {
    display: flex; align-items: center; gap: 7px;
    background: ${PRIMARY}; color: white; border: none;
    border-radius: 8px; padding: 9px 20px;
    font-size: 13px; font-weight: 700; cursor: pointer;
    box-shadow: 0 3px 12px rgba(124,59,237,0.28);
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .btn-invite:hover { background: #6b2ed6; transform: translateY(-1px); }
  .btn-invite .mso { font-size: 18px; }

  .topbar-user { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .topbar-user-info { text-align: right; }
  .topbar-user-name { font-size: 13px; font-weight: 700; color: #0f172a; }
  .topbar-user-role { font-size: 11px; color: #94a3b8; }
  .topbar-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    object-fit: cover; border: 2px solid rgba(124,59,237,0.15);
  }

  /* ── CONTENT ── */
  .content { flex: 1; overflow-y: auto; padding: 32px 28px; }

  .page-title { font-size: 28px; font-weight: 900; letter-spacing: -0.5px; color: #0f172a; }
  .page-sub   { font-size: 14px; color: #64748b; margin-top: 6px; }

  /* TOOLBAR */
  .toolbar {
    display: flex; align-items: center; justify-content: space-between;
    margin: 24px 0 16px;
  }
  .toolbar-left { display: flex; align-items: center; gap: 10px; }

  .btn-filter {
    display: flex; align-items: center; gap: 7px;
    background: white; border: 1px solid #e2e8f0; border-radius: 8px;
    padding: 7px 14px; font-size: 13px; font-weight: 600; color: #475569;
    cursor: pointer; transition: border-color 0.15s, color 0.15s;
  }
  .btn-filter:hover { border-color: ${PRIMARY}; color: ${PRIMARY}; }
  .btn-filter .mso { font-size: 17px; }

  .role-select {
    background: white; border: 1px solid #e2e8f0; border-radius: 8px;
    padding: 7px 28px 7px 12px; font-size: 13px; font-weight: 600;
    color: #475569; cursor: pointer; outline: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 10px center;
    transition: border-color 0.15s;
  }
  .role-select:focus { border-color: ${PRIMARY}; }

  .toolbar-stats { display: flex; align-items: center; gap: 18px; font-size: 13px; font-weight: 600; }
  .stat-active  { color: #22c55e; }
  .stat-invited { color: #f59e0b; }
  .stat-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px; }
  .dot-green  { background: #22c55e; }
  .dot-amber  { background: #f59e0b; }

  /* TABLE */
  .members-table {
    background: white; border: 1px solid #e8e4f0;
    border-radius: 14px; overflow: hidden;
  }
  .table-header {
    display: grid;
    grid-template-columns: 1fr 180px 160px 120px;
    padding: 12px 24px;
    border-bottom: 1px solid #f0edf8;
  }
  .th {
    font-size: 11px; font-weight: 700; color: #94a3b8;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .th-right { text-align: right; }

  .table-row {
    display: grid;
    grid-template-columns: 1fr 180px 160px 120px;
    padding: 16px 24px;
    border-bottom: 1px solid #f8f6fc;
    align-items: center;
    transition: background 0.12s;
  }
  .table-row:last-child { border-bottom: none; }
  .table-row:hover { background: rgba(124,59,237,0.02); }

  /* Member cell */
  .member-cell { display: flex; align-items: center; gap: 13px; }
  .member-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    object-fit: cover; flex-shrink: 0;
  }
  .member-name  { font-size: 14px; font-weight: 700; color: #0f172a; }
  .member-email { font-size: 12px; color: #94a3b8; margin-top: 2px; }

  /* Role badge */
  .role-badge {
    display: inline-block; padding: 4px 12px; border-radius: 99px;
    font-size: 11px; font-weight: 700;
    background: rgba(124,59,237,0.08); color: #7c3bed;
    letter-spacing: 0.3px;
  }

  /* Status */
  .status-cell { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; }
  .status-active  { color: #22c55e; }
  .status-invited { color: #f59e0b; }

  /* Actions */
  .actions-cell { display: flex; align-items: center; justify-content: flex-end; gap: 4px; }
  .action-btn {
    width: 32px; height: 32px; border-radius: 7px;
    background: none; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #94a3b8; transition: background 0.15s, color 0.15s;
  }
  .action-btn:hover { background: rgba(124,59,237,0.08); color: ${PRIMARY}; }
  .action-btn.delete:hover { background: #fee2e2; color: #dc2626; }
  .action-btn.disabled { color: #e2e8f0; cursor: default; pointer-events: none; }

  /* PAGINATION */
  .pagination-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 20px; padding: 0 2px;
  }
  .pagination-info { font-size: 13px; color: #64748b; }
  .pagination-controls { display: flex; align-items: center; gap: 6px; }
  .page-btn {
    min-width: 36px; height: 36px; padding: 0 10px;
    border-radius: 8px; border: 1px solid #e2e8f0;
    background: white; font-size: 13px; font-weight: 600; color: #475569;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .page-btn:hover:not(.active) { border-color: ${PRIMARY}; color: ${PRIMARY}; }
  .page-btn.active { background: ${PRIMARY}; color: white; border-color: ${PRIMARY}; }
  .page-btn.text-btn { border: none; background: none; }
  .page-btn.text-btn:hover { background: rgba(124,59,237,0.06); color: ${PRIMARY}; }
`;

const NAV_ITEMS = [
  { icon: "dashboard",     label: "Dashboard" },
  { icon: "folder",        label: "Projects",      filled: true },
  { icon: "task_alt",      label: "Tasks" },
  { icon: "group",         label: "Team",          active: true, filled: true },
  { icon: "notifications", label: "Notifications" },
  { icon: "settings",      label: "Settings" },
];

const MEMBERS = [
  {
    name: "Sarah Jenkins",
    email: "sarah@smartpm.com",
    role: "ADMIN",
    status: "active",
    avatar: teamImg2,
  },
  {
    name: "David Chen",
    email: "d.chen@smartpm.com",
    role: "MANAGER",
    status: "active",
    avatar: teamImg3,
  },
  {
    name: "Emma Wilson",
    email: "emma.w@smartpm.com",
    role: "MEMBER",
    status: "invited",
    avatar: teamImg4,
  },
  {
    name: "Marcus Thorne",
    email: "m.thorne@smartpm.com",
    role: "MEMBER",
    status: "active",
    avatar: teamImg5,
  },
];

function StatusCell({ status }) {
  if (status === "active") return (
    <div className="status-cell status-active">
      <span className="stat-dot dot-green" />
      Active
    </div>
  );
  return (
    <div className="status-cell status-invited">
      <span className="stat-dot dot-amber" />
      Invited
    </div>
  );
}

export default function TeamManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="team-root">
      <style>{css}</style>

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="mso">rocket_launch</span>
          </div>
          <div>
            <div className="brand-name">Smart PM</div>
            <div className="brand-sub">Management Suite</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(({ icon, label, active, filled }) => (
            <button key={label} className={`nav-link${active ? " active" : ""}`}>
              <span className={`mso nav-icon${active && filled ? " mso-filled" : ""}`}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="pro-plan-card">
            <div className="pro-icon">
              <span className="mso">bolt</span>
            </div>
            <div>
              <div className="pro-label">Pro Plan</div>
              <div className="pro-bar-bg">
                <div className="pro-bar-fill" />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-search">
            <span className="mso topbar-search-icon">search</span>
            <input
              className="topbar-search-input"
              type="text"
              placeholder="Search team, projects or tasks..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="topbar-right">
            <button className="btn-invite">
              <span className="mso mso-sm">person_add</span>
              Invite Member
            </button>
            <div className="topbar-user">
              <div className="topbar-user-info">
                <div className="topbar-user-name">Alex Rivera</div>
                <div className="topbar-user-role">Admin</div>
              </div>
              <img
                className="topbar-avatar"
                src={teamImg1}
                alt="Alex Rivera"
              />
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="content">
          <h1 className="page-title">Team Members</h1>
          <p className="page-sub">Manage permissions, roles, and status of your team.</p>

          {/* Toolbar */}
          <div className="toolbar">
            <div className="toolbar-left">
              <button className="btn-filter">
                <span className="mso mso-sm">filter_list</span>
                Filter
              </button>
              <select
                className="role-select"
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Manager</option>
                <option>Member</option>
              </select>
            </div>
            <div className="toolbar-stats">
              <span className="stat-active">
                <span className="stat-dot dot-green" style={{ display: "inline-block" }} />
                12 Active
              </span>
              <span className="stat-invited">
                <span className="stat-dot dot-amber" style={{ display: "inline-block" }} />
                3 Invited
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="members-table">
            {/* Header */}
            <div className="table-header">
              <span className="th">Member</span>
              <span className="th">Role</span>
              <span className="th">Status</span>
              <span className="th th-right">Actions</span>
            </div>

            {/* Rows */}
            {MEMBERS.map((m) => (
              <div key={m.email} className="table-row">
                {/* Member */}
                <div className="member-cell">
                  <img className="member-avatar" src={m.avatar} alt={m.name} />
                  <div>
                    <div className="member-name">{m.name}</div>
                    <div className="member-email">{m.email}</div>
                  </div>
                </div>

                {/* Role */}
                <div>
                  <span className="role-badge">{m.role}</span>
                </div>

                {/* Status */}
                <StatusCell status={m.status} />

                {/* Actions */}
                <div className="actions-cell">
                  <button className="action-btn" title="Edit">
                    <span className="mso mso-sm">edit</span>
                  </button>
                  <button
                    className={`action-btn delete${m.status === "invited" ? " disabled" : ""}`}
                    title="Remove"
                  >
                    <span className="mso mso-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination-row">
            <span className="pagination-info">Showing 4 of 15 members</span>
            <div className="pagination-controls">
              <button className="page-btn text-btn">Previous</button>
              <button
                className={`page-btn${currentPage === 1 ? " active" : ""}`}
                onClick={() => setCurrentPage(1)}
              >1</button>
              <button
                className={`page-btn${currentPage === 2 ? " active" : ""}`}
                onClick={() => setCurrentPage(2)}
              >2</button>
              <button className="page-btn text-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, 2))}>
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}