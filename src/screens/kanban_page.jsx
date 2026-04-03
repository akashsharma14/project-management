import { useState } from "react";
import kabanImg from "../assets/kanban_img.png";
import kabanImg1 from "../assets/kanban_img1.png";
import kabanImg2 from "../assets/kanban_img2.png";
import kabanImg3 from "../assets/kanban_img3.png";
import kabanImg4 from "../assets/kanban_img4.png";
import kabanImg5 from "../assets/kanban_img5.png";
import kabanImg6 from "../assets/kanban_img6.png";



const PRIMARY = "#7c3bed";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mso {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-weight: normal; font-style: normal;
    font-size: 22px; line-height: 1;
    letter-spacing: normal; text-transform: none;
    display: inline-block; white-space: nowrap; direction: ltr;
    -webkit-font-smoothing: antialiased; user-select: none;
  }
  .mso-filled { font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  .mso-sm { font-size: 18px; }
  .mso-xs { font-size: 16px; }
  .mso-lg { font-size: 26px; }

  .kanban-root {
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
    border-right: 1px solid #e2e8f0;
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden; flex-shrink: 0;
  }
  .sidebar-brand {
    display: flex; align-items: center; gap: 12px;
    padding: 22px 24px;
  }
  .brand-icon {
    width: 40px; height: 40px;
    background: ${PRIMARY}; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    color: white; flex-shrink: 0;
  }
  .brand-icon .mso { font-size: 20px; }
  .brand-name { font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.2; }
  .brand-sub  { font-size: 10px; color: #94a3b8; margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
  .sidebar-nav {
    flex: 1; padding: 4px 16px 16px;
    display: flex; flex-direction: column; gap: 2px; overflow-y: auto;
  }
  .nav-link {
    display: flex; align-items: center; gap: 12px;
    padding: 9px 12px; border-radius: 8px;
    font-size: 14px; font-weight: 500; color: #475569;
    cursor: pointer; background: none; border: none; width: 100%;
    text-align: left; transition: background 0.15s, color 0.15s;
  }
  .nav-link:hover { background: rgba(124,59,237,0.05); color: #0f172a; }
  .nav-link:hover .mso { color: ${PRIMARY}; }
  .nav-link.active { background: rgba(124,59,237,0.08); color: ${PRIMARY}; font-weight: 600; }
  .nav-link .mso { font-size: 20px; flex-shrink: 0; color: #94a3b8; }
  .nav-link.active .mso { color: ${PRIMARY}; }
  .sidebar-footer {
    padding: 16px; border-top: 1px solid #e2e8f0;
  }
  .storage-card {
    background: rgba(124,59,237,0.04); border-radius: 12px; padding: 14px 16px;
  }
  .storage-label {
    font-size: 10px; font-weight: 700; color: ${PRIMARY};
    text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 8px;
  }
  .storage-bar-bg {
    width: 100%; height: 6px; background: #e2e8f0;
    border-radius: 99px; margin-bottom: 8px; overflow: hidden;
  }
  .storage-bar-fill { height: 100%; background: ${PRIMARY}; border-radius: 99px; }
  .storage-text { font-size: 10px; color: #64748b; }

  /* ── MAIN ── */
  .main { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }

  /* ── TOPBAR ── */
  /*
   * FIX SUMMARY:
   * Bug 1 — .topbar-left had flex: 0 0 auto + margin-right: auto which let the
   *          search wrap grow unbounded and crash into .topbar-right.
   * Bug 2 — .search-wrap had no width cap; its 220px child overflowed the container.
   * Bug 3 — .topbar-right had no guaranteed left gap; it floated right without
   *          clearance from the search area.
   * Bug 4 — .project-title-row was missing flex-shrink: 0, so the title could
   *          compress at mid-widths and mis-align the whole row.
   *
   * FIX: topbar uses space-between. Left side = flex: 1 min-width: 0 so it fills
   * available space but can also shrink. Title is flex-shrink: 0. Search is
   * flex: 1 with a max-width cap. Right side is flex-shrink: 0 with margin-left.
   */
  .topbar {
    height: 64px;
    background: white;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    padding: 0 24px;
    flex-shrink: 0;
    gap: 0;
  }
  /* Left side: fills remaining space but stops before the right cluster */
  .topbar-left {
    display: flex;
    align-items: center;
    flex: 1 1 0;      /* grows to fill space, shrinks when needed */
    min-width: 0;     /* allows children to shrink below natural size */
    overflow: hidden; /* clips content if it still overflows at very small sizes */
  }
  /* Title block: rigid — never compresses */
  .project-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0; /* FIX: was missing */
    margin-right: 0;
  }
  .project-grid-icon { color: ${PRIMARY}; font-size: 22px; flex-shrink: 0; }
  .project-title { font-size: 17px; font-weight: 700; color: #0f172a; white-space: nowrap; }

  /* Divider: rigid spacer */
  .divider-v {
    width: 1px;
    height: 28px;
    background: #e2e8f0;
    flex-shrink: 0; /* FIX: explicit */
    margin: 0 16px;
  }

  /* Search: fluid — grows into leftover space, never overflows */
  .search-wrap {
    position: relative;
    flex: 1 1 auto;   /* FIX: replaces flex-shrink: 0 which caused overflow */
    min-width: 100px; /* never collapses completely */
    max-width: 280px; /* FIX: caps width so it can't push into right side */
  }
  .search-icon {
    position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
    color: #94a3b8; font-size: 16px; pointer-events: none;
  }
  .search-input {
    background: #f1f5f9; border: none; border-radius: 8px;
    padding: 7px 14px 7px 32px;
    font-size: 13px; font-family: 'Inter', sans-serif; color: #0f172a;
    outline: none;
    width: 100%; /* FIX: replaces fixed 220px — now fills its flex parent */
    transition: box-shadow 0.2s;
  }
  .search-input::placeholder { color: #94a3b8; }
  .search-input:focus { box-shadow: 0 0 0 2px rgba(124,59,237,0.2); }

  /* Right side: rigid cluster, always fully visible, guaranteed separation */
  .topbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;    /* FIX: explicit — buttons never compress */
    margin-left: 20px; /* FIX: enforces clearance from search box */
  }
  .btn-add-task {
    display: flex; align-items: center; gap: 6px;
    background: ${PRIMARY}; color: white;
    border: none; border-radius: 8px;
    padding: 8px 18px;
    font-size: 13px; font-weight: 700; cursor: pointer;
    box-shadow: 0 3px 10px rgba(124,59,237,0.3);
    transition: background 0.2s, transform 0.15s;
    white-space: nowrap;
  }
  .btn-add-task:hover { background: #6b2ed6; transform: translateY(-1px); }
  .btn-add-task .mso { font-size: 18px; }
  .help-btn {
    background: none; border: none; cursor: pointer;
    color: #64748b; padding: 6px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
  }
  .help-btn:hover { background: #f1f5f9; color: ${PRIMARY}; }
  .topbar-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    object-fit: cover;
    border: 2px solid rgba(124,59,237,0.2);
    cursor: pointer; flex-shrink: 0;
  }

  /* ── KANBAN BOARD ── */
  .board-area {
    flex: 1; overflow-x: auto; overflow-y: hidden;
    padding: 24px;
    display: flex; gap: 20px;
  }
  .board-area::-webkit-scrollbar { height: 6px; }
  .board-area::-webkit-scrollbar-track { background: transparent; }
  .board-area::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

  /* COLUMN */
  .kanban-col {
    width: 300px; min-width: 300px;
    display: flex; flex-direction: column; gap: 12px;
    height: 100%;
  }
  .col-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 4px; flex-shrink: 0;
  }
  .col-title-row { display: flex; align-items: center; gap: 8px; }
  .col-title { font-size: 13px; font-weight: 700; color: #0f172a; }
  .col-badge {
    font-size: 10px; font-weight: 700;
    padding: 2px 7px; border-radius: 99px;
  }
  .badge-gray   { background: #e2e8f0; color: #475569; }
  .badge-purple { background: rgba(124,59,237,0.15); color: ${PRIMARY}; }
  .badge-green  { background: #dcfce7; color: #16a34a; }
  .col-menu-btn {
    background: none; border: none; cursor: pointer;
    color: #94a3b8; padding: 4px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    transition: color 0.15s, background 0.15s;
  }
  .col-menu-btn:hover { color: ${PRIMARY}; background: rgba(124,59,237,0.06); }

  .col-cards {
    flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;
    padding-bottom: 8px;
  }
  .col-cards::-webkit-scrollbar { width: 4px; }
  .col-cards::-webkit-scrollbar-track { background: transparent; }
  .col-cards::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }

  /* TASK CARD */
  .task-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px; padding: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    cursor: grab;
    transition: box-shadow 0.2s, transform 0.15s, border-color 0.2s;
  }
  .task-card:hover {
    box-shadow: 0 6px 18px rgba(0,0,0,0.09);
    transform: translateY(-2px);
    border-color: rgba(124,59,237,0.15);
  }
  .task-card:active { cursor: grabbing; transform: scale(0.98); }
  .task-card.done-card { opacity: 0.72; }

  .card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
  .priority-badge {
    font-size: 10px; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.8px;
    padding: 2px 8px; border-radius: 4px;
  }
  .pri-high   { background: #fee2e2; color: #dc2626; }
  .pri-medium { background: #dbeafe; color: #2563eb; }
  .pri-low    { background: #f1f5f9; color: #475569; }
  .pri-done   { background: #dcfce7; color: #16a34a; }

  .drag-icon { color: #cbd5e1; transition: color 0.15s; }
  .task-card:hover .drag-icon { color: #94a3b8; }
  .done-check { color: #22c55e; }

  .task-title {
    font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 6px;
    line-height: 1.45;
  }
  .task-title.strikethrough { text-decoration: line-through; color: #94a3b8; }
  .task-desc {
    font-size: 12px; color: #64748b; margin-bottom: 14px;
    line-height: 1.55;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }

  /* image preview */
  .task-image-preview {
    width: 100%; height: 100px; border-radius: 8px;
    margin-bottom: 12px; overflow: hidden;
    background: linear-gradient(135deg, rgba(124,59,237,0.15), rgba(124,59,237,0.35));
  }

  .card-footer { display: flex; align-items: center; justify-content: space-between; }
  .due-date { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 500; color: #64748b; }
  .due-date .mso { font-size: 14px; }
  .done-date { color: #94a3b8; }

  .avatar-stack { display: flex; }
  .task-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    border: 2px solid white;
    object-fit: cover; margin-left: -6px;
    background: #e2e8f0;
  }
  .task-avatar:first-child { margin-left: 0; }
  .task-avatar.grayscale { filter: grayscale(1); }
  .avatar-overflow {
    width: 26px; height: 26px; border-radius: 50%;
    border: 2px solid white;
    background: ${PRIMARY}; color: white;
    font-size: 9px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    margin-left: -6px;
  }

  /* ADD NEW TASK (bottom of column) */
  .add-task-btn {
    width: 100%; padding: 10px 0;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    border: 2px dashed #e2e8f0;
    border-radius: 12px;
    background: none; color: #94a3b8;
    font-size: 13px; font-weight: 500; cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    flex-shrink: 0;
  }
  .add-task-btn:hover { border-color: rgba(124,59,237,0.4); color: ${PRIMARY}; background: rgba(124,59,237,0.02); }
  .add-task-btn .mso { font-size: 16px; }
`;

const NAV = [
  { icon: "dashboard",     label: "Dashboard" },
  { icon: "folder",        label: "Projects", active: true, filled: true },
  { icon: "task_alt",      label: "Tasks" },
  { icon: "group",         label: "Team" },
  { icon: "notifications", label: "Notifications" },
  { icon: "settings",      label: "Settings" },
];

/* ── DATA ── */
const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    badgeClass: "badge-gray",
    cards: [
      {
        priority: "HIGH", priClass: "pri-high",
        title: "Final UI Review",
        desc: "Complete the comprehensive audit of all dashboard elements and button states.",
        date: "Oct 24",
        avatars: [
          { src: kabanImg1 }
        ],
      },
      {
        priority: "MEDIUM", priClass: "pri-medium",
        title: "Update Style Guide",
        date: "Oct 25",
        avatars: [
          { src: kabanImg2 }
        ],
      },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    badgeClass: "badge-purple",
    cards: [
      {
        priority: "HIGH", priClass: "pri-high",
        title: "API Integration Docs",
        desc: "Documenting the new OAuth2 flow for third-party developers.",
        date: "Oct 26",
        avatars: [
          { src: kabanImg3 },
        ],
        overflow: "+2",
      },
      {
        priority: "MEDIUM", priClass: "pri-medium",
        title: "Refactor Grid Layout",
        date: "Oct 28",
        avatars: [
          { src: kabanImg4 }
        ],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    badgeClass: "badge-gray",
    cards: [
      {
        priority: "LOW", priClass: "pri-low",
        title: "Icon Library Export",
        hasImage: true,
        date: "Oct 30",
        avatars: [
          { src: kabanImg5 }
        ],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    badgeClass: "badge-green",
    isDone: true,
    cards: [
      {
        priority: "COMPLETED", priClass: "pri-done",
        title: "Initial Logo Draft",
        date: "Oct 20",
        done: true,
        avatars: [
          { src: kabanImg6, grayscale: true }
        ],
      },
    ],
  },
];

function TaskCard({ card }) {
  return (
    <div className={`task-card${card.done ? " done-card" : ""}`}>
      <div className="card-top">
        <span className={`priority-badge ${card.priClass}`}>{card.priority}</span>
        {card.done
          ? <span className="mso mso-sm done-check">check_circle</span>
          : <span className="mso mso-sm drag-icon">drag_indicator</span>
        }
      </div>

      <div className={`task-title${card.done ? " strikethrough" : ""}`}>{card.title}</div>

      {card.desc && <div className="task-desc">{card.desc}</div>}
      {card.hasImage && <div className="task-image-preview" />}

      <div className="card-footer">
        <div className={`due-date${card.done ? " done-date" : ""}`}>
          <span className="mso mso-xs">calendar_today</span>
          <span>{card.date}</span>
        </div>
        <div className="avatar-stack">
          {card.avatars.map((av, i) => (
            <img
              key={i}
              className={`task-avatar${av.grayscale ? " grayscale" : ""}`}
              src={av.src}
              alt="member"
            />
          ))}
          {card.overflow && (
            <div className="avatar-overflow">{card.overflow}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ col }) {
  return (
    <div className="kanban-col">
      {/* Header */}
      <div className="col-header">
        <div className="col-title-row">
          <span className="col-title">{col.title}</span>
          <span className={`col-badge ${col.badgeClass}`}>{col.cards.length}</span>
        </div>
        <button className="col-menu-btn">
          <span className="mso mso-sm">more_horiz</span>
        </button>
      </div>

      {/* Cards */}
      <div className="col-cards">
        {col.cards.map((card, i) => (
          <TaskCard key={i} card={card} />
        ))}
      </div>

      {/* Add New Task */}
      {!col.isDone && (
        <button className="add-task-btn">
          <span className="mso">add</span>
          Add New Task
        </button>
      )}
    </div>
  );
}

export default function KanbanPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="kanban-root">
      <style>{css}</style>

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <span className="mso">rocket_launch</span>
          </div>
          <div>
            <div className="brand-name">Smart Project</div>
            <div className="brand-sub">Management</div>
          </div>
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
          <div className="storage-card">
            <div className="storage-label">Storage Usage</div>
            <div className="storage-bar-bg">
              <div className="storage-bar-fill" style={{ width: "75%" }} />
            </div>
            <div className="storage-text">7.5 GB of 10 GB used</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="topbar-left">
            <div className="project-title-row">
              <span className="mso mso-filled project-grid-icon">grid_view</span>
              <span className="project-title">SaaS Design System</span>
            </div>
            <div className="divider-v" />
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
          </div>

          <div className="topbar-right">
            <button className="btn-add-task">
              <span className="mso">add</span>
              Add Task
            </button>
            <div className="divider-v" />
            <button className="help-btn">
              <span className="mso">help</span>
            </button>
            <img
              className="topbar-avatar"
              src={kabanImg}
              alt="User"
            />
          </div>
        </header>

        {/* BOARD */}
        <div className="board-area">
          {COLUMNS.map(col => (
            <KanbanColumn key={col.id} col={col} />
          ))}
        </div>
      </main>
    </div>
  );
}